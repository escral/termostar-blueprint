<template>
    <svg :data-hover="hover" :viewBox="'0 0 ' + width + ' ' + height" :width="width" :height="height" :x="useX" :y="useY">
        <path v-if="insulation" class="stroke insulation" fill-rule="evenodd"
              :d="'M0,0 H' + width + ' V' + height + ' H0 Z ' +
               cap(insulation)"/>

        <path v-if="insulation && thickness" class="stroke" fill-rule="evenodd"
              :d="'M0,0 H' + width + ' V' + height + ' H0 Z ' +
               cap(insulation + thickness)"/>

        <path v-if="! insulation" class="stroke"
              :d="cap(0)"/>
        <path v-if="! insulation && thickness" class="stroke"
              :d="cap(thickness)"/>

        <g>
            <!-- Helpers Left Top -->
            <line v-if="! insulation && isRoundCap"
                  class="helper-line-dashed"
                  :x1="0"
                  :y1="0"
                  :x2="borderBaseRadius"
                  :y2="0"/>
            <line v-if="! insulation && isRoundCap"
                  class="helper-line-dashed"
                  :x1="0"
                  :y1="0"
                  :x2="0"
                  :y2="borderBaseRadius"/>

            <!-- Helpers Right Top -->
            <line v-if="! insulation && isRoundCap"
                  class="helper-line-dashed"
                  :x1="width - borderBaseRadius"
                  :y1="0"
                  :x2="width"
                  :y2="0"/>
            <line v-if="! insulation && isRoundCap"
                  class="helper-line-dashed"
                  :x1="width"
                  :y1="0"
                  :x2="width"
                  :y2="borderBaseRadius"/>

            <!-- Helpers Left Bottom -->
            <line v-if="! insulation && isRoundCap"
                  class="helper-line-dashed"
                  :x1="0"
                  :y1="height"
                  :x2="borderBaseRadius"
                  :y2="height"/>
            <line v-if="! insulation && isRoundCap"
                  class="helper-line-dashed"
                  :x1="0"
                  :y1="height"
                  :x2="0"
                  :y2="height - borderBaseRadius"/>

            <!-- Helpers Right Bottom -->
            <line v-if="! insulation && isRoundCap"
                  class="helper-line-dashed"
                  :x1="width - borderBaseRadius"
                  :y1="height"
                  :x2="width"
                  :y2="height"/>
            <line v-if="! insulation && isRoundCap"
                  class="helper-line-dashed"
                  :x1="width"
                  :y1="height - borderBaseRadius"
                  :x2="width"
                  :y2="height"/>
        </g>
    </svg>
</template>

<script>
import Part from './Part'
import {mmToUnits} from './../Units'

export default {
    name: "BasePart",

    mixins: [
        Part,
    ],

    props: {
        size: {
            default: '219',
        },

        insulation: {
            type: Number,
            default: mmToUnits(20),
        },

        thickness: {
            type: Number,
            default: mmToUnits(5),
        },

        height: {
            type: Number,
            default: mmToUnits(820),
        },
    },

    methods: {
        cap(offset = 0) {
            return this.isRoundCap ? this.roundCap(offset) : this.squareCap(offset)
        },

        roundCap(offset = 0) {
            let borderRadius = this.borderRadius(this.width - offset * 2)

            return 'M' + (offset) + ',' + (offset + borderRadius) +
                ' Q ' + (offset) + ',' + (offset) + ' ' +
                +(offset + borderRadius) + ',' + (offset) +
                ' H ' + (this.width - offset - borderRadius) +
                ' Q ' + (this.width - offset) + ',' + (offset) + ' ' +
                +(this.width - offset) + ',' + (offset + borderRadius) +
                ' V ' + (this.height - offset - borderRadius) +
                ' Q ' + (this.width - offset) + ',' + (this.height - offset) + ' ' +
                +(this.width - offset - borderRadius) + ',' + (this.height - offset) +
                ' H ' + (offset + borderRadius) +
                ' Q ' + (offset) + ',' + (this.height - offset) + ' ' +
                +(offset) + ',' + (this.height - offset - borderRadius) +
                ' Z'
        },

        squareCap(offset = 0) {
            return 'M' + offset + ',' + offset + ' H' + (this.width - offset) + ' V' + (this.height - offset) + ' H' + (offset) + ' Z'
        },

        borderRadius(width) {
            return Math.round((width / 2.3) / 2) * 2
        },
    },

    computed: {
        width() {
            return this.mmToUnits(+this.size) + this.insulation * 2
        },

        thicknessOffset() {
            return this.insulationOffset + this.thickness
        },

        isRoundCap() {
            return this.size != '120'
        },

        borderBaseRadius() {
            return this.borderRadius(this.width, 0)
        },

        borderBaseThicknessRadius() {
            return this.borderRadius(this.width, this.thickness)
        },
    },
}
</script>

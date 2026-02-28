<template>
    <svg :viewBox="'0 0 ' + totalWidth + ' ' + height" :width="totalWidth" :height="height" :x="useX" :y="useY" class="element">
        <g :data-hover="hover" :transform="transform">
            <rect class="stroke" :x="0" :y="0" :width="extension" :height="diameter"/>
            <rect class="stroke" :x="0" :y="3" :width="extension" :height="diameter - 6"/>

            <g :transform="'translate(' + (extension + flangeTotalSpace) + ' 0)'">
                <path class="stroke"
                      :d="'M0,0 Q' + width + ',0 ' + width + ',' + height + ' h-' + diameter + ' Q' + (width - diameter) + ',' + (diameter) + ' 0,' + (diameter) + ' Z ' +
                       'M0,' + (space) + ' Q' + (width - space) + ',' + (space) + ' ' + (width - space) + ',' + (height) + ' h-' + (diameter - space * 2) + ' Q' + (width - diameter + space) + ',' + (diameter - space) + ' 0,' + (diameter - space) + ' Z'"/>

                <flange-part v-if="flange" rotate="-90" :x="0" :y="diameter / 2" :size="size"/>
                <flange-part v-if="flange" rotate="-90" :x="-flangeTotalSpace + flangeHeight" :y="diameter / 2" :size="size"/>
                <rect v-if="flange" class="stroke" :x="-flangeHeight - flangeGap" y="0" :width="flangeGap" :height="diameter"></rect>
            </g>
        </g>
    </svg>
</template>

<script>
import Part from './Part'
import FlangePart from './FlangePart'

export default {
    name: "JoinerPart",

    mixins: [
        Part,
    ],

    components: {
        FlangePart,
    },

    props: {
        size: {
            default: 56,
        },
        space: {
            type: Number,
            default: 3,
        },
        extension: {
            type: Number,
            default: 0,
        },
        flange: {
            type: Boolean,
            default: false,
        },
    },

    computed: {
        totalWidth() {
            return this.extension + this.width + this.flangeTotalSpace
        },

        diameter() {
            return this.mmToUnits(+this.size)
        },

        width() {
            if (this.size == '56')
                return this.mmToUnits(100)
            else if (this.size == '76')
                return this.mmToUnits(130)
            else if (this.size == '89')
                return this.mmToUnits(160)

            return this.mmToUnits(this.size * 1.5)
        },

        height() {
            return this.width
        },

        flangeHeight() {
            return this.mmToUnits(20)
        },

        flangeGap() {
            return this.mmToUnits(10)
        },

        flangeTotalSpace() {
            return this.flange ? (this.flangeHeight * 2 + this.flangeGap) : 0
        },

        pivot() {
            return {
                x: 0,
                y: this.flipY ? -this.height : this.height,
            }
        },
    },
}
</script>

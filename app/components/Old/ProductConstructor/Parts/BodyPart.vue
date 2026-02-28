<template>
    <svg :viewBox="'0 0 ' + width + ' ' + height" :width="width" :height="height" :x="useX" :y="useY">
        <g>
            <!-- Compact Hydro Part -->
            <g v-if="hydro">
                <rect :x="compactHydroWidth + thicknessOffset" :y="insulation + thickness" class="stroke stroke--filled" :width="thickness" :height="topPlankHeight"/>

                <rect :x="compactHydroWidth + thicknessOffset" :y="height - insulation - thickness - bottomPlankHeight" class="stroke stroke--filled" :width="thickness" :height="bottomPlankHeight"/>

                <rect :x="compactHydroWidth + thicknessOffset" :y="height / 2 - middlePlankHeight / 2" class="stroke stroke--filled" :width="thickness" :height="middlePlankHeight"/>
            </g>

            <rect :x="lineStart" :y="height / 2 - thickness / 2" class="stroke stroke--filled" :width="width - insulationOffset - lineStart" :height="thickness"/>

<!--            <line class="cls-1" :x1="insulationOffset + (hydro ? compactHydroWidth + thickness : 0)" :y1="height / 2" :x2="width - insulationOffset"-->
<!--                  :y2="height / 2"/>-->

            <path fill-rule="evenodd" class="stroke insulation"
                  :d="'M0,0 H' + width + ' V' + height + ' H0 Z M' + insulationOffset + ',' + insulationOffset + ' H' + (width - insulationOffset) + ' V' + (height - insulationOffset) + ' H' + (insulationOffset) + ' Z'"/>

            <path v-if="thickness" fill-rule="evenodd" class="stroke" style="fill: #FFF;"
                  :d="'M' + insulationOffset + ',' + insulationOffset + ' H' + (width - insulationOffset) + ' V' + (height - insulationOffset) + ' H' + (insulationOffset) + ' Z ' +
                   'M' + thicknessOffset + ',' + thicknessOffset + ' H' + (width - thicknessOffset) + ' V' + (height - thicknessOffset) + ' H' + (thicknessOffset) + ' Z'"/>

            <!-- Compact Hydro Part Overlays -->
            <g v-if="hydro">
                <rect :x="compactHydroWidth + thicknessOffset + 1" :y="insulation + thickness - 1" fill="#FFF" stroke="#FFF" :width="thickness - 2" :height="2"/>

                <rect :x="compactHydroWidth + thicknessOffset + 1" :y="height - insulation - thickness - 1" fill="#FFF" stroke="#FFF" :width="thickness - 2" :height="2"/>

                <rect :x="lineStart - 1" :y="height / 2 - thickness / 2 + 1" fill="#FFF" stroke="#FFF" :width="2" :height="thickness - 2"/>
            </g>
        </g>
    </svg>
</template>

<script>
import Part from './Part'
import {mmToUnits} from './../Units'

export default {
    name: "BodyPart",

    mixins: [
        Part,
    ],

    props: {
        hydro: {
            type: Boolean,
            default: false,
        },
        width: {
            type: Number,
            default: 200,
        },
        height: {
            type: Number,
            default: mmToUnits(160),
        },
        insulation: {
            type: Number,
            default: mmToUnits(20),
        },
        thickness: {
            type: Number,
            default: mmToUnits(4),
        },
        compactHydroWidth: {
            type: Number,
            default: mmToUnits(76),
        },
    },

    computed: {
        pivot() {
            return {
                x: 0,
                y: this.height / 2,
            }
        },
        insulationOffset() {
            return this.insulation
        },
        thicknessOffset() {
            return this.insulationOffset + this.thickness
        },
        heightInner() {
            return this.height - this.insulation * 2
        },
        hydroGap() {
            return mmToUnits(35)
        },
        inputPadding() {
            return (this.heightInner - this.hydroGap * 2) / 4
        },
        topPlankHeight() {
            return this.inputPadding
        },
        bottomPlankHeight() {
            return this.inputPadding
        },
        middlePlankHeight() {
            return this.heightInner - this.topPlankHeight - this.bottomPlankHeight - this.hydroGap * 2
        },
        lineStart() {
            return this.thicknessOffset + (this.hydro ? this.compactHydroWidth + this.thickness : 0)
        }
    },
}
</script>

<template>
    <svg :viewBox="'0 0 ' + (width) + ' ' + (height)" :width="(width)" :height="(height)" :x="useX" :y="useY" class="no-select">
        <g :transform="transform">
            <rect class="stroke" :x="-(flangeSize - width) / 2" :y="0" :width="flangeSize" :height="height"/>

            <rect class="insulation no-highlight" :x="-(flangeSize - width) / 2" :y="0" :width="height" :height="height"/>
            <rect class="insulation no-highlight" :x="-height" :y="0" :width="height" :height="height"/>

            <rect class="insulation no-highlight" :x="+(flangeSize + width) / 2 - height" :y="0" :width="height" :height="height"/>
            <rect class="insulation no-highlight" :x="width" :y="0" :width="height" :height="height"/>
        </g>
    </svg>
</template>

<script>
import Part from './Part'

export default {
    name: "FlangePart",

    mixins: [
        Part,
    ],

    props: {
        size: {
            default: '76',
        },
    },

    computed: {
        flangeSize() {
            if (this.size == 76)
                return this.mmToUnits(180)
            else if (this.size == 89)
                return this.mmToUnits(195)

            return this.mmToUnits(180)
        },

        height() {
            return this.mmToUnits(20)
        },

        width() {
            if (this.size == '76')
                return this.mmToUnits(76)
            else if (this.size == '89')
                return this.mmToUnits(89)

            return this.mmToUnits(76)
        },

        pivot() {
            return {
                x: this.width / 2,
                y: this.height,
            }
        },
    },
}
</script>

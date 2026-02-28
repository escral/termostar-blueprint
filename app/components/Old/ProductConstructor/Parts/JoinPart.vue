<template>
    <svg :viewBox="'0 0 ' + (width) + ' ' + (height)" :width="(width)" :height="(height)" :x="useX" :y="useY" class="element">
        <g :data-hover="hover" :transform="transform">
            <rect class="stroke" x="0" y="0" :width="width" :height="height"/>
            <rect v-if="!thread" class="stroke" :x="thickness" :y="flange ? 0 : thickness" :width="width - thickness * 2" :height="height - (flange ? 0 : thickness)"/>

            <g v-if="thread">
                <rect class="stroke" :x="thickness" y="9" :width="width - thickness * 2" :height="height - thickness * 3"/>
                <line class="stroke" x1="0" :y1="thickness" :x2="width" :y2="thickness"/>
                <line class="stroke" x1="0" :y1="thickness * 2" :x2="width" :y2="thickness * 2"/>
                <line class="stroke" x1="0" :y1="thickness * 3" :x2="width" :y2="thickness * 3"/>
            </g>

            <flange-part v-if="flange" :x="width / 2" :y="0" :size="flangeSize"/>
        </g>
    </svg>
</template>

<script>
import Part from './Part'
import FlangePart from './FlangePart'

export default {
    name: "JoinPart",

    mixins: [
        Part,
    ],

    components: {
        FlangePart,
    },

    props: {
        size: {
            default: '1 ½"',
        },
        staticHeight: {
            type: Number,
        },
        additionalHeight: {
            type: Number,
            default: 0,
        },
        thread: {
            type: Boolean,
            default: false,
        },
        bodyThickness: {
            type: Number,
            default: 4,
        },
    },

    data() {
        return {
            thickness: 3
        }
    },

    computed: {
        flangeSize() {
            return (this.size + '').substring(1)
        },

        flange() {
            if (! this.size || !this.size.length)
                return false

            return this.size[0] == 'f'
        },

        height() {
            if (this.staticHeight)
                return this.staticHeight

            if (this.size == '½"')
                return this.mmToUnits(34) + this.additionalHeight
            else if (this.size == '¾"')
                return this.mmToUnits(34) + this.additionalHeight
            else if (this.size == '1"')
                return this.mmToUnits(43) + this.additionalHeight
            else if (this.size == '1 ¼"')
                return this.mmToUnits(48) + this.additionalHeight
            else if (this.size == '1 ½"')
                return this.mmToUnits(48) + this.additionalHeight
            else if (this.size == '2"')
                return this.mmToUnits(56) + this.additionalHeight
            else if (this.size == '2 ½"')
                return this.mmToUnits(65) + this.additionalHeight
            else if (this.size == 'f76')
                return this.mmToUnits(115) + this.additionalHeight + this.bodyThickness
            else if (this.size == 'f89')
                return this.mmToUnits(115) + this.additionalHeight + this.bodyThickness

            return this.mmToUnits(34) + this.additionalHeight
        },
        width() {
            if (this.size == '½"')
                return this.mmToUnits(16)
            else if (this.size == '¾"')
                return this.mmToUnits(20)
            else if (this.size == '1"')
                return this.mmToUnits(24)
            else if (this.size == '1 ¼"')
                return this.mmToUnits(30)
            else if (this.size == '1 ½"')
                return this.mmToUnits(34)
            else if (this.size == '2"')
                return this.mmToUnits(44)
            else if (this.size == '2 ½"')
                return this.mmToUnits(52)
            else if (this.size == 'f76')
                return this.mmToUnits(76)
            else if (this.size == 'f89')
                return this.mmToUnits(89)

            return this.mmToUnits(34)
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

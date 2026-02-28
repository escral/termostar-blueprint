<template>
    <g>
        <line :data-hover="hover" class="helper-line svg-arrow"
              :x1="x" :y1="y" :x2="useX1" :y2="useY1"></line>
        <line :data-hover="hover" class="helper-line svg-arrow"
              :x1="x" :y1="y" :x2="useX2" :y2="useY2"></line>
    </g>
</template>

<script>
import Part from './Part'

export default {
    name: "ArrowHelper",

    mixins: [
        Part,
    ],

    props: {
        size: {
            type: Number,
            default: 5,
        },
        direction: {
            type: String,
            default: 'left',
        },
    },

    computed: {
        useX1() {
            if (this.direction == 'left')
                return +this.x + this.size
            else if (this.direction == 'right')
                return +this.x - this.size

            return 0
        },
        useY1() {
            return +this.y - this.size
        },
        useX2() {
            if (this.direction == 'left')
                return +this.x + this.size
            else if (this.direction == 'right')
                return +this.x - this.size

            return 0
        },
        useY2() {
            return +this.y + this.size
        },
    },
}
</script>

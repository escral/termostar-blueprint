<template>
    <line class="helper-line svg-intersection"
          :data-hover="hover"
          :x1="useX1" :y1="useY1" :x2="useX2" :y2="useY2"></line>
</template>

<script>
import Part from './Part'

export default {
    name: "IntersectionHelper",

    mixins: [
        Part,
    ],

    props: {
        size: {
            type: Number,
            default: 10,
        },
    },

    computed: {
        useX1() {
            return +this.x - this.size / 2
        },
        useY1() {
            return +this.y - this.size / 2
        },
        useX2() {
            return +this.x + this.size / 2
        },
        useY2() {
            return +this.y + this.size / 2
        },
    },
}
</script>

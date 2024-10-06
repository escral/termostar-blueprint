<template>
    <svg viewBox="0 0 9 9" width="9" height="9" :x="x" :y="y" class="element">
        <g :data-hover="hover">
            <circle r="6" class="stroke"/>
            <circle r="9" class="stroke"/>
        </g>
    </svg>
</template>

<script>
import Part from './Part'

export default {
    name: "CenterPart",

    mixins: [
        Part,
    ],
}
</script>

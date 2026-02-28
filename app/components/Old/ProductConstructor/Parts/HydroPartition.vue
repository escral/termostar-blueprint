<template>
    <g>
        <rect :x="x" :y="y" class="stroke stroke--filled" :width="thickness" :height="height - thickness * 2"/>
    </g>
</template>

<script>
import {mmToUnits} from './../Units'

export default {
    name: "HydroPartition",

    props: {
        x: {},
        y: {},
        height: {
            type: Number,
            default: mmToUnits(160),
        },
        thickness: {
            type: Number,
            default: mmToUnits(4),
        },
    },

    computed: {

    },
}
</script>

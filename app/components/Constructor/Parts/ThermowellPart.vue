<template>
    <g :transform="`translate(${x}, ${y})`">
        <circle :r="innerDiameter" class="stroke" />
        <circle :r="diameter" class="stroke" />
    </g>
</template>

<script setup lang="ts">
import type { ThermowellPart } from '~/lib/Parts/ThermowellPart'

defineOptions({
    name: 'ThermowellPart',
})

const props = defineProps<{
    part: ThermowellPart
    x: number | string
    y: number | string
}>()

const diameter = computed(() => {
    return mmToUnits(props.part.diameter)
})

const innerDiameter = computed(() => {
    return mmToUnits(props.part.diameter) - 3
})
</script>

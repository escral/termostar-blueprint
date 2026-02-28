<template>
    <g :transform="`translate(${x}, ${y})`">
        <circle :r="innerDiameter" class="stroke" />
        <circle :r="diameter" class="stroke" />
    </g>
</template>

<script setup lang="ts">
import type { ThermowellSpec } from '~/lib/Specs/ThermowellSpec'

defineOptions({
    name: 'ThermowellElement',
})

const props = defineProps<{
    element: ThermowellSpec
    x: number | string
    y: number | string
}>()

const diameter = computed(() => {
    return mmToUnits(props.element.diameter)
})

const innerDiameter = computed(() => {
    return mmToUnits(props.element.diameter) - 3
})
</script>

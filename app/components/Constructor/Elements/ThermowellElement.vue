<template>
    <g :transform="`translate(${x}, ${y})`">
        <circle :r="innerDiameter" class="stroke" />
        <circle :r="diameter" class="stroke" />
    </g>
</template>

<script setup lang="ts">
import type { ThermowellElement } from '~/lib/Elements/ThermowellElement'

defineOptions({
    name: 'ThermowellElement',
})

const props = defineProps<{
    element: ThermowellElement
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

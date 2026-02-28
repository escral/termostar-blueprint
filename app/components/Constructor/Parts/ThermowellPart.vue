<template>
    <circle :r="innerDiameter" class="stroke" />
    <circle :r="diameter" class="stroke" />
</template>

<script setup lang="ts">
type ThermowellRenderable = {
    diameter: number
}

defineOptions({
    name: 'ThermowellPart',
})

const props = defineProps<{
    element: ThermowellRenderable
}>()

const diameter = computed(() => {
    return mmToUnits(props.element.diameter)
})

const innerDiameter = computed(() => {
    return mmToUnits(props.element.diameter) - 3
})
</script>

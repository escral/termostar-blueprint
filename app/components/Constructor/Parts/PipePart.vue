<template>
    <rect
        class="element"
        :width="diameter"
        :height="length"
    />
</template>

<script setup lang="ts">
defineOptions({
    name: 'PipePart',
})

const props = withDefaults(defineProps<{
    diameter: number
    length: number
    thickness: number
}>(), {
    thickness: 5,
})

const diameter = computed(() => mmToUnits(props.diameter))
const length = computed(() => mmToUnits(props.length))
const thickness = computed(() => mmToUnits(props.thickness))
</script>

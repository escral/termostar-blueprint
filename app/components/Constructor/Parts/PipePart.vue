<template>
    <rect
        class="element"
        :width="diameter"
        :height="length"
    />
</template>

<script setup lang="ts">
import type { PipeElement } from '~/lib/Elements/PipeElement'

defineOptions({
    name: 'PipePart',
})

const props = defineProps<{
    element: PipeElement
}>()

const diameter = computed(() => mmToUnits(props.element.diameter))
const length = computed(() => mmToUnits(props.element.length))
const thickness = computed(() => mmToUnits(props.element.thickness))
</script>

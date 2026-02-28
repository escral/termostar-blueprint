<template>
    <rect
        class="element"
        v-bind="$attrs"
        :width="diameter"
        :height="length"
    />
</template>

<script setup lang="ts">
import type { PipePart } from '~/lib/Parts/PipePart'

defineOptions({
    name: 'PipePart',
})

const props = defineProps<{
    part: PipePart,
}>()

const diameter = computed(() => mmToUnits(props.part.diameter))
const length = computed(() => mmToUnits(props.part.length))
const thickness = computed(() => mmToUnits(props.part.thickness))
const insulation = computed(() => props.part.insulation)
</script>

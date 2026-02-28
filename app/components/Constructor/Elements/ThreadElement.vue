<template>
    <g>
        <rect
            class="stroke"
            :x="x"
            :y="y"
            :width="width"
            :height="length"
        />
        <line
            v-for="i in lineCount"
            :key="i"
            class="stroke"
            :x1="0"
            :y1="y + i * lineSpacing"
            :x2="width"
            :y2="y + i * lineSpacing"
        />
    </g>
</template>

<script setup lang="ts">
import { mmToUnits } from '~/utils/UnitsHelper'

defineOptions({
    name: 'ThreadElement',
})

const props = defineProps<{
    width: number
    length: number
    x?: number
    y?: number
}>()

const TARGET_LINE_SPACING_MM = 4

const x = computed(() => props.x ?? 0)
const y = computed(() => props.y ?? 0)

const width = computed(() => mmToUnits(props.width))
const length = computed(() => mmToUnits(props.length))

// Distribute thread lines evenly: target ~4mm spacing, then recalc for exact fit
const lineCount = computed(() => {
    const targetGap = mmToUnits(TARGET_LINE_SPACING_MM)
    const segmentCount = Math.floor(length.value / targetGap)

    return Math.max(0, segmentCount - 1)
})

const lineSpacing = computed(() =>
    lineCount.value > 0 ? length.value / (lineCount.value + 1) : 0,
)
</script>

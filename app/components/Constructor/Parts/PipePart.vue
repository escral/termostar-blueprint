<template>
    <g :transform="`translate(${x}, ${y})`">
        <path
            v-if="insulation"
            class="stroke insulation"
            fill-rule="evenodd"
            :d="'M0,0 H' + width + ' V' + height + ' H0 Z ' + cap(insulation)"
        />
        <path
            v-if="insulation && thickness"
            class="stroke"
            fill-rule="evenodd"
            :d="'M0,0 H' + width + ' V' + height + ' H0 Z ' + cap(insulation + thickness)"
        />
        <path
            v-if="!insulation"
            class="stroke"
            :d="cap(0)"
        />
        <path
            v-if="!insulation && thickness"
            class="stroke"
            :d="cap(thickness)"
        />
    </g>
</template>

<script setup lang="ts">
import type { PipeElement } from '~/lib/Elements/PipeElement'

defineOptions({
    name: 'PipePart',
})

const props = defineProps<{
    element: PipeElement
    x?: number
    y?: number
}>()

const x = computed(() => props.x ?? 0)
const y = computed(() => props.y ?? 0)

const width = computed(() => mmToUnits(props.element.diameter + props.element.insulation * 2))
const height = computed(() => mmToUnits(props.element.length + props.element.insulation * 2))
const insulation = computed(() => mmToUnits(props.element.insulation))
const thickness = computed(() => mmToUnits(props.element.thickness))

function cap(offset: number) {
    return props.element.rounded ? roundCap(offset) : squareCap(offset)
}

function roundCap(offset: number) {
    const br = borderRadius(width.value - offset * 2)
    const h = height.value
    const w = width.value

    return 'M' + offset + ',' + (offset + br) +
        ' Q ' + offset + ',' + offset + ' ' +
        (offset + br) + ',' + offset +
        ' H ' + (w - offset - br) +
        ' Q ' + (w - offset) + ',' + offset + ' ' +
        (w - offset) + ',' + (offset + br) +
        ' V ' + (h - offset - br) +
        ' Q ' + (w - offset) + ',' + (h - offset) + ' ' +
        (w - offset - br) + ',' + (h - offset) +
        ' H ' + (offset + br) +
        ' Q ' + offset + ',' + (h - offset) + ' ' +
        offset + ',' + (h - offset - br) +
        ' Z'
}

function squareCap(offset: number) {
    const h = height.value
    const w = width.value

    return 'M' + offset + ',' + offset + ' H' + (w - offset) + ' V' + (h - offset) + ' H' + offset + ' Z'
}

function borderRadius(w: number) {
    return Math.round((w / 2.3) / 2) * 2
}
</script>

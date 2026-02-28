<template>
    <path
        v-if="insulation"
        class="stroke insulation"
        fill-rule="evenodd"
        :d="outerRect + ' ' + cap(insulation)"
    />
    <path
        v-if="insulation && thickness"
        class="stroke"
        fill-rule="evenodd"
        :d="outerRect + ' ' + cap(insulation + thickness)"
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
</template>

<script setup lang="ts">
import { createPipeCapPath, createPipeOuterRectPath } from '~/lib/render/svg/pipeGeometry'

type PipeRenderable = {
    diameter: number
    length: number
    insulation: number
    thickness: number
    rounded?: boolean
}

defineOptions({
    name: 'PipePart',
})

const props = defineProps<{
    element: PipeRenderable
}>()

const width = computed(() => mmToUnits(props.element.diameter + props.element.insulation * 2))
const height = computed(() => mmToUnits(props.element.length + props.element.insulation * 2))
const insulation = computed(() => mmToUnits(props.element.insulation))
const thickness = computed(() => mmToUnits(props.element.thickness))
const outerRect = computed(() => createPipeOuterRectPath(width.value, height.value))

function cap(offset: number) {
    return createPipeCapPath(width.value, height.value, props.element.rounded ?? false, offset)
}
</script>

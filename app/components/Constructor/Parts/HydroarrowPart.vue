<template>
    <svg
        :viewBox="'0 0 ' + width + ' ' + height"
        :width="width"
        :height="height"
        :x="x"
        :y="y"
    >
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

        <slot />
    </svg>
</template>

<script setup lang="ts">
import { createPipeCapPath, createPipeOuterRectPath } from '~/lib/render/svg/pipeGeometry'

type HydroarrowRenderable = {
    diameter: number
    length: number
    insulation: number
    thickness: number
    rounded?: boolean
}

defineOptions({
    name: 'HydroarrowPart',
})

const props = defineProps<{
    element: HydroarrowRenderable
}>()

const fullDiameter = computed(() => {
    return props.element.diameter + props.element.insulation * 2
})

const fullLength = computed(() => {
    return props.element.length + props.element.insulation * 2
})

const width = computed(() => {
    return mmToUnits(fullDiameter.value)
})

const height = computed(() => {
    return mmToUnits(fullLength.value)
})

const x = computed(() => {
    return -mmToUnits(props.element.insulation)
})

const y = computed(() => {
    return -mmToUnits(props.element.insulation)
})

const insulation = computed(() => {
    return mmToUnits(props.element.insulation)
})

const thickness = computed(() => {
    return mmToUnits(props.element.thickness)
})

const outerRect = computed(() => {
    return createPipeOuterRectPath(width.value, height.value)
})

function cap(offset = 0) {
    const rounded = props.element.rounded ?? props.element.diameter !== 120

    return createPipeCapPath(width.value, height.value, rounded, offset)
}
</script>

<template>
    <svg
        :x="x"
        :y="y"
        :width="width"
        :height="totalHeight"
    >
        <ThreadElement
            v-if="topThreadLengthMm > 0"
            :spec="{
                width: props.spec.diameter,
                length: topThreadLengthMm
            }"
        />
        <g :style="`transform: translateY(${topThreadOffset}px)`">
            <path
                v-if="insulation"
                class="stroke insulation"
                fill-rule="evenodd"
                :d="'M0,0 H' + width + ' V' + bodyHeight + ' H0 Z ' + cap(insulation)"
            />
            <path
                v-if="insulation && thickness"
                class="stroke"
                fill-rule="evenodd"
                :d="'M0,0 H' + width + ' V' + bodyHeight + ' H0 Z ' + cap(insulation + thickness)"
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
        <ThreadElement
            v-if="bottomThreadLengthMm > 0"
            :spec="{
                width: props.spec.diameter,
                length: bottomThreadLengthMm
            }"
            :y="topThreadOffset + bodyHeight"
        />
    </svg>
</template>

<script setup lang="ts">
import type { PipeSpec } from '~/lib/Specs/PipeSpec'
import { mmToUnits } from '~/utils/UnitsHelper'
import ThreadElement from '~/components/Constructor/Elements/ThreadElement.vue'

defineOptions({
    name: 'PipeElement',
})

const props = defineProps<{
    spec: PipeSpec
    x?: number
    y?: number
}>()

const x = computed(() => props.x ?? 0)
const y = computed(() => props.y ?? 0)

// Dimensions in mm (source of truth)
const widthMm = computed(() => props.spec.diameter + props.spec.insulation * 2)
const baseHeightMm = computed(() => props.spec.length + props.spec.insulation * 2)

const topThreadLengthMm = computed(() =>
    props.spec.ends.top.type === 'thread' ? props.spec.ends.top.length : 0,
)
const bottomThreadLengthMm = computed(() =>
    props.spec.ends.bottom.type === 'thread' ? props.spec.ends.bottom.length : 0,
)

const bodyHeightMm = computed(() =>
    baseHeightMm.value - topThreadLengthMm.value - bottomThreadLengthMm.value,
)

// Display dimensions (converted to units)
const width = computed(() => mmToUnits(widthMm.value))
const bodyHeight = computed(() => mmToUnits(bodyHeightMm.value))
const totalHeight = computed(() =>
    mmToUnits(topThreadLengthMm.value) + bodyHeight.value + mmToUnits(bottomThreadLengthMm.value),
)

const insulation = computed(() => mmToUnits(props.spec.insulation))
const thickness = computed(() => mmToUnits(props.spec.thickness))

const topThreadOffset = computed(() => mmToUnits(topThreadLengthMm.value))

function cap(offset: number) {
    return props.spec.rounded ? roundCap(offset) : squareCap(offset)
}

function roundCap(offset: number) {
    const w = width.value
    const h = bodyHeight.value
    const innerW = w - offset * 2
    const br = Math.round((innerW / 2.3) / 2) * 2

    const l = offset
    const r = w - offset
    const t = offset
    const b = h - offset

    // Rounded rect: start left side, go clockwise (top-left arc → top → top-right arc → right → bottom-right arc → bottom → bottom-left arc → left)
    return [
        `M ${l},${t + br}`,
        `Q ${l},${t} ${l + br},${t}`,
        `H ${r - br}`,
        `Q ${r},${t} ${r},${t + br}`,
        `V ${b - br}`,
        `Q ${r},${b} ${r - br},${b}`,
        `H ${l + br}`,
        `Q ${l},${b} ${l},${b - br}`,
        `V ${t + br} Z`,
    ].join(' ')
}

function squareCap(offset: number) {
    const w = width.value
    const h = bodyHeight.value
    const topY = props.spec.ends.top.type === 'covered' ? offset : 0
    const bottomY = h - (props.spec.ends.bottom.type === 'covered' ? offset : 0)

    return `M ${offset},${topY} H ${w - offset} V ${bottomY} H ${offset} Z`
}
</script>

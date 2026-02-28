<template>
    <svg
        :x="x"
        :y="y"
        :width="width"
        :height="height"
    >
        <ThreadElement
            :spec="{
                width: props.spec.diameter,
                length: topThread
            }"
        />
        <g :style="`transform: translateY(${mmToUnits(topThread)}px)`">
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
    </svg>
</template>

<script setup lang="ts">
import type { PipeSpec } from '~/lib/Specs/PipeSpec'
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

const width = computed(() => {
    return mmToUnits(props.spec.diameter + props.spec.insulation * 2)
})

const height = computed(() => {
    let height = props.spec.length + props.spec.insulation * 2

    if (props.spec.ends.top.type === 'thread') {
        height -= props.spec.ends.top.length
    }

    return mmToUnits(height)
})

const insulation = computed(() => mmToUnits(props.spec.insulation))
const thickness = computed(() => mmToUnits(props.spec.thickness))

const topThread = computed(() => {
    if (props.spec.ends.top.type === 'thread') {
        return mmToUnits(props.spec.ends.top.length)
    }

    return 0
})

const bottomThread = computed(() => {
    if (props.spec.ends.bottom.type === 'thread') {
        return mmToUnits(props.spec.ends.bottom.length)
    }

    return 0
})

function cap(offset: number) {
    return props.spec.rounded ? roundCap(offset) : squareCap(offset)
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

    const topOffset = props.spec.ends.top.type === 'covered' ? offset : 0
    const bottomOffset = props.spec.ends.bottom.type === 'covered' ? offset : 0

    return 'M' + offset + ',' + topOffset + ' H' + (w - offset) + ' V' + (h - bottomOffset) + ' H' + offset + ' Z'
}

function borderRadius(w: number) {
    return Math.round((w / 2.3) / 2) * 2
}
</script>

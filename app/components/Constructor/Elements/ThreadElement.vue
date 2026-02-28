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
            :data-asdf="i"
            :x1="0"
            :y1="y + i * gap"
            :x2="width"
            :y2="y + i * gap"
        />
    </g>
</template>

<script setup lang="ts">
defineOptions({
    name: 'ThreadElement',
})

const props = defineProps<{
    spec: {
        width: number
        length: number
    }
    x?: number
    y?: number
}>()

const x = computed(() => props.x ?? 0)
const y = computed(() => props.y ?? 0)

const width = computed(() => mmToUnits(props.spec.width))
const length = computed(() => mmToUnits(props.spec.length))

const lineCount = computed(() => {
    const gap = mmToUnits(4)

    return Math.floor(length.value / gap) - 1
})

const gap = computed(() => length.value / (lineCount.value + 1))
</script>

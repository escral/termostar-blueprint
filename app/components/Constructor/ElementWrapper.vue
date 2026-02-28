<template>
    <g
        style="transform-box: fill-box"
        :style="{
            transform: `rotate(${props.rotate ?? 0}deg)`,
            transformOrigin: pivot ? `center ${pivot}` : undefined,
        }"
    >
        <svg
            :width="mmToUnits(width)"
            :height="mmToUnits(height)"
            class="element"
            :x="mmToUnits((x ?? 0) - anchor.x)"
            :y="mmToUnits((y ?? 0) - anchor.y)"
        >
            <slot />
        </svg>
    </g>
</template>

<script setup lang="ts">
defineOptions({
    name: 'ElementWrapper',
})

//

const props = defineProps<{
    width: number
    height: number
    x?: number
    y?: number
    pivot?: 'top' | 'center' | 'bottom'
    rotate?: number
}>()

const anchor = computed(() => {
    if (props.pivot === 'center') {
        return {
            x: props.width / 2,
            y: props.height / 2,
        }
    } else if (props.pivot === 'top') {
        return {
            x: props.width / 2,
            y: 0,
        }
    } else if (props.pivot === 'bottom') {
        return {
            x: props.width / 2,
            y: props.height,
        }
    }

    return {
        x: 0,
        y: 0,
    }
})
</script>

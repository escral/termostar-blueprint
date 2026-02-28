<template>
    <g :transform="`translate(${x}, ${y})`">
        <circle r="4" class="anchor-debug-point" />
        <line x1="-7" y1="0" x2="7" y2="0" class="anchor-debug-line" />
        <line x1="0" y1="-7" x2="0" y2="7" class="anchor-debug-line" />
        <text x="8" y="-8" class="anchor-debug-label">{{ label }}</text>
    </g>
</template>

<script setup lang="ts">
defineProps<{
    x: number
    y: number
    label: string
}>()
</script>

<style scoped>
.anchor-debug-point {
    fill: #ef4444;
    stroke: #ffffff;
    stroke-width: 1;
}

.anchor-debug-line {
    stroke: #ef4444;
    stroke-width: 1;
}

.anchor-debug-label {
    fill: #ef4444;
    font-size: 10px;
    font-family: monospace;
}
</style>

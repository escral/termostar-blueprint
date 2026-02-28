<template>
    <g :id="id">
        <slot />
    </g>
</template>

<script setup lang="ts">
defineProps<{
    id: string
}>()
</script>

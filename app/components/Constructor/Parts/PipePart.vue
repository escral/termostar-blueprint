<template>
    <svg
        viewBox="0 0 9 9"
        width="9"
        height="9"
        class="element"
    >
        <circle r="6" class="stroke" />
        <circle r="9" class="stroke" />
    </svg>
</template>

<script setup lang="ts">
import type { PipePart } from '~/lib/Parts/PipePart'

defineOptions({
    name: 'PipePart',
})

const props = defineProps<{
    part: PipePart
}>()
</script>

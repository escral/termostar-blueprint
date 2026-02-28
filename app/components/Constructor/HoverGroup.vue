<template>
    <g class="--hoverable" :data-hover-group="group">
        <slot />
    </g>
</template>

<script setup lang="ts">
defineOptions({
    name: 'HoverGroup',
})

//

const props = defineProps<{
    group: string
}>()
</script>

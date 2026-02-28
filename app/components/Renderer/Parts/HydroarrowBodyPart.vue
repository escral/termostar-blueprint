<template>
    <HydroarrowPart :element="node.params" />
</template>

<script setup lang="ts">
import HydroarrowPart from '~/components/Constructor/Parts/HydroarrowPart.vue'
import type { RenderNode } from '~/lib/render-model/toRenderModel'

const props = defineProps<{
    node: RenderNode<'HydroarrowBody'>
}>()

const node = computed(() => props.node)
</script>

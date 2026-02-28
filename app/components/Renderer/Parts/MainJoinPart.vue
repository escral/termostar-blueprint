<template>
    <PipePart :element="node.params" />
</template>

<script setup lang="ts">
import PipePart from '~/components/Constructor/Parts/PipePart.vue'
import type { RenderNode } from '~/lib/render-model/toRenderModel'

const props = defineProps<{
    node: RenderNode<'MainJoin'>
}>()

const node = computed(() => props.node)
</script>

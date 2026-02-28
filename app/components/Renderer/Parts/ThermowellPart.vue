<template>
    <ThermowellPrimitivePart :element="node.params" />
</template>

<script setup lang="ts">
import ThermowellPrimitivePart from '~/components/Constructor/Parts/ThermowellPart.vue'
import type { RenderNode } from '~/lib/render-model/toRenderModel'

const props = defineProps<{
    node: RenderNode<'Thermowell'>
}>()

const node = computed(() => props.node)
</script>

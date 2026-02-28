<template>
    <g
        v-hover="node.hoverGroup ?? node.id"
        :transform="transform"
    >
        <component :is="renderer" :node="node" />
    </g>
</template>

<script setup lang="ts">
import { getRendererForNode } from '~/lib/render/registry/partRendererRegistry'
import type { RenderNode } from '~/lib/render-model/toRenderModel'

const props = defineProps<{
    node: RenderNode
}>()

const renderer = computed(() => {
    return getRendererForNode(props.node)
})

const transform = computed(() => {
    const x = mmToUnits(props.node.transform2d.x)
    const y = mmToUnits(props.node.transform2d.y)
    const rotation = props.node.transform2d.rotation

    return `translate(${x}, ${y}) rotate(${rotation})`
})
</script>

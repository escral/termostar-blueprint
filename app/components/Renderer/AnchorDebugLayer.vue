<template>
    <g>
        <AnchorMarker
            v-for="anchor in worldAnchors"
            :key="anchor.id"
            :x="mmToUnits(anchor.x)"
            :y="mmToUnits(anchor.y)"
            :label="anchor.label"
        />
    </g>
</template>

<script setup lang="ts">
import AnchorMarker from '~/components/Renderer/AnchorMarker.vue'
import { toWorldAnchor } from '~/lib/render/anchors/anchorMath'
import { getNodesWithAnchors } from '~/lib/render-model/nodeSelectors'
import type { RenderNode } from '~/lib/render-model/toRenderModel'

const props = defineProps<{
    nodes: RenderNode[]
}>()

const worldAnchors = computed(() => {
    return getNodesWithAnchors(props.nodes).flatMap((node) => {
        return (node.anchors ?? []).map(anchor => ({
            id: `${node.id}:${anchor.id}`,
            label: `${node.id}:${anchor.label ?? anchor.id}`,
            ...toWorldAnchor(anchor, node.transform2d),
        }))
    })
})
</script>

<template>
    <svg
        xmlns="http://www.w3.org/2000/svg"
        :viewBox="`0 0 400 ${height}`"
        class="overflow-visible ml-[300px] w-[400px] h-[400px]"
        fill="#FFF"
    >
        <InsulationDefs />

        <SVGLayerGroup
            v-for="layer in layers"
            :id="layer.groupId"
            :key="layer.id"
        >
            <PartRenderer
                v-for="node in partNodesByLayer[layer.id]"
                :key="node.id"
                :node="node"
            />
            <AnchorDebugLayer v-if="layer.id === 'debug'" :nodes="props.nodes" />
        </SVGLayerGroup>
    </svg>
</template>

<script setup lang="ts">
import InsulationDefs from '~/components/Constructor/InsulationDefs.vue'
import AnchorDebugLayer from '~/components/Renderer/AnchorDebugLayer.vue'
import PartRenderer from '~/components/Renderer/PartRenderer.vue'
import SVGLayerGroup from '~/components/Renderer/SVGLayerGroup.vue'
import { LAYER_CONFIG } from '~/lib/render/layers/layerConfig'
import { getFirstNodeByType, getPartNodesByLayer } from '~/lib/render-model/nodeSelectors'
import type { RenderNode } from '~/lib/render-model/toRenderModel'

const props = defineProps<{
    nodes: RenderNode[]
}>()

const layers = computed(() => {
    return [...LAYER_CONFIG].sort((left, right) => left.order - right.order)
})

const partNodesByLayer = computed(() => {
    return {
        geometry: LAYER_CONFIG.find(layer => layer.id === 'geometry')?.renderPartNodes
            ? getPartNodesByLayer(props.nodes, 'geometry')
            : [],
        dimensions: LAYER_CONFIG.find(layer => layer.id === 'dimensions')?.renderPartNodes
            ? getPartNodesByLayer(props.nodes, 'dimensions')
            : [],
        labels: LAYER_CONFIG.find(layer => layer.id === 'labels')?.renderPartNodes
            ? getPartNodesByLayer(props.nodes, 'labels')
            : [],
        debug: LAYER_CONFIG.find(layer => layer.id === 'debug')?.renderPartNodes
            ? getPartNodesByLayer(props.nodes, 'debug')
            : [],
    }
})

const height = computed(() => {
    const hydroarrow = getFirstNodeByType(props.nodes, 'HydroarrowBody')
    if (!hydroarrow) {
        return 0
    }

    return mmToUnits(hydroarrow.params.length + hydroarrow.params.insulation * 2)
})

</script>

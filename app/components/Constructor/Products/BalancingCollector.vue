<template>
    <div
        class="relative flex"
        :style="{
            'height': maxHeight + 'px',
            'padding': '100px 0',
        }"
    >
        <BlueprintCanvas :nodes="renderNodes" />
    </div>
</template>

<script setup lang="ts">
import BlueprintCanvas from '~/components/Renderer/BlueprintCanvas.vue'
import { getFirstNodeByType } from '~/lib/render-model/nodeSelectors'
import type { RenderNode } from '~/lib/render-model/toRenderModel'

defineOptions({
    name: 'BalancingCollector',
})

//

const props = defineProps<{
    renderNodes: RenderNode[]
}>()

//

const maxHeight = computed(() => {
    const hydroarrow = getFirstNodeByType(props.renderNodes, 'HydroarrowBody')
    if (!hydroarrow) {
        return 0
    }

    return mmToUnits(hydroarrow.params.length + hydroarrow.params.insulation * 2)
})
</script>

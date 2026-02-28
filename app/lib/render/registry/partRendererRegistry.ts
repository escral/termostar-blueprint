import HydroarrowBodyPart from '~/components/Renderer/Parts/HydroarrowBodyPart.vue'
import MainJoinPart from '~/components/Renderer/Parts/MainJoinPart.vue'
import ThermowellPart from '~/components/Renderer/Parts/ThermowellPart.vue'
import type { RenderNode } from '~/lib/render-model/toRenderModel'
import type { PartType } from '~/lib/render-model/contracts'
import type { PartRendererComponent } from '~/lib/render/registry/types'

const partRendererRegistry: Record<PartType, PartRendererComponent> = {
    HydroarrowBody: HydroarrowBodyPart,
    MainJoin: MainJoinPart,
    Thermowell: ThermowellPart,
}

export const getRendererForNode = (node: RenderNode): PartRendererComponent => {
    return partRendererRegistry[node.partType]
}

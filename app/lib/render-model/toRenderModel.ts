import type { Anchor2D } from '~/lib/render/anchors/types'
import type {
    LayerType,
    PartParamsByType,
    PartType,
    Transform2D,
} from '~/lib/render-model/contracts'
import type { ResolvedBlueprint } from '~/lib/resolvers/resolveBlueprint'

export type RenderNode<T extends PartType = PartType> = {
    id: string
    partType: T
    params: PartParamsByType[T]
    transform2d: Transform2D
    layer: LayerType
    hoverGroup?: string
    styleTags?: string[]
    zIndex?: number
    anchors?: Anchor2D[]
}

export const toRenderModel = (resolved: ResolvedBlueprint): RenderNode[] => {
    return resolved.parts.map(part => ({
        id: part.id,
        partType: part.type,
        params: part.params,
        transform2d: part.transform2d,
        layer: part.layer,
        hoverGroup: part.hoverGroup,
        styleTags: part.tags,
        zIndex: part.zIndex,
        anchors: part.anchors,
    }))
}

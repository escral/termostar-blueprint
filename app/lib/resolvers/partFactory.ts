import type { Anchor2D } from '~/lib/render/anchors/types'
import type { LayerType, PartParamsByType, PartType, Transform2D } from '~/lib/render-model/contracts'
import type { AssemblySpec } from '~/lib/specs/assembly'

export type PartInstance<T extends PartType = PartType> = {
    id: string
    type: T
    params: PartParamsByType[T]
    transform2d: Transform2D
    layer: LayerType
    hoverGroup?: string
    tags?: string[]
    zIndex?: number
    anchors?: Anchor2D[]
}

export const createPartFromAssembly = (assembly: AssemblySpec): PartInstance => {
    return {
        id: assembly.id,
        type: assembly.partType,
        params: assembly.params as PartParamsByType[typeof assembly.partType],
        transform2d: {
            x: 0,
            y: 0,
            rotation: 0,
        },
        layer: assembly.layer ?? 'geometry',
        hoverGroup: assembly.hoverGroup,
        tags: assembly.tags,
        zIndex: assembly.zIndex,
        anchors: [],
    }
}

import type { LayerType } from '~/lib/render-model/contracts'

export type LayerConfig = {
    id: LayerType
    groupId: string
    order: number
    renderPartNodes: boolean
}

export const LAYER_CONFIG: LayerConfig[] = [
    { id: 'geometry', groupId: 'layer-geometry', order: 10, renderPartNodes: true },
    { id: 'dimensions', groupId: 'layer-dimensions', order: 20, renderPartNodes: true },
    { id: 'labels', groupId: 'layer-labels', order: 30, renderPartNodes: true },
    { id: 'debug', groupId: 'layer-debug', order: 40, renderPartNodes: false },
]

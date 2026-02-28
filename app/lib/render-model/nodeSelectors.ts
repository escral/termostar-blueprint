import type { LayerType, PartType } from '~/lib/render-model/contracts'
import type { RenderNode } from '~/lib/render-model/toRenderModel'

export const isRenderNodeType = <TType extends PartType>(node: RenderNode, partType: TType): node is RenderNode<TType> => {
    return node.partType === partType
}

export const getFirstNodeByType = <TType extends PartType>(nodes: RenderNode[], partType: TType): RenderNode<TType> | undefined => {
    return nodes.find((node): node is RenderNode<TType> => isRenderNodeType(node, partType))
}

export const getNodesByType = <TType extends PartType>(nodes: RenderNode[], partType: TType): RenderNode<TType>[] => {
    return nodes.filter((node): node is RenderNode<TType> => isRenderNodeType(node, partType))
}

export const getNodesByLayer = (nodes: RenderNode[], layer: LayerType): RenderNode[] => {
    return nodes.filter(node => node.layer === layer)
}

export const getNodesWithAnchors = (nodes: RenderNode[]): RenderNode[] => {
    return nodes.filter(node => Boolean(node.anchors?.length))
}

export const getPartNodesByLayer = (nodes: RenderNode[], layer: LayerType): RenderNode[] => {
    return getNodesByLayer(nodes, layer).sort((left, right) => (left.zIndex ?? 0) - (right.zIndex ?? 0))
}

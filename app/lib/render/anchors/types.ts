export type Anchor2D = {
    id: string
    x: number
    y: number
    label?: string
}

export type AnchorLink = {
    fromNodeId: string
    fromAnchorId: string
    toNodeId: string
    toAnchorId: string
}

export type AnchorReference = {
    assemblyId: string
    anchorId: string
}

export type PlacementRule =
    | {
        type: 'absolute'
        x: number
        y: number
        rotation?: number
    }
    | {
        type: 'coincide'
        selfAnchorId: string
        target: AnchorReference
        offsetX?: number
        offsetY?: number
        rotation?: number
    }
    | {
        type: 'offset'
        target: AnchorReference
        offsetX: number
        offsetY: number
        rotation?: number
    }
    | {
        type: 'align'
        selfAnchorId: string
        target: AnchorReference
        axis: 'x' | 'y'
        offset?: number
        rotation?: number
    }

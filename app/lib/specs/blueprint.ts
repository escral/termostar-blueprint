import type { AssemblySpec, HydroarrowDiameter } from '~/lib/specs/assembly'
import type { Anchor2D } from '~/lib/render/anchors/types'

export type ProductSpec = {
    id: string
    type: 'BalancingCollectorWithHydroarrow'
    assemblies: AssemblySpec[]
}

export type BlueprintSpec = {
    id: string
    products: ProductSpec[]
}

export const createHydroarrowJoinAnchors = (diameter: number, length: number, insulation: number, joinOffset: number): Anchor2D[] => {
    const fullDiameter = diameter + insulation * 2
    const fullLength = length + insulation * 2

    return [
        {
            id: 'join-top',
            x: fullDiameter / 2,
            y: fullLength / 2 - joinOffset,
            label: 'join-top',
        },
        {
            id: 'join-bottom',
            x: fullDiameter / 2,
            y: fullLength / 2 + joinOffset,
            label: 'join-bottom',
        },
    ]
}

export const createDefaultBlueprintSpec = (hydroarrowDiameter: HydroarrowDiameter = 120): BlueprintSpec => {
    const hydroarrowId = 'hydroarrow-main'
    const hydroarrowJoinOffset = 130
    const mainJoinDiameter = 50
    const mainJoinInsulation = 20
    const mainJoinLength = 70

    return {
        id: 'blueprint-default',
        products: [
            {
                id: 'collector-main',
                type: 'BalancingCollectorWithHydroarrow',
                assemblies: [
                    {
                        id: hydroarrowId,
                        type: 'Hydroarrow',
                        partType: 'HydroarrowBody',
                        layer: 'geometry',
                        hoverGroup: 'hydroarrow-part',
                        tags: ['hydroarrow'],
                        params: {
                            diameter: hydroarrowDiameter,
                            length: 560,
                            insulation: 20,
                            thickness: 5,
                        },
                        anchors: createHydroarrowJoinAnchors(
                            hydroarrowDiameter,
                            560,
                            20,
                            hydroarrowJoinOffset,
                        ),
                        placement: {
                            type: 'absolute',
                            x: 0,
                            y: 0,
                            rotation: 0,
                        },
                    },
                    {
                        id: `${hydroarrowId}:main-join-top`,
                        type: 'MainJoin',
                        partType: 'MainJoin',
                        layer: 'geometry',
                        hoverGroup: 'hydroarrow-joiner',
                        tags: ['hydroarrow', 'main-join'],
                        params: {
                            diameter: mainJoinDiameter,
                            length: mainJoinLength,
                            insulation: mainJoinInsulation,
                            thickness: 5,
                            rounded: false,
                            side: 'top',
                        },
                        anchors: [
                            {
                                id: 'center',
                                x: (mainJoinDiameter + mainJoinInsulation * 2) / 2,
                                y: (mainJoinLength + mainJoinInsulation * 2) / 2,
                                label: 'top-center',
                            },
                        ],
                        placement: {
                            type: 'coincide',
                            selfAnchorId: 'center',
                            target: {
                                assemblyId: hydroarrowId,
                                anchorId: 'join-top',
                            },
                            rotation: 0,
                        },
                    },
                    {
                        id: `${hydroarrowId}:main-join-bottom`,
                        type: 'MainJoin',
                        partType: 'MainJoin',
                        layer: 'geometry',
                        hoverGroup: 'hydroarrow-joiner',
                        tags: ['hydroarrow', 'main-join'],
                        params: {
                            diameter: mainJoinDiameter,
                            length: mainJoinLength,
                            insulation: mainJoinInsulation,
                            thickness: 5,
                            rounded: false,
                            side: 'bottom',
                        },
                        anchors: [
                            {
                                id: 'center',
                                x: (mainJoinDiameter + mainJoinInsulation * 2) / 2,
                                y: (mainJoinLength + mainJoinInsulation * 2) / 2,
                                label: 'bottom-center',
                            },
                        ],
                        placement: {
                            type: 'coincide',
                            selfAnchorId: 'center',
                            target: {
                                assemblyId: hydroarrowId,
                                anchorId: 'join-bottom',
                            },
                            rotation: 0,
                        },
                    },
                    {
                        id: `${hydroarrowId}:thermowell-top`,
                        type: 'Thermowell',
                        partType: 'Thermowell',
                        layer: 'geometry',
                        hoverGroup: 'hydroarrow-center',
                        tags: ['hydroarrow', 'thermowell'],
                        params: {
                            diameter: 12,
                            side: 'top',
                        },
                        anchors: [
                            {
                                id: 'center',
                                x: 0,
                                y: 0,
                                label: 'top-center',
                            },
                        ],
                        placement: {
                            type: 'coincide',
                            selfAnchorId: 'center',
                            target: {
                                assemblyId: hydroarrowId,
                                anchorId: 'join-top',
                            },
                        },
                    },
                    {
                        id: `${hydroarrowId}:thermowell-bottom`,
                        type: 'Thermowell',
                        partType: 'Thermowell',
                        layer: 'geometry',
                        hoverGroup: 'hydroarrow-center',
                        tags: ['hydroarrow', 'thermowell'],
                        params: {
                            diameter: 12,
                            side: 'bottom',
                        },
                        anchors: [
                            {
                                id: 'center',
                                x: 0,
                                y: 0,
                                label: 'bottom-center',
                            },
                        ],
                        placement: {
                            type: 'coincide',
                            selfAnchorId: 'center',
                            target: {
                                assemblyId: hydroarrowId,
                                anchorId: 'join-bottom',
                            },
                        },
                    },
                ],
            },
        ],
    }
}

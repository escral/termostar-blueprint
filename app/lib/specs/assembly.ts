import type { Anchor2D } from '~/lib/render/anchors/types'
import type { LayerType, PartParamsByType, PartType } from '~/lib/render-model/contracts'
import type { PlacementRule } from '~/lib/specs/placement'

export type HydroarrowDiameter = 120 | 159 | 219

export type AssemblyType = 'Hydroarrow' | 'MainJoin' | 'Thermowell'

export type AssemblyParamsByType = {
    Hydroarrow: {
        diameter: HydroarrowDiameter
        length: number
        insulation: number
        thickness: number
    }
    MainJoin: {
        diameter: number
        length: number
        insulation: number
        thickness: number
        side?: 'top' | 'bottom'
    }
    Thermowell: {
        diameter: number
        side?: 'top' | 'bottom'
    }
}

export type AssemblySpec<T extends AssemblyType = AssemblyType> = {
    id: string
    type: T
    params: AssemblyParamsByType[T]
    partType: PartType
    layer?: LayerType
    hoverGroup?: string
    tags?: string[]
    zIndex?: number
    anchors?: Anchor2D[]
    placement?: PlacementRule
}

export type PartParamsByAssemblyType = {
    [TType in AssemblyType]: PartParamsByType[AssemblySpec<TType>['partType']]
}

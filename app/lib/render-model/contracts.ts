export type LayerType = 'geometry' | 'dimensions' | 'labels' | 'debug'

export type Transform2D = {
    x: number
    y: number
    rotation: number
}

export type PartType = 'HydroarrowBody' | 'MainJoin' | 'Thermowell'

export type PartParamsByType = {
    HydroarrowBody: {
        diameter: number
        length: number
        insulation: number
        thickness: number
        rounded?: boolean
    }
    MainJoin: {
        diameter: number
        length: number
        insulation: number
        thickness: number
        rounded?: boolean
        side?: 'top' | 'bottom'
    }
    Thermowell: {
        diameter: number
        side?: 'top' | 'bottom'
    }
}

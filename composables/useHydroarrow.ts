import type { SelectOption } from '~/types/SelectOption'

export type HydroarrowParams = {
    diameter: number,
    length: number
    insulation: number
    thickness: number
    rounded: boolean
}

export function useHydroarrow(params: HydroarrowParams) {
    const sizeOptions = computed<SelectOption<HydroarrowDiameter>[]>(() => [
        { value: 120, title: 'Ø120' },
        { value: 159, title: 'Ø159' },
        { value: 219, title: 'Ø219' },
    ])

    //

    const dimentions = computed(() => {
        return {
            diameter: params.diameter,
            fullDiameter: params.diameter + params.insulation * 2,

            length: params.length,
            fullLength: params.length + params.insulation * 2,
        }
    })

    return {
        params,
        sizeOptions,
        dimentions,
    }
}

export type HydroarrowDiameter = 120 | 159 | 219
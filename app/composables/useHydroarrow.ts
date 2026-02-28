import type { SelectOption } from '~/types/SelectOption'
import type { HydroarrowDiameter } from '~/lib/specs/assembly'

type HydroarrowSpecLike = {
    diameter: HydroarrowDiameter
    length: number
    insulation: number
    thickness: number
}

export function useHydroarrow(hydroarrow: () => HydroarrowSpecLike) {
    const sizeOptions = computed<SelectOption<HydroarrowDiameter>[]>(() => [
        { value: 120, title: 'Ø120' },
        { value: 159, title: 'Ø159' },
        { value: 219, title: 'Ø219' },
    ])

    //

    const dimentions = computed(() => {
        const value = hydroarrow()
        const fullDiameter = value.diameter + value.insulation * 2
        const fullLength = value.length + value.insulation * 2

        return {
            diameter: value.diameter,
            fullDiameter,
            length: value.length,
            fullLength,
        }
    })

    return {
        sizeOptions,
        dimentions,
    }
}


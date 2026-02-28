import type { SelectOption } from '~/types/SelectOption'
import type { HydroarrowDiameter, HydroarrowPart } from '~/lib/Parts/HydroarrowPart'

export function useHydroarrow(hydroarrow: HydroarrowPart) {
    const sizeOptions = computed<SelectOption<HydroarrowDiameter>[]>(() => [
        { value: 120, title: 'Ø120' },
        { value: 159, title: 'Ø159' },
        { value: 219, title: 'Ø219' },
    ])

    //

    const dimentions = computed(() => {
        return {
            diameter: hydroarrow.diameter,
            fullDiameter: hydroarrow.fullDiameter,
            length: hydroarrow.length,
            fullLength: hydroarrow.fullLength,
        }
    })

    return {
        part: hydroarrow,
        sizeOptions,
        dimentions,
    }
}


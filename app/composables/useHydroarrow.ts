import type { SelectOption } from '~/types/SelectOption'
import type { HydroarrowDiameter, HydroarrowElement } from '~/lib/Elements/HydroarrowElement'

export function useHydroarrow(hydroarrow: HydroarrowElement) {
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
        element: hydroarrow,
        sizeOptions,
        dimentions,
    }
}


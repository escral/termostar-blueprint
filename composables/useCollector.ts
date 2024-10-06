import {type HydroarrowParams, useHydroarrow} from '~/composables/useHydroarrow'

export function useCollector(params: {
    hydroarrow: HydroarrowParams,
}) {
    const hydroarrow = useHydroarrow(params.hydroarrow)

    return {
        hydroarrow,
    }
}
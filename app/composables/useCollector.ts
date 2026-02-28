import { useHydroarrow } from '~/composables/useHydroarrow'
import type BalancingCollectorWithHydroarrowProduct from '~/lib/Products/BalancingCollectorWithHydroarrowProduct'

export function useCollector(collector: BalancingCollectorWithHydroarrowProduct) {
    const hydroarrow = useHydroarrow(collector.hydroarrow)

    return {
        hydroarrow,
    }
}
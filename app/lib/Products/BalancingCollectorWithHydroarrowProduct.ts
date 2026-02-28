import { HydroarrowPart } from '~/lib/Parts/HydroarrowPart'
import Product from '~/lib/Products/Product'

export default class BalancingCollectorWithHydroarrowProduct extends Product {
    public hydroarrow = new HydroarrowPart(
        120,
        560,
    )
}
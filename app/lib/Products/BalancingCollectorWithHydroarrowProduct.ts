import { HydroarrowElement } from '~/lib/Elements/HydroarrowElement'
import Product from '~/lib/Products/Product'

export default class BalancingCollectorWithHydroarrowProduct extends Product {
    public hydroarrow = new HydroarrowElement(
        120,
        560,
    )
}
import { HydroarrowSpec } from '~/lib/Specs/HydroarrowSpec'
import Product from '~/lib/Products/Product'

export default class BalancingCollectorWithHydroarrowProduct extends Product {
    public hydroarrow = new HydroarrowSpec(
        120,
        560,
    )
}

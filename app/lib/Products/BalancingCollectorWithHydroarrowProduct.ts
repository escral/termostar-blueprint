import { HydroarrowSpec } from '~/lib/Specs/HydroarrowSpec'
import Product from '~/lib/Products/Product'

export type BalancingCollectorInputs = {
    hydroarrowDiameter: HydroarrowSpec['diameter']
}

export type BalancingCollectorSpecs = {
    hydroarrow: HydroarrowSpec
}

export default class BalancingCollectorWithHydroarrowProduct extends Product {
    public declare specs: BalancingCollectorSpecs

    public constructor(inputs: BalancingCollectorInputs) {
        super()

        this.recalculateSpecs(inputs)
    }

    public recalculateSpecs(inputs: BalancingCollectorInputs) {
        this.specs = this.calculateSpecs(inputs)
    }

    public calculateSpecs(inputs: BalancingCollectorInputs): BalancingCollectorSpecs {
        const hydroarrow = new HydroarrowSpec(
            inputs.hydroarrowDiameter,
            560,
        )

        return {
            hydroarrow,
        }
    }
}

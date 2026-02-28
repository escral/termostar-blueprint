import { PipePart } from '~/lib/Parts/PipePart'
import { ThermowellPart } from '~/lib/Parts/ThermowellPart'
import HydroarrowJoinPoint from '~/lib/Points/HydroarrowJoinPoint'
import { HydroarrowMainJoinPart } from '~/lib/Parts/HydroarrowMainJoinPart'

export type HydroarrowDiameter = 120 | 159 | 219

export class HydroarrowPart extends PipePart {
    public constructor(
        public diameter: HydroarrowDiameter,
        public length: number,
    ) {
        super()
    }

    public insulation: number = 20
    public thickness: number = 5

    public get rounded() {
        // noinspection RedundantIfStatementJS
        if (this.diameter === 120) {
            return false
        }

        return true
    }

    public get fullDiameter() {
        return this.diameter + this.insulation * 2
    }

    public get fullLength() {
        return this.length + this.insulation * 2
    }

    public thermowells = {
        top: new ThermowellPart(),
        bottom: new ThermowellPart(),
    }

    public join = {
        top: new HydroarrowJoinPoint(
            () => this.fullDiameter / 2,
            () => this.fullLength / 2 - 130,
        ),
        bottom: new HydroarrowJoinPoint(
            () => this.fullDiameter / 2,
            () => this.fullLength / 2 + 130,
        ),
    }

    public mainJoin = {
        top: new HydroarrowMainJoinPart(),
        bottom: new HydroarrowMainJoinPart(),
    }
}

import { PipeSpec } from '~/lib/Specs/PipeSpec'
import { ThermowellSpec } from '~/lib/Specs/ThermowellSpec'
import JoinPoint from '~/lib/Points/JoinPoint'
import { HydroarrowMainJoinSpec } from '~/lib/Specs/HydroarrowMainJoinSpec'

export type HydroarrowDiameter = 120 | 159 | 219

export class HydroarrowSpec extends PipeSpec {
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
        top: new ThermowellSpec(),
        bottom: new ThermowellSpec(),
    }

    public thermowellJoin = {
        top: new JoinPoint(
            () => this.fullDiameter / 2,
            () => this.fullLength / 2 - 130,
        ),
        bottom: new JoinPoint(
            () => this.fullDiameter / 2,
            () => this.fullLength / 2 + 130,
        ),
    }

    public mainJoin = {
        top: new HydroarrowMainJoinSpec(),
        bottom: new HydroarrowMainJoinSpec(),
    }
}

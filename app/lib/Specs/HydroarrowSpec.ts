import { type PipeEnd, PipeSpec } from '~/lib/Specs/PipeSpec'
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
    public rounded: boolean = false

    public override ends: Record<'top' | 'bottom', PipeEnd> = {
        top: {
            type: 'covered',
        },
        bottom: {
            type: 'covered',
        },
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

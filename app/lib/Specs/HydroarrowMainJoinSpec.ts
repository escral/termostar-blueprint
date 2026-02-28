import { type PipeEnd, PipeSpec } from '~/lib/Specs/PipeSpec'

export class HydroarrowMainJoinSpec extends PipeSpec {
    public diameter: number = 50
    public length: number = 100
    public insulation: number = 0
    public thickness: number = 5

    public get rounded() {
        return false
    }

    public override ends: Record<'top' | 'bottom', PipeEnd> = {
        top: {
            type: 'thread',
            length: 20,
        },
        bottom: {
            type: 'cut',
        },
    }
}

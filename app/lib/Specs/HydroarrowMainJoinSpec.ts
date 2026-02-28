import { PipeSpec } from '~/lib/Specs/PipeSpec'

export class HydroarrowMainJoinSpec extends PipeSpec {
    public diameter: number = 50
    public length: number = 100
    public insulation: number = 0
    public thickness: number = 5

    public get rounded() {
        return false
    }
}

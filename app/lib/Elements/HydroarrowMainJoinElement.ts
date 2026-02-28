import { PipeElement } from '~/lib/Elements/PipeElement'

export class HydroarrowMainJoinElement extends PipeElement {
    public diameter: number = 100
    public length: number = 20
    public insulation: number = 0
    public thickness: number = 5

    public get rounded() {
        return false
    }
}

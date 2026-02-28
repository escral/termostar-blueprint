import { PipeElement } from '~/lib/Elements/PipeElement'

export class HydroarrowMainJoinElement extends PipeElement {
    public diameter: number = 50
    public length: number = 70
    public insulation: number = 20
    public thickness: number = 5

    public get rounded() {
        return false
    }
}

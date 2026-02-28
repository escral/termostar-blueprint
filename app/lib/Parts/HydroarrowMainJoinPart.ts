import { PipePart } from '~/lib/Parts/PipePart'

export class HydroarrowMainJoinPart extends PipePart {
    public diameter: number = 100
    public length: number = 20
    public insulation: number = 0
    public thickness: number = 5

    public get rounded() {
        return false
    }
}

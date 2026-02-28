export abstract class PipePart {
    public abstract diameter: number
    public abstract length: number
    public abstract insulation: number
    public abstract thickness: number
    public abstract rounded: boolean

    public get area() {
        if (this.rounded) {
            const radius = this.diameter / 2

            return Math.PI * radius * radius
        } else {
            return this.diameter * this.diameter
        }
    }
}

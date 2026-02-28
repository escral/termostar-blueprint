export type PipeEnd = {
    type: 'thread',
    length: number
} | {
    type: 'cut',
} | {
    type: 'covered'
}

export abstract class PipeSpec {
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

    public ends: Record<'top' | 'bottom', PipeEnd> = {
        top: {
            type: 'cut',
        },
        bottom: {
            type: 'cut',
        },
    }
}

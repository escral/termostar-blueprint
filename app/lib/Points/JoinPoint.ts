import Point from '~/lib/Points/Point'

export default class JoinPoint extends Point {
    public constructor(
        protected _x: number | (() => number),
        protected _y: number | (() => number),
    ) {
        super()
    }

    public get x() {
        if (typeof this._x === 'number') {
            return this._x
        }

        return this._x()
    }

    public get y() {
        if (typeof this._y === 'number') {
            return this._y
        }

        return this._y()
    }
}

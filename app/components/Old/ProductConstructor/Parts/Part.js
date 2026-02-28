import {mmToUnits} from './../Units'

export default {
    props: {
        hover: {},
        x: {},
        y: {},
        rotate: {},
        flipX: {
            type: Boolean,
            default: false,
        },
        flipY: {
            type: Boolean,
            default: false,
        },
    },

    data() {
        return {
        }
    },

    methods: {
        mmToUnits: mmToUnits,
    },

    computed: {
        pivot() {
            return {
                x: 0,
                y: 0,
            }
        },
        transform() {
            if (! this.rotate && ! this.flipX && ! this.flipY)
                return null

            return (this.rotate ? 'rotate(' + this.rotate + ' ' + this.transformOrigin + ')' : '') +
                ((this.flipX || this.flipY) ? ' scale(' + (this.flipX ? -1 : 1) + ' ' + (this.flipY ? -1 : 1) + ')'  : '')
        },
        transformOrigin() {
            return (this.pivot.x) + ' ' + (this.pivot.y)
        },
        useX() {
            return +(this.x || 0) - this.pivot.x
        },
        useY() {
            return +(this.y || 0) - this.pivot.y
        },
    },
}

import type { Anchor2D } from '~/lib/render/anchors/types'
import type { Transform2D } from '~/lib/render-model/contracts'

export const toWorldAnchor = (anchor: Anchor2D, transform: Transform2D): Anchor2D => {
    const radians = (transform.rotation * Math.PI) / 180
    const cos = Math.cos(radians)
    const sin = Math.sin(radians)

    const rotatedX = anchor.x * cos - anchor.y * sin
    const rotatedY = anchor.x * sin + anchor.y * cos

    return {
        ...anchor,
        x: rotatedX + transform.x,
        y: rotatedY + transform.y,
    }
}

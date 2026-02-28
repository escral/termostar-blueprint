import type { Anchor2D } from '~/lib/render/anchors/types'
import type { AssemblySpec } from '~/lib/specs/assembly'

export const createAnchorsFromAssembly = (assembly: AssemblySpec): Anchor2D[] => {
    return (assembly.anchors ?? []).map(anchor => ({
        id: anchor.id,
        x: anchor.x,
        y: anchor.y,
        label: anchor.label,
    }))
}

import { toWorldAnchor } from '~/lib/render/anchors/anchorMath'
import type { Anchor2D } from '~/lib/render/anchors/types'
import type { PlacementRule } from '~/lib/specs/placement'
import type { PartInstance } from '~/lib/resolvers/partFactory'

type PartByAssemblyId = Map<string, PartInstance>

const findLocalAnchor = (part: PartInstance, anchorId: string): Anchor2D | undefined => {
    return part.anchors?.find(anchor => anchor.id === anchorId)
}

const resolveTargetWorldAnchor = (
    partsByAssemblyId: PartByAssemblyId,
    assemblyId: string,
    anchorId: string,
): Anchor2D | null => {
    const targetPart = partsByAssemblyId.get(assemblyId)
    if (!targetPart) {
        return null
    }

    const local = findLocalAnchor(targetPart, anchorId)
    if (!local) {
        return null
    }

    return toWorldAnchor(local, targetPart.transform2d)
}

export const applyPlacementRule = (
    part: PartInstance,
    rule: PlacementRule,
    partsByAssemblyId: PartByAssemblyId,
): string | null => {
    if (rule.type === 'absolute') {
        part.transform2d = {
            x: rule.x,
            y: rule.y,
            rotation: rule.rotation ?? 0,
        }

        return null
    }

    if (rule.type === 'offset') {
        const target = resolveTargetWorldAnchor(partsByAssemblyId, rule.target.assemblyId, rule.target.anchorId)
        if (!target) {
            return `Missing target anchor ${rule.target.assemblyId}:${rule.target.anchorId} for part ${part.id}`
        }

        part.transform2d = {
            x: target.x + rule.offsetX,
            y: target.y + rule.offsetY,
            rotation: rule.rotation ?? 0,
        }

        return null
    }

    if (rule.type === 'coincide') {
        const self = findLocalAnchor(part, rule.selfAnchorId)
        if (!self) {
            return `Missing self anchor ${part.id}:${rule.selfAnchorId}`
        }

        const target = resolveTargetWorldAnchor(partsByAssemblyId, rule.target.assemblyId, rule.target.anchorId)
        if (!target) {
            return `Missing target anchor ${rule.target.assemblyId}:${rule.target.anchorId} for part ${part.id}`
        }

        part.transform2d = {
            x: target.x - self.x + (rule.offsetX ?? 0),
            y: target.y - self.y + (rule.offsetY ?? 0),
            rotation: rule.rotation ?? 0,
        }

        return null
    }

    const self = findLocalAnchor(part, rule.selfAnchorId)
    if (!self) {
        return `Missing self anchor ${part.id}:${rule.selfAnchorId}`
    }

    const target = resolveTargetWorldAnchor(partsByAssemblyId, rule.target.assemblyId, rule.target.anchorId)
    if (!target) {
        return `Missing target anchor ${rule.target.assemblyId}:${rule.target.anchorId} for part ${part.id}`
    }

    const alignOffset = rule.offset ?? 0
    if (rule.axis === 'x') {
        part.transform2d = {
            x: target.x - self.x + alignOffset,
            y: part.transform2d.y,
            rotation: rule.rotation ?? part.transform2d.rotation,
        }
    } else {
        part.transform2d = {
            x: part.transform2d.x,
            y: target.y - self.y + alignOffset,
            rotation: rule.rotation ?? part.transform2d.rotation,
        }
    }

    return null
}

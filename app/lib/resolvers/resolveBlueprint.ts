import type { BlueprintSpec } from '~/lib/specs/blueprint'
import { createAnchorsFromAssembly } from '~/lib/resolvers/anchorFactory'
import { createPartFromAssembly, type PartInstance } from '~/lib/resolvers/partFactory'
import { applyPlacementRule } from '~/lib/resolvers/placement'

export type ResolvedBlueprint = {
    parts: PartInstance[]
    warnings: string[]
}

export const resolveBlueprint = (spec: BlueprintSpec): ResolvedBlueprint => {
    const warnings: string[] = []
    const parts: PartInstance[] = []

    for (const product of spec.products) {
        const partsByAssemblyId = new Map<string, PartInstance>()

        for (const assembly of product.assemblies) {
            const part = createPartFromAssembly(assembly)
            part.anchors = createAnchorsFromAssembly(assembly)

            partsByAssemblyId.set(assembly.id, part)
        }

        for (const assembly of product.assemblies) {
            if (!assembly.placement) {
                continue
            }

            const part = partsByAssemblyId.get(assembly.id)
            if (!part) {
                warnings.push(`Assembly ${assembly.id} has placement but no part`)
                continue
            }

            const warning = applyPlacementRule(part, assembly.placement, partsByAssemblyId)
            if (warning) {
                warnings.push(warning)
            }
        }

        parts.push(...partsByAssemblyId.values())
    }

    return {
        parts,
        warnings,
    }
}

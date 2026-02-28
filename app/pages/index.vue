<template>
    <div class="card">
        <WorkspaceBlock
            v-hover="'base-part'"
            :label="$t('Размер гидрострелки')"
        >
            <InputSelect v-if="hydroarrowSpec" v-model="hydroarrowSpec.params.diameter" :options="sizeOptions" />
            <small class="ml-2">{{ $t('мм') }}</small>
        </WorkspaceBlock>
    </div>
    <div class="card">
        <BalancingCollector :render-nodes="renderNodes" />
    </div>
</template>

<script setup lang="ts">
import { useHydroarrow } from '~/composables/useHydroarrow'
import BalancingCollector from '~/components/Constructor/Products/BalancingCollector.vue'
import { createDefaultBlueprintSpec, createHydroarrowJoinAnchors } from '~/lib/specs/blueprint'
import { resolveBlueprint } from '~/lib/resolvers/resolveBlueprint'
import { toRenderModel } from '~/lib/render-model/toRenderModel'
import type { AssemblySpec } from '~/lib/specs/assembly'

const spec = reactive(createDefaultBlueprintSpec())

const isHydroarrowAssembly = (assembly: AssemblySpec): assembly is AssemblySpec<'Hydroarrow'> => {
    return assembly.type === 'Hydroarrow'
}

const hydroarrowSpec = computed(() => {
    return spec.products[0]?.assemblies.find(isHydroarrowAssembly)
})

watchEffect(() => {
    if (!hydroarrowSpec.value) {
        return
    }

    hydroarrowSpec.value.anchors = createHydroarrowJoinAnchors(
        hydroarrowSpec.value.params.diameter,
        hydroarrowSpec.value.params.length,
        hydroarrowSpec.value.params.insulation,
        130,
    )
})

const hydroarrowLike = computed(() => {
    if (!hydroarrowSpec.value) {
        return null
    }

    return {
        diameter: hydroarrowSpec.value.params.diameter,
        length: hydroarrowSpec.value.params.length,
        insulation: hydroarrowSpec.value.params.insulation,
        thickness: hydroarrowSpec.value.params.thickness,
    }
})

const { sizeOptions } = useHydroarrow(() => hydroarrowLike.value ?? {
    diameter: 120,
    length: 560,
    insulation: 20,
    thickness: 5,
})

const resolved = computed(() => {
    return resolveBlueprint(spec)
})

const renderNodes = computed(() => {
    return toRenderModel(resolved.value)
})
</script>
<template>
    <div class="card">
        <WorkspaceBlock
            v-hover="'base-part'"
            :label="$t('Размер гидрострелки')"
        >
            <InputSelect v-model="inputs.hydroarrowDiameter" :options="sizeOptions" />
            <small class="ml-2">{{ $t('мм') }}</small>
        </WorkspaceBlock>
    </div>
    <div class="card">
        <BalancingCollector :collector="product" />
    </div>
</template>

<script setup lang="ts">
import BalancingCollectorWithHydroarrowProduct, {
    type BalancingCollectorInputs,
} from '~/lib/Products/BalancingCollectorWithHydroarrowProduct'
import { useHydroarrow } from '~/composables/useHydroarrow'
import BalancingCollector from '~/components/Constructor/Products/BalancingCollector.vue'

const inputs = reactive<BalancingCollectorInputs>({
    hydroarrowDiameter: 120,
})

const product = reactive(new BalancingCollectorWithHydroarrowProduct(inputs)) as BalancingCollectorWithHydroarrowProduct

const { sizeOptions } = useHydroarrow(product.specs.hydroarrow)

watch(inputs, () => {
    product.recalculateSpecs(inputs)
}, { deep: true })
</script>

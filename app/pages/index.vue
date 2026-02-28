<template>
    <div class="card">
        <WorkspaceBlock
            v-hover="'base-part'"
            :label="$t('Размер гидрострелки')"
        >
            <InputSelect v-model="product.hydroarrow.diameter" :options="sizeOptions" />
            <small class="ml-2">{{ $t('мм') }}</small>
        </WorkspaceBlock>
    </div>
    <div class="card">
        <BalancingCollector :collector="product" />
    </div>
</template>

<script setup lang="ts">
import BalancingCollectorWithHydroarrowProduct from '~/lib/Products/BalancingCollectorWithHydroarrowProduct'
import { useHydroarrow } from '~/composables/useHydroarrow'
import BalancingCollector from '~/components/Constructor/Products/BalancingCollector.vue'

const product = reactive(new BalancingCollectorWithHydroarrowProduct()) as BalancingCollectorWithHydroarrowProduct

const { sizeOptions } = useHydroarrow(product.hydroarrow)
</script>
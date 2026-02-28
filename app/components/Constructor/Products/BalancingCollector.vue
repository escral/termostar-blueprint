<template>
    <div
        class="relative flex"
        :style="{
            'height': maxHeight + 'px',
            'padding': '100px 0',
        }"
    >
        <svg
            xmlns="http://www.w3.org/2000/svg"
            :viewBox="'0 0 400 ' + maxHeight"
            :width="400"
            :height="maxHeight"
            class="overflow-visible ml-[300px]"
            fill="#FFF"
        >
            <InsulationDefs />

            <HydroarrowElement :spec="collector.specs.hydroarrow" />
        </svg>
    </div>
</template>

<script setup lang="ts">
import HydroarrowElement from '~/components/Constructor/Elements/HydroarrowElement.vue'
import InsulationDefs from '~/components/Constructor/InsulationDefs.vue'
import type BalancingCollectorWithHydroarrowProduct from '~/lib/Products/BalancingCollectorWithHydroarrowProduct'

defineOptions({
    name: 'BalancingCollector',
})

//

const props = defineProps<{
    collector: BalancingCollectorWithHydroarrowProduct
}>()

//

const maxHeight = computed(() => {
    return mmToUnits(props.collector.specs.hydroarrow.fullLength)
})

// const bodyHeightInner = 100
// const joinerHeight = 20
// const joinerSizeMm = 10
//
// const topInputY = computed(() => {
//     const height = collectorStore.hydroarrow.dimentions.value.fullLength
//
//     return mmToUnits(height / 2 - bodyHeightInner / 2 - joinerHeight + joinerSizeMm / 2)
// })
//
// const bottomInputY = computed(() => {
//     const height = collectorStore.hydroarrow.dimentions.value.fullLength
//
//     return mmToUnits(height / 2 + bodyHeightInner / 2 + joinerHeight - joinerSizeMm / 2)
// })
</script>

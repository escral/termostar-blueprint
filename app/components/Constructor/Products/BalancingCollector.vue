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
            class="overflow-visible ml-[300px] w-[400px] h-[400px]"
            fill="#FFF"
        >
            <InsulationDefs />

            <HydroarrowPart v-hover="'hydroarrow-part'" :part="collector.hydroarrow">
                <g v-hover="'hydroarrow-center'">
                    <ThermowellPart
                        :part="collector.hydroarrow.thermowells.top"
                        :x="mmToUnits(collector.hydroarrow.join.top.x)"
                        :y="mmToUnits(collector.hydroarrow.join.top.y)"
                    />
                    <ThermowellPart
                        :part="collector.hydroarrow.thermowells.bottom"
                        :x="mmToUnits(collector.hydroarrow.join.bottom.x)"
                        :y="mmToUnits(collector.hydroarrow.join.bottom.y)"
                    />
                </g>
            </HydroarrowPart>
        </svg>
    </div>
</template>

<script setup lang="ts">
import HydroarrowPart from '~/components/Constructor/Parts/HydroarrowPart.vue'
import ThermowellPart from '~/components/Constructor/Parts/ThermowellPart.vue'
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
    return mmToUnits(props.collector.hydroarrow.fullLength)
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

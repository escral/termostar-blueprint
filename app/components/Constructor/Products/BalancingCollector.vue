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

            <HydroarrowElement v-hover="'hydroarrow-part'" :element="collector.hydroarrow">
                <g v-hover="'hydroarrow-joiner'">
                    <PipeElement
                        :spec="collector.hydroarrow.mainJoin.top"
                        :x="-100"
                        :y="mmToUnits(collector.hydroarrow.thermowellJoin.top.y)"
                    />
                </g>
                <g v-hover="'hydroarrow-center'">
                    <ThermowellElement
                        :element="collector.hydroarrow.thermowells.top"
                        :x="mmToUnits(collector.hydroarrow.thermowellJoin.top.x)"
                        :y="mmToUnits(collector.hydroarrow.thermowellJoin.top.y)"
                    />
                    <ThermowellElement
                        :element="collector.hydroarrow.thermowells.bottom"
                        :x="mmToUnits(collector.hydroarrow.thermowellJoin.bottom.x)"
                        :y="mmToUnits(collector.hydroarrow.thermowellJoin.bottom.y)"
                    />
                </g>
            </HydroarrowElement>
        </svg>
    </div>
</template>

<script setup lang="ts">
import HydroarrowElement from '~/components/Constructor/Elements/HydroarrowElement.vue'
import ThermowellElement from '~/components/Constructor/Elements/ThermowellElement.vue'
import InsulationDefs from '~/components/Constructor/InsulationDefs.vue'
import type BalancingCollectorWithHydroarrowProduct from '~/lib/Products/BalancingCollectorWithHydroarrowProduct'
import PipeElement from '~/components/Constructor/Elements/PipeElement.vue'

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

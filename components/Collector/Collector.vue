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
            
            <HydroarrowPart v-hover="'base-part'" :params="collectorStore.hydroarrow.params">
                <g v-hover="'base-center'">
                    <CenterPart
                        x="50%"
                        :y="topInputY"
                    />
                    <CenterPart
                        x="50%"
                        :y="bottomInputY"
                    />
                </g>
            </HydroarrowPart>
        </svg>
    </div>
</template>

<script setup lang="ts">
import HydroarrowPart from '~/components/Collector/Parts/HydroarrowPart.vue'
import InsulationDefs from '~/components/Collector/InsulationDefs.vue'
import CenterPart from '~/components/Collector/ProductConstructor/Parts/CenterPart.vue'
import { mmToUnits } from '~/helpers/UnitsHelper'

defineOptions({
    name: 'Collector',
})

//

const props = defineProps<{
    collectorStore: ReturnType<typeof useCollector>
}>()

const { collectorStore } = props

//

const maxHeight = computed(() => {
    return mmToUnits(collectorStore.hydroarrow.dimentions.value.fullLength)
})

//

// topInputY() {
//     if (this.isCompact)
//         return this.topJoin + (this.bodyHeightInner - this.joinCenterGap) / 2
//
//     return this.base.height / 2 - this.bodyHeightInner / 2 - this.joinerHeight + this.mmToUnits(this.joinerSizeMm) / 2
// },

const bodyHeightInner = 100
const joinerHeight = 20
const joinerSizeMm = 10

const topInputY = computed(() => {
    const height = collectorStore.hydroarrow.dimentions.value.fullLength

    return mmToUnits(height / 2 - bodyHeightInner / 2 - joinerHeight + joinerSizeMm / 2)
})

const bottomInputY = computed(() => {
    return mmToUnits(collectorStore.hydroarrow.dimentions.value.fullLength / 2)
})
</script>
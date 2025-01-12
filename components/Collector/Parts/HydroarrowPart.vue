<template>
    <svg
        :viewBox="'0 0 ' + width + ' ' + height"
        :width="width"
        :height="height"
        :x="x"
        :y="y"
    >
        <path
            v-if="insulation"
            class="stroke insulation"
            fill-rule="evenodd"
            :d="'M0,0 H' + width + ' V' + height + ' H0 Z ' + cap(insulation)"
        />
        <path
            v-if="insulation && thickness"
            class="stroke"
            fill-rule="evenodd"
            :d="'M0,0 H' + width + ' V' + height + ' H0 Z ' + cap(insulation + thickness)"
        />
        <path
            v-if="! insulation"
            class="stroke"
            :d="cap(0)"
        />
        <path
            v-if="! insulation && thickness"
            class="stroke"
            :d="cap(thickness)"
        />
        
        <slot />
    </svg>
</template>

<script setup lang="ts">
import { type HydroarrowParams, useHydroarrow } from '~/composables/useHydroarrow'
import { mmToUnits } from '~/helpers/UnitsHelper'

defineOptions({
    name: 'HydroarrowPart',
})

const props = defineProps<{
    params: HydroarrowParams
}>()

//

const data = computed(() => useHydroarrow(props.params))

//

const width = computed(() => {
    return mmToUnits(data.value.dimentions.value.fullDiameter)
})

const height = computed(() => {
    return mmToUnits(data.value.dimentions.value.fullLength)
})

const x = computed(() => {
    return -mmToUnits(data.value.params.insulation)
})

const y = computed(() => {
    return -mmToUnits(data.value.params.insulation)
})

const insulation = computed(() => {
    return mmToUnits(data.value.params.insulation)
})

const thickness = computed(() => {
    return mmToUnits(data.value.params.thickness)
})

//

function cap(offset = 0) {
    return data.value.params.rounded ? roundCap(offset) : squareCap(offset)
}

function roundCap(offset = 0) {
    const br = borderRadius(width.value - offset * 2)

    const h = height.value
    const w = width.value

    return 'M' + (offset) + ',' + (offset + br) +
        ' Q ' + (offset) + ',' + (offset) + ' ' +
        +(offset + br) + ',' + (offset) +
        ' H ' + (w - offset - br) +
        ' Q ' + (w - offset) + ',' + (offset) + ' ' +
        +(w - offset) + ',' + (offset + br) +
        ' V ' + (h - offset - br) +
        ' Q ' + (w - offset) + ',' + (h - offset) + ' ' +
        +(w - offset - br) + ',' + (h - offset) +
        ' H ' + (offset + br) +
        ' Q ' + (offset) + ',' + (h - offset) + ' ' +
        +(offset) + ',' + (h - offset - br) +
        ' Z'
}

function squareCap(offset = 0) {
    const h = height.value
    const w = width.value

    return 'M' + offset + ',' + offset + ' H' + (w - offset) + ' V' + (h - offset) + ' H' + (offset) + ' Z'
}

function borderRadius(width: number) {
    return Math.round((width / 2.3) / 2) * 2
}
</script>

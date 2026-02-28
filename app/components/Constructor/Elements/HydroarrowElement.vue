<template>
    <ElementWrapper
        :width="width"
        :height="height"
    >
        <PipeElement :spec="spec" />

        <g v-hover="'hydroarrow-joiner'">
            <PipeElement
                :spec="spec.mainJoin.top"
                :x="spec.insulation"
                :y="mmToUnits(spec.thermowellJoin.top.y)"
                pivot="bottom"
                :rotate="-90"
            />
            <PipeElement
                :spec="spec.mainJoin.bottom"
                :x="spec.insulation"
                :y="mmToUnits(spec.thermowellJoin.bottom.y)"
                pivot="bottom"
                :rotate="-90"
            />
        </g>
        <g v-hover="'hydroarrow-center'">
            <ThermowellElement
                :element="spec.thermowells.top"
                :x="mmToUnits(spec.thermowellJoin.top.x)"
                :y="mmToUnits(spec.thermowellJoin.top.y)"
            />
            <ThermowellElement
                :element="spec.thermowells.bottom"
                :x="mmToUnits(spec.thermowellJoin.bottom.x)"
                :y="mmToUnits(spec.thermowellJoin.bottom.y)"
            />
        </g>
    </ElementWrapper>
</template>

<script setup lang="ts">
import type { HydroarrowSpec } from '~/lib/Specs/HydroarrowSpec'
import ThermowellElement from '~/components/Constructor/Elements/ThermowellElement.vue'
import PipeElement from '~/components/Constructor/Elements/PipeElement.vue'
import ElementWrapper from '~/components/Constructor/ElementWrapper.vue'

defineOptions({
    name: 'HydroarrowElement',
})

const props = defineProps<{
    spec: HydroarrowSpec
}>()

const width = computed(() => {
    return mmToUnits(props.spec.fullDiameter)
})

const height = computed(() => {
    return mmToUnits(props.spec.fullLength)
})
</script>

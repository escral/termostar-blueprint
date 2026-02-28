<template>
    <ElementWrapper
        :width="spec.fullDiameter"
        :height="spec.fullLength"
    >
        <HoverGroup group="hydroarrow-body">
            <PipeElement :spec="spec" />
        </HoverGroup>

        <HoverGroup group="hydroarrow-joiner">
            <PipeElement
                :spec="spec.mainJoin.top"
                :x="spec.insulation + spec.thickness"
                :y="spec.thermowellJoin.top.y"
                pivot="bottom"
                :rotate="-90"
            />
            <PipeElement
                :spec="spec.mainJoin.bottom"
                :x="spec.insulation + spec.thickness"
                :y="spec.thermowellJoin.bottom.y"
                pivot="bottom"
                :rotate="-90"
            />
        </HoverGroup>

        <HoverGroup group="hydroarrow-thermowell">
            <ThermowellElement
                :element="spec.thermowells.top"
                :x="spec.thermowellJoin.top.x"
                :y="spec.thermowellJoin.top.y"
            />
            <ThermowellElement
                :element="spec.thermowells.bottom"
                :x="spec.thermowellJoin.bottom.x"
                :y="spec.thermowellJoin.bottom.y"
            />
        </HoverGroup>
    </ElementWrapper>
</template>

<script setup lang="ts">
import type { HydroarrowSpec } from '~/lib/Specs/HydroarrowSpec'
import ThermowellElement from '~/components/Constructor/Elements/ThermowellElement.vue'
import PipeElement from '~/components/Constructor/Elements/PipeElement.vue'
import ElementWrapper from '~/components/Constructor/ElementWrapper.vue'
import HoverGroup from '~/components/Constructor/HoverGroup.vue'

defineOptions({
    name: 'HydroarrowElement',
})

defineProps<{
    spec: HydroarrowSpec
}>()
</script>

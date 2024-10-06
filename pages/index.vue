<template>
    <div class="card">
        <WorkspaceBlock
            v-hover="'base-part'"
            :label="$t('Размер гидрострелки')"
        >
            <InputSelect v-model="hydroarrow.params.diameter" :options="hydroarrow.sizeOptions.value" />
            <small class="ml-2">{{ $t('мм') }}</small>
        </WorkspaceBlock>
    </div>
    <div class="card">
        <Collector :collector-store="collectorStore" />
    </div>
</template>

<script setup lang="ts">
import { useCollector } from '~/composables/useCollector'

const collectorStore = useCollector(reactive({
    hydroarrow: {
        diameter: 120,
        length: 300,
        insulation: 20,
        thickness: 5,
        rounded: true,
    },
}))

const { hydroarrow } = collectorStore
</script>
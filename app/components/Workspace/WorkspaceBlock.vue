<template>
    <div class="workspace__block">
        <div class="workspace__label">
            {{ label }}
        </div>
        <div class="flex items-center justify-center">
            <slot />
        </div>
    </div>
</template>

<script setup lang="ts">
defineOptions({
    name: 'WorkspaceBlock',
})

//

defineProps<{
    label: string
}>()
</script>
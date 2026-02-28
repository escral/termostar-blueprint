<template>
    <select
        v-model="modelValue"
        class="input-select"
    >
        <option
            v-for="({value, title}) in options"
            :key="value"
            :value="value"
        >
            {{ title }}
        </option>
    </select>
</template>

<script setup lang="ts">
import type { SelectOption } from '~/types/SelectOption'

defineOptions({
    name: 'InputSelect',
})

//

defineProps<{
    options: SelectOption[]
}>()

const modelValue = defineModel<unknown>('modelValue', {
    required: true,
})
</script>
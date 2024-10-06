<template>
    <div class="sidebar card">
        <NuxtLink :to="{ name: 'index' }" class="sidebar__item">
            Dashboard
        </NuxtLink>
    </div>
</template>

<script setup lang="ts">
defineOptions({
    name: 'AppSidebar',
})

//

</script>
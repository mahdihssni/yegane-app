<script setup lang="ts">
import { useRoute } from 'vue-router';
import { onMounted } from 'vue';

const route = useRoute();

onMounted(() => {
    if (route.path.startsWith('/auth')) return;
});
</script>

<template>
    <RouterView />
</template>

<script setup>
const route = useRoute()
const canShowFooter = computed(() => route.name === 'home')
</script>

<template>
 <Header />
 <AppScrollToTopBtn />
 <slot />
 <AppFooter v-if="canShowFooter" />
</template>
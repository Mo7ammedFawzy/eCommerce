<script setup>
const route = useRoute()
const canShowFooter = computed(() => route.name === 'home')
</script>

<template>
 <Header />
  <AppScrollToTopBtn/>
  <div class="hidden md:block" style="padding-top: 64px"/>
 <slot />
 <AppFooter v-if="canShowFooter" />
</template>
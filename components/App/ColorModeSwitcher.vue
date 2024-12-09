<script setup lang="ts">
const colorMode = useColorMode()
const icon = computed(() => `i-circum:${colorMode.value}`)
// 
const isDark = computed({
  get() {
    return colorMode.value === 'dark'
  }, set() {
    colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
  }
})
</script>
<template>
  <ClientOnly>
    <UButton :icon="icon" @click="isDark = !isDark" square size="lg"
      class="rounded-none md:rounded-full  items-center hidden md:flex justify-center text-black/70 hover:bg-black/10  dark:hover:bg-white/10"
      variant="ghost" color="gray"/>
  </ClientOnly>
</template>
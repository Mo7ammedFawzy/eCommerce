<script setup lang="ts">
/**
 * @description Handle Application's ColorMode(dark/light)
 */
const colorMode = useColorMode();

const icon = computed(
  () => `i-heroicons:${colorMode.value === "dark" ? "sun" : "moon"}-20-solid`,
);
const isDark = computed({
  get: () => colorMode.value === "dark",
  set() {
    colorMode.preference = colorMode.value === "dark" ? "light" : "dark";
  },
});

// Set an initial value for color mode before page reload
onMounted(() => {
  if (!colorMode.value) {
    colorMode.preference = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
});
</script>

<template>
  <UButton :icon="icon" @click="isDark = !isDark" square size="lg"
    class="hidden items-center justify-center rounded-none text-black/70 hover:bg-black/10 dark:hover:bg-white/10 md:flex md:rounded-full"
    variant="ghost" color="gray" />
</template>

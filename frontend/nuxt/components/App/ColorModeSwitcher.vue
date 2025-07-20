<script setup lang="ts">

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


</script>

<template>
  <ColorScheme tag="span" class="t-skeleton w-10 hidden md:inline-flex aspect-square justify-center items-center rounded-full" placeholder="...">
    <UButton :icon="icon" @click="isDark = !isDark" square size="lg"
      class="hidden items-center justify-center rounded-none text-black/70 hover:bg-black/10 dark:hover:bg-white/10 md:flex md:rounded-full"
      variant="ghost" color="gray" />
  </ColorScheme>
</template>

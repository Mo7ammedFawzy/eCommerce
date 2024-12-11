<script setup lang="ts">
const colorMode = useColorMode();
const icon = computed(
  () =>
    // colorMode.value === "dark" ? "i-heroicons:sun-20-solid" : "i-heroicons:moon-20-solid",
    `i-heroicons:${colorMode.value === "dark" ? "sun" : "moon"}-20-solid`,
);
//i-heroicons:moon-20-solid"
const isDark = computed({
  get() {
    return colorMode.value === "dark";
  },
  set() {
    colorMode.preference = colorMode.value === "dark" ? "light" : "dark";
  },
});
</script>
<template>
  <ClientOnly>
    <UButton
      :icon="icon"
      @click="isDark = !isDark"
      square
      size="lg"
      class="hidden items-center justify-center rounded-none text-black/70 hover:bg-black/10 dark:hover:bg-white/10 md:flex md:rounded-full"
      variant="ghost"
      color="gray"
    />
  </ClientOnly>
</template>

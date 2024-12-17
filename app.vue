<script setup lang="ts">
/**
 * @abstract=== toggle darkMode for notification theme(light|dark)
 * 
 */
import { lightTheme, darkTheme, type NotivueTheme } from "notivue";

const TDarkTheme: NotivueTheme = {
  ...darkTheme,
  "--nv-global-bg": "#0F1729",
  "--nv-global-border": "#313237",
};

const TLightTheme: NotivueTheme = {
  ...lightTheme,
  "--nv-global-bg": "#F1F5F9",
};
const isDark = computed(() => useColorMode().value === "dark");
const notivueThemeToggler = computed(() =>
  isDark.value ? TDarkTheme : TLightTheme,
);
</script>
<template>
  <NuxtLayout>
    <Notivue v-slot="item">
      <Notification :item="item" :theme="notivueThemeToggler" />
    </Notivue>
    <!-- class="pb-6 md:pb-0 md:pt-16" -->
    <!-- Header has height(64px-h-16) ||  bottom-0 md:top-0 -->
    <NuxtPage class="mb-5 pb-16 md:pb-0 md:pt-16" />
  </NuxtLayout>
</template>

<script setup lang="ts">

import { lightTheme, darkTheme } from "notivue";

const isDark = computed(() => useColorMode().value === 'dark')
const notivueThemeToggler = computed(() => isDark.value ? darkTheme : lightTheme)

</script>
<template>
  <NuxtLayout>
    <Notivue v-slot="item" >
      <Notification :item="item" :theme="notivueThemeToggler" />
    </Notivue>
    <NuxtPage class="pb-20 md:pt-20 md:pb-0" />
  </NuxtLayout>
</template>


<script setup lang="ts">
import {useDark} from "@vueuse/core";
import DarkLogo from "@/assets/imgs/logo-dark.webp";
import LightLogo from "@/assets/imgs/logo-light.webp";
import {computed} from "vue";

const isDark = useDark();
const imgSrc = computed(() => {
  if (isDark.value)
    return DarkLogo;
  else
    return LightLogo;
})
</script>

<template>
  <RouterLink to="/" class="w-fit">
    <img :src="imgSrc" alt="logo" class="aspect-auto h-full max-h-12"/>
  </RouterLink>
</template>

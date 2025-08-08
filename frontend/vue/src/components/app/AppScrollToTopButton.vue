<script setup lang='ts'>

import {GScrollTo, toggleAppScrollToTopButtonVisibility} from "@/composables/useAnimations.ts";

toggleAppScrollToTopButtonVisibility();
</script>

<template>
  <UButton
      id="app-scroll-to-top-button"
      class='fixed z-20 rounded-full right-4 bottom-20 scale-0 md:bottom-4 !text-white dark:text-white hover:!bg-blue-600'
      icon="mdi-light:chevron-up" color="primary" square size="xl" @click="GScrollTo(0)">
  </UButton>
</template>
<script setup lang="ts">
defineProps<{ fullWidth?: boolean }>()
</script>
<template>
  <UContainer :class="{'!px-0 !max-w-full':fullWidth}">
    <slot />
  </UContainer>
</template>
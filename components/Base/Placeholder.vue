<script setup lang="ts">
defineProps<{ label: string }>();
</script>

<template>
  <main class="placeholder">
    <div class="placeholer__wrapper w-full p-10 text-center flex flex-col justify-center gap-8">
      <div v-text="label" class="text-4xl capitalize sm:text-7xl" />
      <div v-text="'Coming soon...'" class="text-4xl sm:text-7xl" />
    </div>
  </main>
</template>

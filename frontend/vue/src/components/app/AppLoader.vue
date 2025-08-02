<script setup lang="ts">
const routeName = "home"
</script>
<template>
  <main id='app-loader' class='w-full h-full bg-black overflow-hidden fixed top-0 left-0 z-50 cursor-wait select-none translate-y-0'>
    <BaseWrapper class="h-full flex items-center justify-center">
      <h1 class="capitalize text-5xl md:text-7xl text-white translate-y-[30px] opacity-0" v-text="routeName"/>
    </BaseWrapper>
  </main>
</template>
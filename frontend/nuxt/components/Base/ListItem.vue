<script setup lang="ts">
import type { Product } from "~/types";

defineProps<{ item: Product }>();


</script>

<template>
  <div class="item">
    <NuxtLink :to="{ path: `/products/${item.id}` }"
      class="item__wrapper flex cursor-pointer select-none items-center gap-3 rounded-md py-4 hover:bg-black/10 dark:hover:bg-white/10 border-e-2 border-transparent md:py-3.5 dark:hover:border-white hover:border-main/80">
      <div class="item__img h-24 md:!h-auto  min-w-24 w-24 bg-white rounded-full max-w-24 md:w-16 aspect-square p-5 md:p-4">
        <NuxtImg :src="item.image" class="rounded-lg aspect-auto max-h-full w-full object-contain" quality="60"
          :alt="item.title" format="webp"
          placeholder-class="animate-pulse rounded-full !w-full !h-full max-w-full bg-gray-300 dark:bg-gray-800" placeholder
          loading="lazy" />
      </div>
      <div class="item__label max-w-[50%]">
        <div v-text="item.title" class="three-dots" />
      </div>
    </NuxtLink>
  </div>
</template>

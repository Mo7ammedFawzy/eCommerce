<script setup lang="ts">
import type { Category } from "~/types";
defineProps<{ category: Category }>();
</script>

<template>
  <div id="category-card" class="max-w-xs">
    <NuxtLink
      :to="{ path: '/products', query: { category: category.title } }"
      class="category-card-wrapper h-aspect-square flex w-full scale-[.90] cursor-pointer flex-col items-center justify-center overflow-hidden rounded-full p-4 ring-2 ring-gray-300 transition-all hover:scale-100 hover:ring-blue-600 dark:ring-white/20 dark:hover:ring-blue-600 sm:ring-4"
    >
      <NuxtImg
        class="aspect-square w-full rounded-full object-contain object-center"
        fit="contain"
        :src="`/home/categoires/${category.title}.png`"
      />
    </NuxtLink>
    <p
      class="mt-5 text-sm capitalize text-black dark:text-white"
      v-text="category.title"
    />
  </div>
</template>

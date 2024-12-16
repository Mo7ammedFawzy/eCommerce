<script setup lang="ts">
import type { Category } from "~/types";
defineProps<{ category: Category }>();
</script>

<template>
  <div id="category-card" class="max-w-xs w-full">
    <NuxtLink :to="{ path: '/products', query: { category: category.title } }"
      class="category-card-wrapper h-aspect-square flex w-full scale-[.90] cursor-pointer flex-col items-center justify-center overflow-hidden rounded-full p-5 ring-2 ring-gray-300 transition-all hover:scale-100 hover:ring-blue-600 dark:ring-white/20 dark:hover:ring-blue-600 sm:ring-4 aspect-square">
      <NuxtImg class="aspect-auto w-full max-h-full object-contain object-center" fit="contain"
        :src="`/home/categoires/${category.title}.png`" quality="60" :alt="category.title" format="webp"
        placeholder-class="animate-pulse !w-full max-h-full  rounded-full aspect-square bg-gray-300 dark:bg-gray-800" placeholder
        loading="lazy" />
    </NuxtLink>
    <p class="mt-5 text-sm capitalize text-black dark:text-white" v-text="category.title" />
  </div>
</template>

<script setup lang='ts'>
import type { Category } from "~/types"
defineProps<{ category: Category }>()

</script>

<template>
 <div id='category-card'>
  <div
   class='category-card-wrapper w-full overflow-hidden h-aspect-square rounded-full ring-2 sm:ring-4 dark:ring-white/20 dark:hover:ring-blue-600 ring-gray-300 scale-[.90] hover:scale-100 transition-all cursor-pointer hover:ring-blue-600 flex flex-col items-center justify-center p-1'>
   <NuxtImg class="w-full rounded-full aspect-square object-contain" fit="contain" :src="`/home/categoires/${category.img}.webp`" />
  </div>
  <p class="mt-5 text-sm capitalize dark:text-white text-black" v-text="category.title" />
 </div>
</template>
<script setup lang="ts">
import {ProductCard} from "@/types/common.ts";

defineProps<{ product: ProductCard }>();
</script>

<template>
  <RouterLink :to="`/products/${product._id}`"
              class="flex cursor-pointer select-none ps-2 items-center gap-3 rounded-md py-2 hover:bg-black/10 dark:hover:bg-white/10 border-s-2 border-transparent md:py-2.5 dark:hover:border-white hover:border-main/80">
    <div class="md:!h-auto w-18 bg-white rounded-full md:w-20 aspect-square p-3 md:p-2.5">
      <img :src="product.thumbnail" class="rounded-lg aspect-auto max-h-full w-full object-contain" :alt="product.title" loading="lazy"/>
    </div>
    <div class="max-w-[50%]">
      <div v-text="product.title" class="three-dots"/>
    </div>
  </RouterLink>
</template>

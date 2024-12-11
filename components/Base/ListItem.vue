<script setup lang="ts">
import type { API_Product } from "~/types";

defineProps<{ item: API_Product }>();


</script>

<template>
  <div class="item">
    <NuxtLink
      :to="{ path: `/products/${item.id}` }"
      class="item__wrapper flex cursor-pointer select-none items-center gap-3 rounded-md py-4 hover:bg-black/10 dark:hover:bg-white/10 border-e-2 border-transparent md:py-3.5 dark:hover:border-white hover:border-main/80"

    >
      <div class="item__img w-16 max-w-20 md:w-10">
        <NuxtImg
          :src="item.image"
          class="aspect-square w-full rounded-full object-contain"
        />
      </div>
      <div class="item__label max-w-[50%]">
        <div v-text="item.title" class="three-dots" />
      </div>
    </NuxtLink>
  </div>
</template>

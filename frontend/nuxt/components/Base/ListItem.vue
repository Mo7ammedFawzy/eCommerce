<script setup lang="ts">
import type {Product} from "~/types";

defineProps<{ item: Product }>();


</script>

<template>
  <main>
    <NuxtLink :to="`/products/${item.id}`"
              class="flex cursor-pointer select-none ps-2 items-center gap-3 rounded-md py-2 hover:bg-black/10 dark:hover:bg-white/10 border-s-2 border-transparent md:py-2.5 dark:hover:border-white hover:border-main/80">
      <div class="md:!h-auto w-18 bg-white rounded-full md:w-20 aspect-square p-3 md:p-2.5">
        <NuxtImg :src="item.image" class="rounded-lg aspect-auto max-h-full w-full object-contain" quality="60"
                 :alt="item.label" format="webp"
          placeholder-class="animate-pulse rounded-full !w-full !h-full max-w-full bg-gray-300 dark:bg-gray-800" placeholder
          loading="lazy" />
      </div>
      <div class="max-w-[50%]">
        <div v-text="item.label" class="three-dots"/>
      </div>
    </NuxtLink>
  </main>
</template>

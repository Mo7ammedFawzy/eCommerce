<script setup lang='ts'>
import type { ProductCard } from '~/types';


defineProps<{ product: ProductCard }>()

</script>

<template>
  <!-- max-w-96/ -->
  <div v-if="true"
    class='product-card w-full max-w-96 dark:hover:ring-main h-full ring-1 ring-gray-400 shadow-lg shadow-gray-200 rounded-lg overflow-hidden dark:shadow-gray-900 dark:ring-gray-600 bg-white dark:bg-background hover:ring-blue-600 transition-all'>
    <div class="product-card__wrapper w-full h-full flex flex-col">
      <!-- img -->
      <NuxtLink to="#" v-if="true">
        <NuxtImg class="product-card__img  w-full object-cover aspect-square"
          :src="`/products/${product.img ?? 1}.webp`" />
      </NuxtLink>
      <!-- title -->
      <div class="product-card__body p-3 flex-grow w-full max-w-full flex flex-col justify-between" v-if="true">
        <NuxtLink to="#">
          <div class="product-card__title select-none three-dots  font-medium max-w-full" v-text="product.title"
            v-if="true" />
        </NuxtLink>
        <div class="flex-grow" />
        <!-- rating+colors -->
        <div class="product-card__rating-colors my-2 flex items-center justify-between" v-if="true">
          <div class="rating text-xs flex items-center gap-1">
            <UIcon name="mdi-star-outline" />
            <span v-text="`(${product.rating})`" />
          </div>
          <div class="product-card__colors  flex items-center">
            <div v-for="color in product.colors" class="-ms-0.5 w-3 ring-1 ring-black/25  aspect-square rounded-full"
              :style="{ backgroundColor: color }" />
            <span v-text="'+1'" class="text-xs ms-1" />
          </div>

        </div>
        <!-- price+actions -->
        <div class="price-actions flex items-center justify-between" v-if="true">
          <div class="product-card__price space-x-1">
            <strong v-text="`$${product.price}`" />
            <span v-text="`(-${product.discount}%)`" class="text-xs" />
          </div>
          <div class="product-card__actions flex items-center gap-1">
            <UButton icon="mdi-eye-outline" size="sm" variant="ghost" color="gray"
              class="hover:bg-black/10 dark:text-white/60 dark:hover:bg-white/10 text-black/70 rounded-full" square />
            <UButton icon="line-md:heart" size="sm" variant="ghost" color="gray"
              class="hover:bg-black/10 dark:text-white/60 dark:hover:bg-white/10 text-black/70 rounded-full" square />
          </div>
        </div>
      </div>

    </div>
  </div>
</template>



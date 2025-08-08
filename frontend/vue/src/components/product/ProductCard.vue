<script setup lang="ts">
import {IProductCard} from "@/types";
import {breakpointsTailwind, useBreakpoints, useImage} from "@vueuse/core";

const product = defineProps<IProductCard>();
const breakpoints = useBreakpoints(breakpointsTailwind)

const imgUrl = product.images[0]

const {isLoading} = useImage({src: imgUrl})

function getProductLink() {
  return "/products/" + product.id
}
</script>
<template>
  <UCard variant="outline" :ui="{body:'p-0 sm:p-0',root:'ring-(--ring-color)'}" class="bg-transparent overflow-hidden max-w-96">
    <RouterLink :to="getProductLink()" class="relative w-full aspect-square bg-white">
      <!-- img -->
      <USkeleton v-if="isLoading" class="w-full aspect-square"/>
      <img
          v-else
          class="aspect-square w-full object-cover"
          :src="imgUrl" :alt="title" loading="lazy"/>
    </RouterLink>
    <!-- title -->
    <div class="flex w-full max-w-full flex-grow flex-col justify-between px-2 py-3 sm:px-3">
      <RouterLink to="/">
        <div class="three-dots max-w-full select-none font-medium" v-text="title"/>
      </RouterLink>
      <div class="flex-grow"/>
      <!-- rating+colors -->
      <div class="my-2 flex items-center justify-between">
        <div class="flex items-center gap-1 text-xs">
          <UIcon name="mdi-star-outline"/>
          <span v-text="`(${rating?.rate})`"/>
        </div>
        <div class="flex items-center">
          <div v-for="color in colors" class="-ms-0.5 aspect-square w-3 rounded-full ring ring-(--ring-color)"
               :style="{ backgroundColor: color }"/>
          <span v-text="colors?.length" class="ms-1 text-xs"/>
        </div>
      </div>
      <!-- price+actions -->
      <div class="flex items-center justify-between">
        <div class="space-x-1">
          <strong v-text="`$${price}`" class="text-xs sm:text-base"/>
          <span v-text="`(-${(discount ?? 0) * 100}%)`" class="text-xs text-orange-600"/>
        </div>
        <div class="flex items-center sm:gap-1">
          <ProductPreview :product="product">
            <template #trigger>
              <UButton
                  icon="mdi-eye-outline" variant="ghost"
                  :size="breakpoints.smallerOrEqual('sm') ? 'xs' : 'sm'"
                  color="primary" square
                  class="rounded-full p-1 text-black/70 hover:bg-black/10 dark:text-white/60 dark:hover:bg-white/10 sm:p-2"/>
            </template>
          </ProductPreview>
        </div>
      </div>
    </div>
  </UCard>
</template>

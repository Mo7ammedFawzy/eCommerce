<script setup lang="ts">
import {ProductCard} from "@/types";
import {breakpointsTailwind, useBreakpoints, useImage} from "@vueuse/core";
import ProductUtils from "@/utils/ProductUtils.ts";

const product = defineProps<ProductCard>();
const breakpoints = useBreakpoints(breakpointsTailwind)

function toDiscount() {
  let number = product.discount ?? 0;
  return Number(number * 100).toFixed(0);
}

const imgUrl = product.images[0]

const {isLoading} = useImage({src: imgUrl})
</script>
<template>
  <UCard variant="outline" :ui="{body:'p-0 sm:p-0',root:'ring-(--ring-color)'}" class="bg-background overflow-hidden max-w-96">
    <RouterLink :to="ProductUtils.toLink(product)" class="relative w-full aspect-square">
      <!-- img -->
      <USkeleton v-if="isLoading" class="w-full aspect-square"/>
      <img
          v-else
          class="aspect-square w-full object-cover ui-ring"
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
          <UIcon name="mingcute:star-half-fill"/>
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
          <span v-text="`(-${toDiscount()}%)`" class="text-xs text-orange-600"/>
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

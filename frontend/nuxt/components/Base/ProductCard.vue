<script setup lang="ts">

import type {Product} from "~/types";
import {DISCOUNT} from "~/constants";

const { $viewport } = useNuxtApp();
const props = defineProps<{ product: Product }>();

const modal = ref(false)
const productPagePath = computed(() => `/products/${props.product.id}`);

const TProductColors = ["blue", "red", "yellow"];



</script>

<template>
  <!-- max-w-96/ -->
  <div
      class="mx-auto h-full w-full max-w-80 overflow-hidden rounded-lg bg-white shadow-lg shadow-gray-200 t-ring transition-all hover:ring-blue-600 dark:bg-background dark:shadow-gray-900 dark:hover:ring-main">
    <div class="flex h-full w-full flex-col">
      <!-- img -->
      <NuxtLink :to="productPagePath" class="relative w-full aspect-square bg-white">
        <!-- img ratio is 1:1 -->
        <NuxtImg
            class="mix-blend-multiply dark:mix-blend-normal object-contain square absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full aspect-auto max-h-full scale-75  p-5 md:p-4"
            :src="props.product.image" quality="60" :alt="props.product.label" format="webp" placeholder="/svg/spinner.svg"
            placeholder-class="h-1/2 py-16 max-h-full" loading="lazy"/>

      </NuxtLink>
      <!-- title -->
      <div class="flex w-full max-w-full flex-grow flex-col justify-between px-2 py-3 sm:px-3">
        <NuxtLink :to="productPagePath">
          <div class="three-dots max-w-full select-none font-medium" v-text="props.product.label"/>
        </NuxtLink>
        <div class="flex-grow" />
        <!-- rating+colors -->
        <div class=" my-2 flex items-center justify-between">
          <div class="rating flex items-center gap-1 text-xs">
            <UIcon name="mdi-star-outline" />
            <span v-text="`(${props.product.rating.rate})`" />
          </div>
          <div class="flex items-center">
            <div v-for="color in TProductColors" class="-ms-0.5 aspect-square w-3 rounded-full t-tring"
              :style="{ backgroundColor: color }" />
            <span v-text="'+1'" class="ms-1 text-xs" />
          </div>
        </div>
        <!-- price+actions -->
        <div class="flex items-center justify-between">
          <div class="space-x-1">
            <strong v-text="`$${props.product.price}`" class="text-xs sm:text-base" />
            <span v-text="`(-${DISCOUNT}%)`" class="text-xs text-orange-600" />
          </div>
          <div class="flex items-center sm:gap-1">
            <ProductsView v-model="modal" :product="props.product">
              <UButton icon="mdi-eye-outline" :size="$viewport.isLessThan('mobileWide') ? 'xs' : 'sm'" variant="ghost"
                color="gray" @click="modal = !modal"
                class="rounded-full p-1 text-black/70 hover:bg-black/10 dark:text-white/60 dark:hover:bg-white/10 sm:p-2"
                square />
            </ProductsView>
            <!-- TODO add later -->
            <UButton v-if="false" icon="line-md:heart" :size="$viewport.isLessThan('mobileWide') ? 'xs' : 'sm'"
              variant="ghost" color="gray"
              class="rounded-full text-black/70 hover:bg-black/10 dark:text-white/60 dark:hover:bg-white/10" square />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

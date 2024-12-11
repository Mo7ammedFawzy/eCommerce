<script setup lang="ts">
import type { ProductCard, API_Product } from "~/types";

const { $viewport } = useNuxtApp();

// colors | discount
const props = defineProps<{ product: API_Product }>();
const TProductdiscount = 32;

const TProductColors = ["blue", "red", "yellow"];
// category,
// description,
// id,
// image,
// price,
// rating,
// title,
// colors,
// discount = 32,

// const ref =

const productPagePath = computed(() => `/products/${props.product.id}`);
</script>

<template>
  <!-- max-w-96/ -->
  <div
    v-if="true"
    class="product-card mx-auto h-full w-full max-w-80 overflow-hidden rounded-lg bg-white shadow-lg shadow-gray-200 ring-1 ring-gray-400 transition-all hover:ring-blue-600 dark:bg-background dark:shadow-gray-900 dark:ring-gray-600 dark:hover:ring-main"
  >
    <div class="product-card__wrapper flex h-full w-full flex-col">
      <!-- img -->
      <NuxtLink :to="productPagePath" v-if="true">
        <!-- img ratio is 1:1 -->
        <NuxtImg
          class="product-card__img aspect-square w-full object-cover"
          :src="props.product.image"
        />
      </NuxtLink>
      <!-- title -->
      <div
        class="product-card__body flex w-full max-w-full flex-grow flex-col justify-between px-2 py-3 sm:px-3"
        v-if="true"
      >
        <NuxtLink :to="productPagePath">
          <div
            class="product-card__title three-dots max-w-full select-none font-medium"
            v-text="props.product.title"
            v-if="true"
          />
        </NuxtLink>
        <div class="flex-grow" />
        <!-- rating+colors -->
        <div
          class="product-card__rating-colors my-2 flex items-center justify-between"
          v-if="true"
        >
          <div class="rating flex items-center gap-1 text-xs">
            <UIcon name="mdi-star-outline" />
            <span v-text="`(${props.product.rating.rate})`" />
          </div>
          <div class="product-card__colors flex items-center">
            <div
              v-for="color in TProductColors"
              class="-ms-0.5 aspect-square w-3 rounded-full ring-1 ring-black/25"
              :style="{ backgroundColor: color }"
            />
            <span v-text="'+1'" class="ms-1 text-xs" />
          </div>
        </div>
        <!-- price+actions -->
        <div
          class="price-actions flex items-center justify-between"
          v-if="true"
        >
          <div class="product-card__price space-x-1">
            <strong
              v-text="`$${props.product.price}`"
              class="text-xs sm:text-base"
            />
            <span
              v-text="`(-${TProductdiscount}%)`"
              class="text-xs text-orange-600"
            />
          </div>
          <div class="product-card__actions flex items-center sm:gap-1">
            <UButton
              icon="mdi-eye-outline"
              :size="$viewport.isLessThan('mobileWide') ? 'xs' : 'sm'"
              variant="ghost"
              color="gray"
              class="rounded-full p-1 text-black/70 hover:bg-black/10 dark:text-white/60 dark:hover:bg-white/10 sm:p-2"
              square
            />
            <UButton
              icon="line-md:heart"
              :size="$viewport.isLessThan('mobileWide') ? 'xs' : 'sm'"
              variant="ghost"
              color="gray"
              class="rounded-full text-black/70 hover:bg-black/10 dark:text-white/60 dark:hover:bg-white/10"
              square
            />
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-else>{{ props.product.category }} || {{ props.product.price }}</div>
</template>

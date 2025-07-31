<script setup lang="ts">
import {getAllProducts} from "@/composables/useApi.ts";
import {IProductCard} from "@/types";

const {data} = getAllProducts();

function toProduct(item: any): IProductCard {
  return item
}
</script>

<template>
  <main id="best-seller">
    <BaseSectionHeader title="best seller"/>
    <BaseWrapper class="sm:max-w-5xl">
      <UCarousel :items="data ?? new Array(8).fill('')" v-slot="{ item }" arrows :ui="{
        item: 'basis-3/4 max-w-[75%] sm:basis-1/2 sm:max-w-[50%] md:!basis-1/3 md:!max-w-[33.33%] lg:basis-1/4 lg:max-w-[25%]',
      }" class="rounded-lg" :prev-button="{
  color: 'gray',
  icon: 'i-heroicons-arrow-left-20-solid',
  class: '-start-4 dark:hover:bg-gray-900',}" :next-button="{
  color: 'gray',
  icon: 'i-heroicons-arrow-right-20-solid',
  class: '-end-4 dark:hover:bg-gray-900',}">
        <div class="w-full max-w-full p-2">
          <ProductCard v-bind="toProduct(item)" v-if="item"/>
          <SkeletonProductCard v-else/>
        </div>
      </UCarousel>
    </BaseWrapper>
  </main>
</template>

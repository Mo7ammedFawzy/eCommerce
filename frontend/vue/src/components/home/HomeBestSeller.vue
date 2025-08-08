<script setup lang="ts">
import {getAllProducts} from "@/composables/useApi.ts";
import {IProductCard} from "@/types";
import {computed} from "vue";

const {data} = getAllProducts();

function toProduct(item: any): IProductCard {
  return item
}

const items = computed<IProductCard[]>(() => {
  const products = data.value;
  if (products?.length)
    return products;
  else
    return new Array(8).fill('');
})
</script>

<template>
  <main>
    <BaseSectionHeader title="best seller"/>
    <BaseWrapper class="sm:max-w-5xl">
      <UCarousel
          :items="items"
          arrows v-slot="{ item }" class="rounded-lg"
          :ui="{item: 'basis-3/4 max-w-[75%] sm:basis-1/2 sm:max-w-[50%] ' +
          'md:!basis-1/3 md:!max-w-[33.33%] lg:basis-1/4 lg:max-w-[25%]'}"
          :prev="{ color: 'neutral',icon: 'i-heroicons-arrow-left-20-solid',
          class: '!-start-4 dark:hover:bg-gray-900'}"
          :next="{color: 'neutral',icon: 'i-heroicons-arrow-right-20-solid',
          class: '!-end-4 dark:hover:bg-gray-900'}">
        <div class="w-full max-w-full p-2">
          <ProductCard v-bind="toProduct(item)" v-if="item"/>
          <SkeletonProductCard v-else/>
        </div>
      </UCarousel>
    </BaseWrapper>
  </main>
</template>

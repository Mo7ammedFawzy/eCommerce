<script setup lang="ts">
import {getProducts} from "@/composables/useApi.ts";
import {IProductCard} from "@/types";
import {computed} from "vue";

const {data} = getProducts();

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
          :ui="{container:'gap-0',item: 'basis-3/4 max-w-[75%] sm:basis-1/2 sm:max-w-[50%]' +
          'md:basis-1/3 md:max-w-[33.33%] lg:basis-1/4 lg:max-w-[25%]',
          next:'!-end-4 bg-background hover:bg-elevated',prev:'!-start-4 bg-background hover:bg-elevated'}"
          prev-icon="i-heroicons-arrow-left-20-solid"
          next-icon="i-heroicons-arrow-right-20-solid">
        <div class="w-full max-w-full py-1">
          <ProductCard v-bind="toProduct(item)" v-if="item"/>
          <SkeletonProductCard v-else/>
        </div>
      </UCarousel>
    </BaseWrapper>
  </main>
</template>

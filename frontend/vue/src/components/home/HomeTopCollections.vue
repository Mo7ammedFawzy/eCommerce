<script setup lang="ts">
import {getAllProducts} from "@/composables/useApi.ts";
import {SectionIds} from "@/utils/constants";
import {computed} from "vue";
import {IProductCard} from "@/types";

const {data} = getAllProducts()


const products = computed<IProductCard[]>(() => {
  const products = data.value;
  if (products?.length)
    return products;
  else
    return new Array(8).fill('');
})
</script>

<template>
  <section :id="SectionIds.HomeTopCollections">
    <BaseSectionHeader title="top collections"/>
    <BaseWrapper class="flex items-center justify-center flex-wrap">
      <div v-for="product in products"
           class="lg:basis-1/4 xs:basis-1/3 basis-1/2 lg:max-w-1/4 xs:max-w-1/3 max-w-1/2 p-[calc(var(--ui-gap)/2)]">
        <ProductCard v-bind="product" v-if="product"/>
        <SkeletonProductCard v-else/>
      </div>
    </BaseWrapper>
  </section>
</template>

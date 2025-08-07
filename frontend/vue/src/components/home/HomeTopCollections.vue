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
           class="responsive-card">
        <ProductCard v-bind="product" v-if="product"/>
        <SkeletonProductCard v-else/>
      </div>
    </BaseWrapper>
    <UButton
        to="/products"
        size="xl" leading-icon="hugeicons:link-04"
        label="View All" color="primary" class="w-fit px-6 mt-4 mx-auto flex"/>
  </section>
</template>

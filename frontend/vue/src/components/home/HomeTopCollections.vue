<script setup lang="ts">
import {getProducts} from "@/composables/useApi.ts";
import {SectionIds} from "@/utils/constants";
import ProductsContainer from "@/components/product/ProductsContainer.vue";

const {data: products} = getProducts({limit: 8})

</script>

<template>
  <section :id="SectionIds.HomeTopCollections">
    <BaseSectionHeader title="top collections"/>
    <ProductsContainer :products="products"/>
    <UButton
        to="/products"
        size="xl" leading-icon="hugeicons:link-04"
        label="View All" color="primary" class="w-fit px-6 mt-4 mx-auto flex"/>
  </section>
</template>

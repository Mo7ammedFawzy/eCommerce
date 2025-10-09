<script setup lang="ts">
import {getProducts} from "@/composables/useApi.ts";
import {SectionIds} from "@/utils/constants";
import ProductsContainer from "@/components/product/ProductsContainer.vue";

const {data, isFetching} = getProducts({limit: 8})


</script>

<template>
  <section :id="SectionIds.HomeTopCollections">
    <BaseSectionHeader title="top collections"/>
    <ProductsContainer :isFetching="isFetching" :products="data?.data.products"/>
    <UButton
        to="/products"
        size="xl" leading-icon="iconamoon:link-external-thin"
        label="View All" color="primary" class="w-fit px-6 mt-4 mx-auto flex"/>
  </section>
</template>

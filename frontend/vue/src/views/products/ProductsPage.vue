<script setup lang="ts">
import ProductsContainer from "@/components/product/ProductsContainer.vue";
import {getAllProducts} from "@/composables/useApi.ts";
import BaseBlob from "@/components/base/BaseBlob.vue";

const {data: products} = getAllProducts();

</script>

<template>
  <main class="mx-auto max-w-5xl sm:max-w-7xl">
    <BaseWrapper class="relative">
      <BaseLandingImg>
        <BaseBlob/>
      </BaseLandingImg>
      <BasePageHeader label="products" class="mt-8"/>
      <div class="mb-8 grid grid-cols-7 gap-6 lg:mt-5">
        <div class="col-span-7 hidden lg:block lg:col-span-2">
          <ProductsFilter class="sticky top-24"/>
        </div>
        <div class="col-span-7 min-h-screen lg:col-span-5">
          <ProductsContainer :products="products"/>
          <!--          <ProductsLimiter class="mb-8" v-model="pageCount" :max-length="data?.length ?? [].length"/>-->
          <!--          <BaseProductWrapper :products="TData" :page="page"/>-->
          <!--          <ProductsPagination v-model="page" :page-count="Number(pageCount)" :max-length="data?.length ?? [].length"/>-->
        </div>
      </div>
    </BaseWrapper>
  </main>
</template>

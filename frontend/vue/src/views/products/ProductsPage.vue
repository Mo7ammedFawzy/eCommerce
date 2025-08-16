<script setup lang="ts">
import ProductsContainer from "@/components/product/ProductsContainer.vue";
import BaseBlob from "@/components/base/BaseBlob.vue";
import {computed, toRef} from "vue";
import {useRoute} from "vue-router";
import {getProducts} from "@/composables/useApi.ts";

const route = useRoute();
const category = computed<string>(() => (<string>route.query.category))

const {data: products} = getProducts(toRef({category, limit: 8}));

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
        <div class="col-span-7 min-h-screen overflow-y-auto relative lg:col-span-5">
          <ProductsContainer :products="products"/>
          <!--          <ProductsLimiter class="mb-8" v-model="pageCount" :max-length="data?.length ?? [].length"/>-->
          <!--          <BaseProductWrapper :products="TData" :page="page"/>-->
          <!--          <ProductsPagination v-model="page" :page-count="Number(pageCount)" :max-length="data?.length ?? [].length"/>-->

          <!--     TODO::     -->
          <!--          <ProductsPagination class="mt-10 mx-auto w-fit" v-if="false"/>-->
        </div>
      </div>
    </BaseWrapper>
  </main>
</template>

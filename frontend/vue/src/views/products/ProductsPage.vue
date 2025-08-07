<script setup lang="ts">

import {ref} from "vue";

const pageCount = ref<number | string>(3);
const page = ref(1);


</script>

<template>
  <main class="mx-auto max-w-5xl sm:max-w-7xl">
    <BaseWrapper class="mt-8">
      <BasePageHeader label="products" />
      <div class="mb-8 grid grid-cols-7 gap-6 lg:mt-5">
        <div class="col-span-7 hidden lg:block lg:col-span-2 h-fit">
          <ProductsFilter class="sticky top-24"/>
        </div>
        <div ref="products" class="col-span-7 min-h-screen lg:col-span-5">
          <!--          <ProductsLimiter class="mb-8" v-model="pageCount" :max-length="data?.length ?? [].length"/>-->
          <!--          <BaseProductWrapper :products="TData" :page="page"/>-->
          <!--          <ProductsPagination v-model="page" :page-count="Number(pageCount)" :max-length="data?.length ?? [].length"/>-->
        </div>
      </div>
    </BaseWrapper>
  </main>
</template>

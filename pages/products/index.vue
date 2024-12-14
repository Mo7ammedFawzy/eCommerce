<script setup lang="ts">
import type { API_Product } from "~/types";

const pageCount = ref<number | string>(3); // page-count
const BASE_URL = "https://fakestoreapi.com/products";
const page = ref(1);
const route = useRoute();
const API_URL = computed(() => {
  if (route.query.category) {
    return BASE_URL + `/category/${route.query.category}`;
  } else {
    return BASE_URL;
  }
});
const { data, refresh, status } = await useFetch<API_Product[]>(API_URL, { lazy: true });

const TData = computed(() => {
  let ted: any[] = [];
  if (data.value) {
    ted = data.value.slice(
      (page.value - 1) * Number(pageCount.value),
      page.value * Number(pageCount.value),
    );
  }
  return ted;
});

watch(() => route.query, () => {
  UScrollTo("#products-wrapper")
  page.value = 1
})
watch(page, () => {
  UScrollTo("#products-wrapper")
  // page.value = 1
})
</script>

<template>
  <!-- <ClientOnly> -->
  <main id="products-page" class="mx-auto max-w-5xl pt-4 sm:max-w-7xl my-6">
    <BaseWrapper>
      <BasePageHeader />
      <!-- <UInput v-model="page" type="number" /> -->
      <!-- URL:{{ URL }} -->
      <div id="products-wrapper" class="products-page__wrapper mb-10 grid grid-cols-7 gap-6 lg:mt-5">
        <!-- left_filter -->
        <div class="products__filter col-span-7 mx-auto max-w-xs lg:col-span-2">
          <ProductsFilter class="sticky top-24 hidden lg:block" />
          <!-- v-if="$viewport.isGreaterOrEquals('desktop')" -->
          <!-- <AppSlideoverFilter  v-else/> -->
        </div>
        <!-- PRODUCTS_CONTAINER -->
        <div ref="products" class="products__container col-span-7 min-h-screen lg:col-span-5">
          <ProductsLimiter class="mb-8" v-model="pageCount" :max-length="data?.length ?? [].length" />
          <BaseProductWrapper :products="TData" :page="page" :status="status" />
          <ProductsPagination v-model="page" :page-count="Number(pageCount)" :max-length="data?.length ?? [].length" />
          <!-- <div v-else>
            {{ data }}
          </div> -->
        </div>
      </div>
    </BaseWrapper>
  </main>
  <!-- </ClientOnly> -->
</template>

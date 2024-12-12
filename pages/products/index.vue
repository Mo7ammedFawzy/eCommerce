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
const { data, refresh, status } = await useFetch<API_Product[]>(API_URL);

// max page
// const
/**
 * 22 element
 * max el in 1 page = 4
 * pages ?
 * @param {max} = 4
 * @param {items} = 22
 * @param {pages} = Math().ceil(items/max) 6
 * @param {page} = 1 => slice((page-1),(page-max))
 * 1: 0 => 3 page 1 ((max-1)*1,max-1)
 * 2: 4 => 7 page 2 ((2-1)*max,(2*4)-1)
 * 3: 8 => 11 page 3 ((3-1))
 * 4: 12 => 15 page 3
 * 5: 16 => 20 page 3
 * 6: 20 => 22 page 3
 * page = maxLength / maxElement in page
 * 22/4
 */

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
</script>

<template>
  <!-- <ClientOnly> -->
  <main id="products-page" class="mx-auto max-w-5xl pt-4 sm:max-w-7xl">
    <BaseWrapper>
      <BasePageHeader />
      <!-- <UInput v-model="page" type="number" /> -->
      <!-- URL:{{ URL }} -->
      <div class="products-page__wrapper mb-10 grid grid-cols-7 gap-6 lg:mt-5">
        <!-- left_filter -->
        <div class="products__filter col-span-7 mx-auto max-w-xs lg:col-span-2">
          <ProductsFilter class="sticky top-24 hidden lg:block" />
          <!-- v-if="$viewport.isGreaterOrEquals('desktop')" -->
          <!-- <AppSlideoverFilter  v-else/> -->
        </div>
        <!-- PRODUCTS_CONTAINER -->
        <div class="products__container col-span-7 min-h-screen lg:col-span-5">
          <ProductsLimiter
            class="mb-8"
            v-model="pageCount"
            :max-length="data?.length ?? [].length"
          />
          <BaseProductWrapper :products="TData" v-if="true" :status="status" />
          <ProductsPagination
            v-model="page"
            :page-count="Number(pageCount)"
            :max-length="data?.length ?? [].length"
          />
          <!-- <div v-else>
            {{ data }}
          </div> -->
        </div>
      </div>
    </BaseWrapper>
  </main>
  <!-- </ClientOnly> -->
</template>

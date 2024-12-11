<script setup lang="ts">
import type { API_Product } from "~/types";

// import { useFetch } from "@vueuse/core";
const BASE_URL = "https://fakestoreapi.com/products";
const route = useRoute();
const API_URL = computed(() => {
  //[] dot it
  if (route.query.category) {
    return BASE_URL + `/category/${route.query.category}`;
  } else {
    return BASE_URL;
  }
});
// const API_URL = ref(`https://fakestoreapi.com/products/${id.value}`);

const { data, refresh, status } = useFetch<API_Product[]>(API_URL);
</script>

<template>
  <ClientOnly>
    <main
      id="products-page"
      class="mx-auto max-w-5xl pt-4 sm:max-w-7xl md:mt-20"
    >
      <BaseWrapper>
        <BasePageHeader />
        <!-- URL:{{ URL }} -->
        <div class="products-page__wrapper my-10 grid grid-cols-7 gap-6">
          <div class="products__filter col-span-2 hidden lg:block">
            <ProductsFilter class="sticky top-24" />
          </div>
          <div class="products__container col-span-7 lg:col-span-5">
            <BaseProductWrapper :products="data" v-if="true" :status="status" />
            <div v-else>
              {{ data }}
            </div>
          </div>
        </div>
      </BaseWrapper>
    </main>
  </ClientOnly>
</template>

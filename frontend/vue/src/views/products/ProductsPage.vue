<script setup lang="ts">
import ProductsContainer from "@/components/product/ProductsContainer.vue";
import BaseBlob from "@/components/base/BaseBlob.vue";
import {computed, ref, watch} from "vue";
import {useRoute, useRouter} from "vue-router";
import {getProducts} from "@/composables/useApi.ts";
import {CategoryType, ProductParams} from "@/types/common.ts";
import ProductUtils from "@/utils/ProductUtils.ts";
import CollectionUtils from "@/utils/CollectionUtils.ts";

const route = useRoute();
const router = useRouter();
const category = ref<CategoryType>(route.query.category)
const page = ref<number>(Number(route.query.page ?? 1));
const pageLimit = ref<number>(Number(route.query.limit ?? ProductUtils.PAGE_LIMIT));
const params = computed<ProductParams>(() => {
  const p = {
    category: category.value ?? '',
    page: page.value,
    limit: pageLimit.value
  }
  return p;
})


// watch([category, page, pageLimit], ([cg, pg, pl]) => {
//   const oldPg = route.query.page
//   if (pg == oldPg)
//     page.value = 1;
//   router.push({
//     query: {
//       page: page.value,
//       limit: pageLimit.value,
//       category: category.value
//
//     }
//   })
// })

function resetPage() {
  page.value = 1;
}

watch(category, (oldValue, newValue) => {
  resetPage();
})
watch(params, paramsValue => {
  const query: ProductParams = {
    page: page.value,
    limit: pageLimit.value,
    category: category.value
  }
  CollectionUtils.deleteEmptyValues(query);
  router.push({query})
}, {immediate: true, deep: true})

// onMounted(() => {
//   router.push({
//     page: page.value,
//     limit: pageLimit.value,
//     category: category.value
//
//   })
// })

const {data, isFetching} = getProducts(params);

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
          <ProductsFilter v-model="category" class="sticky top-24"/>
        </div>
        <div class="col-span-7 min-h-screen overflow-y-auto relative lg:col-span-5">
          <ProductLimiter class="mb-8" v-model="pageLimit" :max-length="data?.data.meta.count ?? [].length"
                          :total-items="Number(data?.data.meta.totalItems) ?? 0"/>
          <ProductsContainer :isFetching="isFetching" :products="data?.data.products"/>
          <ProductsPagination
              v-if="data?.data.meta"
              class="mt-10 mx-auto w-fit"
              v-model="page"
              v-bind="data?.data.meta"
          />
        </div>
      </div>
    </BaseWrapper>
  </main>
</template>

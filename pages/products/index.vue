<script setup lang="ts">

const { getProductsOnQueryChange } = useAPI()


const { __scrollTo__ } = useGsap()

const pageCount = ref<number | string>(3); // page-count
const page = ref(1);

const route = useRoute();


const { data, status } = getProductsOnQueryChange()

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
watch(pageCount, () => page.value = 1)

watch(() => route.fullPath, () => {
  __scrollTo__("#products-wrapper")
  page.value = 1
})

onMounted(() => {
  __scrollTo__("#products-wrapper")

})

watch(page, () => {
  __scrollTo__("#products-wrapper")
  // page.value = 1
})

onUnmounted(() => {
  useRouter().push({ query: {} })
})

</script>

<template>
  <!-- <ClientOnly> -->
  <main id="products-page" class="mx-auto max-w-5xl sm:max-w-7xl">
    <BaseWrapper class="mt-8">
      <BasePageHeader />
      <!-- <UInput v-model="page" type="number" /> -->
      <!-- URL:{{ URL }} -->
      <div id="products-wrapper" class="products-page__wrapper mb-8 grid grid-cols-7 gap-6 lg:mt-5">
        <!-- left_filter -->
        <div class="products__filter col-span-7 hidden lg:block mx-auto max-w-xs lg:col-span-2">
          <ProductsFilter class="sticky top-24" />
          <!-- v-if="$viewport.isGreaterOrEquals('desktop')" -->
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

<script setup lang="ts">
const {getProductsOnQueryChange} = useAPI()
const {scrollTo} = useGsap()

const route = useRoute();

const pageCount = ref<number | string>(3);
const page = ref(1);

const {data, status} = getProductsOnQueryChange()
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
watch(page, () => scrollTo("#products-wrapper"))
watch(() => route.fullPath, () => (scrollTo("#products-wrapper"), (page.value = 1)))

onMounted(() => scrollTo("#products-wrapper"))
onUnmounted(() => useRouter().push({query: {}}))

</script>

<template>
  <main id="products-page" class="mx-auto max-w-5xl sm:max-w-7xl">
    <BaseWrapper class="mt-8">
      <BasePageHeader/>
      <div id="products-wrapper" class="mb-8 grid grid-cols-7 gap-6 lg:mt-5">
        <!-- left_filter -->
        <div class="col-span-7 hidden lg:block mx-auto max-w-xs lg:col-span-2">
          <ProductsFilter class="sticky top-24"/>
        </div>
        <!-- PRODUCTS_CONTAINER -->
        <div ref="products" class="col-span-7 min-h-screen lg:col-span-5">
          <!-- LIMITER -->
          <ProductsLimiter class="mb-8" v-model="pageCount" :max-length="data?.length ?? [].length"/>
          <!-- Products -->
          <BaseProductWrapper :products="TData" :page="page" :status="status"/>
          <!-- Pagination -->
          <ProductsPagination v-model="page" :page-count="Number(pageCount)" :max-length="data?.length ?? [].length"/>
        </div>
      </div>
    </BaseWrapper>
  </main>
</template>

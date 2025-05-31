<script setup lang="ts">

import type { IProduct } from "~/types";

const props = defineProps<{
  products?: IProduct[] | null;
  status?: string;
  page?: number
}>();

const isPageChanged = ref(false)

const onPageChanged = async () => {
  isPageChanged.value = true
  await delay(1500)
  isPageChanged.value = false
}

onMounted(() => {
  onPageChanged()
})

watch(() => props.page, () => {
  onPageChanged()
})

const exist = computed(
  () =>
    props.products && props?.products?.length > 0 && props.status == "success" && !isPageChanged.value,
);

</script>

<template>
  <section class="products-wrapper min-h-[400px] pa-2 overflow-hidden">
    <section id="products-wrapper-content"
      class="mx-auto grid max-h-fi p-2  grid-cols-[repeat(auto-fill,minmax(135px,1fr))] gap-3 xs:grid-cols-[repeat(auto-fill,minmax(170px,1fr))] sm:grid-cols-[repeat(auto-fill,minmax(195px,1fr))] md:grid-cols-[repeat(auto-fill,minmax(200px,1fr))] xl:grid-cols-[repeat(auto-fill,minmax(230px,1fr))]">
      <template v-if="exist">
        <BaseProductCard v-for="product in products" :product="product" />
      </template>
      <template v-else>
        <BaseSkeletonCard v-for="n in (products && products.length > 0) ? products.length : 3" />
      </template>
    </section>
  </section>
</template>

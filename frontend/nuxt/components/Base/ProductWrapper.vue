<script setup lang="ts">

import type {Product} from "~/types";

const props = defineProps<{
  products?: Product[] | null;
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
      !!props?.products?.length && !isPageChanged.value,
);


const productsToLoop = computed(() => {
  if (!props.products?.length)
    return Array(3);
  else
    return props.products
})
</script>

<template>
  <section class="min-h-[400px] pa-2 overflow-hidden">
    <section
        class="mx-auto grid max-h-full p-2 grid-cols-[repeat(auto-fill,minmax(135px,1fr))] gap-3 xs:grid-cols-[repeat(auto-fill,minmax(170px,1fr))] sm:grid-cols-[repeat(auto-fill,minmax(195px,1fr))] md:grid-cols-[repeat(auto-fill,minmax(200px,1fr))] xl:grid-cols-[repeat(auto-fill,minmax(230px,1fr))]">
      <template v-for="(product,index) in productsToLoop" :key="index">
        <BaseProductCard :product="product" v-if="product" />
        <BaseSkeletonCard v-else />
      </template>
    </section>
  </section>
</template>

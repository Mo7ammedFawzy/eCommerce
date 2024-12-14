<script setup lang='ts'>

import { API_DELAY, API_URL } from '~/constants';
import type { API_Product } from '~/types';

const { id = 1 } = useRoute().params

const isFetching = ref(false)

const toggleSkeleton = () => {
 isFetching.value = true
 setTimeout(() => {
  isFetching.value = false
 }, API_DELAY);
}

// getThisProduct
const { data, status } = useFetch<API_Product | null>(API_URL + `/products/${id}`, {
 lazy: true,
 onResponse() {
  // toggleSkeleton()
 }
})


</script>

<template>
 <main id='' class='product-page my-6'>
  <!-- <BasePlaceholder label="single product"/> -->
  <BaseWrapper class="min-h-[calc(100vh-20vh)]">
   <BasePageHeader title="product details" :lastTitle="data?.title" />
   <BaseProductContent :product="data" v-if="data && status === 'success'" />
   <BaseProductContentSkeleton v-else />
  </BaseWrapper>
 </main>
</template>
<script setup lang="ts">
import {type ProductCard} from "@/types/common.ts";
import {computed} from "vue";
import BaseWrapper from "@/components/base/BaseWrapper.vue";
import SkeletonProductCard from "@/components/product/SkeletonProductCard.vue";

const props = defineProps<{ products?: ProductCard[], isFetching: boolean }>()

const productsToShow = computed(() => {
  if (!!props.products?.length) {
    return props.products;
  }
  else
    return new Array(8).fill({_id: -1});
})
</script>
<template>
  <BaseWrapper>
    <div class="@container flex items-center flex-wrap">
      <div
          v-for="product in productsToShow"
          :key="product?._id"
          class="basis-full max-w-full @xs:basis-1/2 @xs:max-w-1/2 @lg:basis-1/3 @lg:max-w-1/3 @2xl:basis-1/4 @2xl:max-w-1/4 p-[calc(var(--ui-gap)/2)]">
        <ProductCard v-bind="product" v-if="product && product._id !== -1 && !isFetching"/>
        <SkeletonProductCard v-else/>
      </div>
    </div>
  </BaseWrapper>
</template>
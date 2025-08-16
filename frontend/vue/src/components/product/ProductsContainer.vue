<script setup lang="ts">
import {ProductCard} from "@/types";
import {computed} from "vue";

const props = defineProps<{ products: ProductCard[] | null }>()

const productsToShow = computed(() => {
  if (!!props.products?.length)
    return props.products;
  else
    return new Array(8).fill({id: -1});
})
</script>
<template>
  <BaseWrapper>
    <div class="@container flex items-center flex-wrap">
      <div
          v-for="(product,index) in productsToShow"
          :key="product?.id  + index"
          class="basis-full max-w-full @xs:basis-1/2 @xs:max-w-1/2 @lg:basis-1/3 @lg:max-w-1/3 @2xl:basis-1/4 @2xl:max-w-1/4 p-[calc(var(--ui-gap)/2)]">
        <ProductCard v-bind="product" v-if="product && product.id !== -1"/>
        <SkeletonProductCard v-else/>
      </div>
    </div>
  </BaseWrapper>
</template>
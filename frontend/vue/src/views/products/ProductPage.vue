<script setup lang="ts">
import {useRoute} from "vue-router";
import {getProduct} from "@/composables/useApi.ts";
import SkeletonProductContent from "@/components/product/SkeletonProductContent.vue";

const route = useRoute();
const productId = (<string>route.params.id);
const {data} = getProduct(productId);
</script>

<template>
  <BaseWrapper class="my-6 relative">
    <BaseLandingImg>
      <BaseBlob/>
    </BaseLandingImg>
    <BasePageHeader :label="data?.title" subtitle="data"/>
    <ProductContent v-bind="data" v-if="data"/>
    <SkeletonProductContent v-else/>
  </BaseWrapper>
</template>
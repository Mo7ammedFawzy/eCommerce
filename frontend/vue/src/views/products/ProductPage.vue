<script setup lang="ts">
import {getProduct} from "@/composables/useApi.ts";
import SkeletonProductContent from "@/components/product/SkeletonProductContent.vue";

const props = defineProps<{ id: string, title: string }>()

const {data} = getProduct(props.id);
</script>

<template>
  <BaseWrapper class="my-6 relative" :key="id">
    <BaseLandingImg>
      <BaseBlob/>
    </BaseLandingImg>
    <BasePageHeader :label="title"/>
    <ProductContent v-bind="data?.data.product" v-if="data?.data.product"/>
    <SkeletonProductContent v-else/>
  </BaseWrapper>
</template>
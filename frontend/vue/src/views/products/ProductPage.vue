<script setup lang="ts">
import {getProduct} from "@/composables/useApi.ts";
import SkeletonProductContent from "@/components/product/SkeletonProductContent.vue";
import {computed} from "vue";

const props = defineProps<{ id: string, title: string }>()

const {data, isFetching} = getProduct(computed(() => props.id));
</script>

<template>
  <BaseWrapper class="my-6 relative">
    <BaseLandingImg>
      <BaseBlob/>
    </BaseLandingImg>
    <BasePageHeader :label="title"/>
    <ProductContent v-bind="data?.data.product" v-if="data?.data.product &&!isFetching"/>
    <SkeletonProductContent v-else/>
  </BaseWrapper>
</template>
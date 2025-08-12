<script setup lang="ts">
import {useRoute} from "vue-router";
import {getProduct} from "@/composables/useApi.ts";
import SkeletonProductContent from "@/components/product/SkeletonProductContent.vue";

const props = defineProps<{ id: string, title: string }>()

const route = useRoute();
const {data: product} = getProduct(props.id);
</script>

<template>
  <BaseWrapper class="my-6 relative" :key="id">
    <BaseLandingImg>
      <BaseBlob/>
    </BaseLandingImg>
    <BasePageHeader :label="title"/>
    <ProductContent v-bind="product" v-if="product"/>
    <SkeletonProductContent v-else/>
  </BaseWrapper>
</template>
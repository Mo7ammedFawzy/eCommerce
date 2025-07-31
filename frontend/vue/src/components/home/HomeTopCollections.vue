<script setup lang="ts">
import {getAllProducts} from "@/composables/useApi.ts";

const {data} = getAllProducts()

</script>

<template>
  <BaseSectionHeader title="top collections"/>
  <BaseWrapper class="grid grid-cols-2 xs:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-(--ui-gap)">
    <ProductCard v-for="product in data" v-bind="product"/>
  </BaseWrapper>
</template>

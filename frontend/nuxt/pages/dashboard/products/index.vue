<script setup lang="ts">
import ProductWrapper from "~/components/Base/ProductWrapper.vue";

const {fetchAllProducts} = useAPI()
const {data, error} = fetchAllProducts();
</script>

<template>
  <div>
    <UButton label="add product" to="/dashboard/products/add"/>
    <ProductWrapper :products="data"/>
  </div>
</template>

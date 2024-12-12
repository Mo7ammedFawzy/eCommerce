<script setup lang="ts">
import type { ProductCard, API_Product } from "~/types";

const props = defineProps<{
  products?: API_Product[] | null;
  status?: string;
}>();

const exist = computed(
  () =>
    props.products && props?.products?.length > 0 && props.status == "success",
);
// fetchdProducts
// const FProducts = computed(()=>props.products)
</script>

<template>
  <section class="products-wrapper">
    <section
      id="products-wrapper"
      class="mx-auto grid grid-cols-[repeat(auto-fill,minmax(135px,1fr))] gap-3 xs:grid-cols-[repeat(auto-fill,minmax(170px,1fr))] sm:grid-cols-[repeat(auto-fill,minmax(195px,1fr))] md:grid-cols-[repeat(auto-fill,minmax(200px,1fr))] lg:grid-cols-[repeat(auto-fill,minmax(230px,1fr))]"
      v-if="true"
    >
      <!-- status:{{ { length: props.products.length, status: props.status } }} -->
      <template v-if="exist">
        <BaseProductCard v-for="product in products" :product="product" />
      </template>
      <template v-else>
        <BaseSkeletonCard v-for="n in 6" />
      </template>
    </section>
    <!-- <div v-text="props.products" v-else /> -->
  </section>
</template>

<script setup lang='ts'>
import type { ProductCard } from '~/types';


// import { Products } from "~/constants"

defineProps<{ products: ProductCard[] }>()

</script>

<template>
 <section class='products-wrapper my-10'>
  <!-- products -->
  <section id="products-wrapper" class="gap-3 grid grid-cols-[repeat(auto-fill,minmax(190px,1fr))] sm:grid-cols-[repeat(auto-fill,minmax(250px,1fr))] sm:max-w-5xl md:max-w-6xl mx-auto">
   <!-- md:max-w-4xl xl:max-w-4xl mx-auto grid grid-cols-[repeat(auto-fill,minmax(190px,1fr))] gap-3" -->
   <BaseProductCard v-for="product in products" :product="product" />
  </section>
 </section>
</template>
<script setup lang='ts'>
import { Categories } from "~/constants"


</script>

<template>
 <section id='categories' class='my-12 text-center'>
  <BaseHeader title="categories" />
  <BaseWrapper class="categories-group max-w-72 sm:max-w-xs md:max-w-md gap-6 grid grid-cols-2 px-12">
   <HomeCategoryCard v-for="categoryItem in Categories" :category="categoryItem" />
  </BaseWrapper>
 </section>
</template>
<script setup lang='ts'>
import { Products } from "~/constants"
</script>

<template>
 <main id='best-seller' class=''>
  <BaseHeader title="best seller" />
  <BaseWrapper class="best-seller__wrapper max-w-5xl basis-1/4 ring-">
   <UCarousel :items="Products" v-slot="{ item }" arrows :ui="{ item: ' basis-3/4 max-w-[75%] sm:basis-1/2 sm:max-w-[50%] md:basis-1/3 md:max-w-[33.33%] lg:basis-1/4 lg:max-w-[25%]' }" class="rounded-lg"
    :prev-button="{
     color: 'gray',
     icon: 'i-heroicons-arrow-left-20-solid',
     class: '-start-4 dark:hover:bg-gray-900'
    }" :next-button="{
 color: 'gray',
 icon: 'i-heroicons-arrow-right-20-solid',
 class: '-end-4 dark:hover:bg-gray-900'
}">
    <div class="product-card__wrapper w-full p-2 max-w-full">
     <BaseProductCard :product="item" class="" />
    </div>
    <!-- <NuxtImg class="card w-full aspect-square bg-blue-600 ring-1 ring-black" :src="item" draggable="true"></NuxtImg> -->
   </UCarousel>
  </BaseWrapper>
 </main>
</template>
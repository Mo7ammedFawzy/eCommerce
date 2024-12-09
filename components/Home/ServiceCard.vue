<script setup lang='ts'>
import type { ServiceCard } from '~/types';


defineProps<{ item: ServiceCard }>()

// const { title, icon, text } = props.item

</script>

<template>
 <!-- <UCard class=''>

 </UCard> -->
 <div class="service-card w-full max-w-xs mx-auto relative overflow-hidden text-white text-center bg-main rounded-lg px-8 py-6">

  <div class="servicce-card__wrapper  space-y-3">
   <div class="servicce-card__icon">
    <div
     class="icon__wrapper p-3 rounded-full w-fit mx-auto aspect-square bg-main-300 hover:bg-main-500 cursor-pointer flex items-center justify-center">
     <UIcon :name="item.icon" size="35" />

    </div>
   </div>
   <div class="servicce-card__title">
    <div class="text-2xl font-medium capitalize">{{ item.title }}</div>
   </div>
   <div class="servicce-card__text text-base leading-6 text-white/90">
    {{ item.text }}
   </div>
  </div>
  <!-- shape -->
  <span class="w-24  aspect-square absolute bg-white/15 left-0 rounded-full bottom-1/2 -translate-x-1/2" />
  <span class="w-20  aspect-square absolute bg-white/15 right-0 rounded-full -bottom-2  translate-x-1/2" />
 </div>
</template>
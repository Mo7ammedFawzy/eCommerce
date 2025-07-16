<script setup lang="ts">
import {IProductCard, Rating} from "@/types";
import {breakpointsTailwind, useBreakpoints} from "@vueuse/core";
import {computed} from "vue";

const props = defineProps<IProductCard>();

const DISCOUNT = .1
const breakpoints = useBreakpoints(breakpointsTailwind)

function onProductViewClick() {
}

const rating: Rating = {
  rate: 1,
  count: 1
}

const colors = ["red", "green"]
const loadingImgUrl = "https://picsum.photos/seed/headphones/400/300";

function firstImgIsValid(imgs: string[]) {
  return imgs && !!imgs.length && !(imgs[0].includes("vercel"));
}

const imgUrl = computed(() => {
  let imgToShow: string = loadingImgUrl;
  const imgs = props.images;
  if (firstImgIsValid(imgs))
    imgToShow = imgs[0];
  return imgToShow;
});
</script>
<template>
  <UCard variant="outline" :ui="{body:'p-0 sm:p-0'}" class="ring ring-(--ring-color) overflow-hidden">
    <RouterLink to="/" class="relative w-full aspect-square bg-white">
      <!-- img -->
      <img
          class="aspect-square w-full object-cover"
          :src="imgUrl" :alt="title" loading="lazy"/>
    </RouterLink>
    <!-- title -->
    <div class="flex w-full max-w-full flex-grow flex-col justify-between px-2 py-3 sm:px-3">
      <RouterLink to="/">
        <div class="three-dots max-w-full select-none font-medium" v-text="title"/>
      </RouterLink>
      <div class="flex-grow"/>
      <!-- rating+colors -->
      <div class="my-2 flex items-center justify-between">
        <div class="flex items-center gap-1 text-xs">
          <UIcon name="mdi-star-outline"/>
          <span v-text="`(${rating.rate})`"/>
        </div>
        <div class="flex items-center">
          <div v-for="color in colors" class="-ms-0.5 aspect-square w-3 rounded-full ring ring-(--ring-color)"
               :style="{ backgroundColor: color }"/>
          <span v-text="colors?.length" class="ms-1 text-xs"/>
        </div>
      </div>
      <!-- price+actions -->
      <div class="flex items-center justify-between">
        <div class="space-x-1">
          <strong v-text="`$${price}`" class="text-xs sm:text-base"/>
          <span v-text="`(-${DISCOUNT}%)`" class="text-xs text-orange-600"/>
        </div>
        <div class="flex items-center sm:gap-1">
          <!--              <ProductsView v-model="modal" :product="props.product">-->
          <UButton icon="mdi-eye-outline" :size="breakpoints.smallerOrEqual('sm') ? 'xs' : 'sm'" variant="ghost"
                   color="primary" @click="onProductViewClick"
                   class="rounded-full p-1 text-black/70 hover:bg-black/10 dark:text-white/60 dark:hover:bg-white/10 sm:p-2"
                   square/>
          <!--              </ProductsView>-->
        </div>
      </div>
    </div>
  </UCard>
</template>

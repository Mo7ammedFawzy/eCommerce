<script setup lang='ts'>

import {computed, ref} from "vue";
import {IProductCard} from "@/types";
import {FooterLinks} from "@/utils/constants";
import QuantityController from "@/components/product/QuantityController.vue";
import {useImage} from "@vueuse/core";

const props = defineProps<IProductCard>()
const imgUrl = props.images[0];

const {isLoading} = useImage({src: imgUrl})
const activeColor = ref(-1)
const productQuantity = computed(() => 0)
const productLink = computed(() => import.meta.env.BASE_URL + "/products/" + props.id)
const stars = (props.rating?.rate ?? 0) / 2
const MAX_ITEMS = 2;

const priceAfterDiscount = props.price - props.price * (props.discount ?? 0);
const priceBeforeDiscount = props.price;

function toDiscount() {
  return Number((props.discount ?? 0) * 100).toFixed(0)
}

const productInfo = [
  {
    label: 'Category',
    value: props.category
  },
  {
    label: "discount",
    value: `$${priceAfterDiscount} &nbsp; <span class='text-orange-600 dark:text-orange-500'>(${toDiscount()}% Discount)</span>`
  },
  {
    label: "Available",
    value: `${MAX_ITEMS} Items`
  },
]

function increaseQuantity() {

}

function decreaseQuantity() {

}

function addToCart() {

}
</script>

<template>
  <main class='rounded-md ui-ring p-5 lg:p-8 bg-background'>
    <div class="grid-cols-1 md:grid-cols-2 grid w-full gap-6">
      <div class="p-4 max-w-md mx-auto ui-ring rounded-md w-full flex items-center justify-center max-h-full">
        <USkeleton v-if="isLoading" class="w-auto max-h-full h-full aspect-square"/>
        <img v-else :src="imgUrl" class="object-contain max-h-full rounded-md h-full w-auto aspect-auto" :alt="title" loading="lazy"/>
      </div>
      <div>
        <div v-text="title" class="text-lg sm:text-xl md:text-2xl font-bold sm:three-dots leading-5"/>
        <div class="my-2 flex items-center justify-between">
          <div class="flex items-center gap-1 sm:gap-2 text-sm">
            <div class="inline-flex items-center gap-0">
              <span class="text-primary" v-for="i in 5">
                <UIcon v-if="i <= Math.floor(stars)" name="mingcute:star-fill"/>
                <UIcon v-else-if="(i - stars) <=0.5" name="mingcute:star-half-fill"/>
                <UIcon v-else name="circum:star"/>
              </span>
              ({{ rating?.rate }})
            </div>
            <span>
              <span v-text="rating?.count" class="font-bold"/>
              Review
            </span>
          </div>
          <div>
            <div class="space-x-1">
              <del class="text-xs text-gray-600 dark:text-gray-400">${{ priceBeforeDiscount }}</del>
              <span v-text="`$${priceAfterDiscount}`" class="font-bold text-base"/>
            </div>
          </div>
        </div>
        <div class="text-base flex items-center sm:text-lg capitalize mb-1" v-for="{ label, value } in productInfo">
          <strong v-text="label"/>:
          &nbsp;
          <p v-html="value" class="text-sm sm:text-base  three-dots max-w-[70%]"/>
        </div>
        <div class="mt-2 flex items-center gap-2">
          <strong v-text="'Colors:'" class="text-lg"/>
          &nbsp;
          &nbsp;
          <div class="flex items-center gap-2">
            <UBadge
                :class="{'shadow-[0_0_0_2px_white,0_0_0_4px_var(--ui-primary)]':activeColor==index}"
                @click="activeColor = index" v-for="(color, index) in colors"
                class="cursor-pointer aspect-square ui-ring ring-2 w-8 rounded-full" :style="{ backgroundColor: color }">
            </UBadge>
          </div>
        </div>
        <div class="flex my-6 gap-2 items-center">
          <strong class="text-lg font-semibold" v-text="'Quantity:'"/>
          <div class="w-fit">
            <QuantityController
                :max-items="MAX_ITEMS" :quantity="productQuantity"
                @increase-quantity="increaseQuantity" @decrease-quantity="decreaseQuantity"
            />
          </div>
        </div>
        <div class="mb-4 grid grid-cols-2 gap-2 max-w-full">
          <UButton @click="addToCart" label="add to cart" block class="capitalize dark:text-white"
                   color="primary" size="lg"/>
          <UButton label="buy now" size="lg" block color="secondary" to="/cart" class="capitalize dark:text-white"/>
        </div>
        <div class="mt-5 flex items-center justify-center gap-2">
          <CopyToClipboardBtn :product-link="productLink"/>
          <UButton v-for="({ icon, color }) in FooterLinks" square size="sm" variant="link">
            <template #trailing>
              <UIcon :name="icon" class="text-xl" :style="{ color }"/>
            </template>
          </UButton>
        </div>
      </div>
    </div>
  </main>
</template>
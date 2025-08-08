<script setup lang='ts'>

import {computed, ref} from "vue";
import {IProductCard} from "@/types";
import {FooterLinks} from "@/utils/constants";
import QuantityController from "@/components/product/QuantityController.vue";
import {useImage} from "@vueuse/core";

const props = defineProps<IProductCard>()
const {images, title, id, price, category, colors} = props
const imgUrl = images[0];

const {isLoading} = useImage({src: imgUrl})
const activeColor = ref(0)
const productQuantity = computed(() => 0)
const productLink = computed(() => import.meta.env.BASE_URL + "/products/" + id)

const MAX_ITEMS = 2;
const productInfo = [

  {
    label: 'Category',
    value: category
  },
  {
    label: "discount",
    value: `$${PriceAfterDiscount(price)} &nbsp; <span class='text-orange-600 dark:text-orange-500'>(${(props.discount ?? 0) * 100}% Discount)</span>`
  },
  {
    label: "Available",
    value: `${MAX_ITEMS} Items`
  },
]

function PriceAfterDiscount(price: number) {
  return price;
}

function increaseQuantity() {

}

function decreaseQuantity() {

}

function addToCart() {

}


</script>

<template>
  <main class='rounded-md ui-ring p-5 lg:p-8 dark:bg-background'>
    <div class="grid-cols-1 md:grid-cols-2 grid w-full gap-6">
      <div class="p-4 max-w-md mx-auto ui-ring rounded-md w-full flex items-center justify-center max-h-full">
        <USkeleton v-if="isLoading" class="w-auto max-h-full h-full aspect-square"/>
        <img :src="imgUrl" class="object-contain max-h-full rounded-md h-full w-auto aspect-auto" :alt="title" loading="lazy"/>
      </div>
      <div>
        <div v-text="title" class="text-lg sm:text-xl md:text-2xl font-bold sm:three-dots leading-5"/>
        <div class="my-2 flex items-center justify-between">
          <div class="flex items-center gap-1 sm:gap-2">
            <div class="inline-flex">
              <UIcon name="circum:star" v-for="_ in 5"/>
            </div>
            <p class="!text-main-300 text-sm font-semibold">0 Review</p>
          </div>
          <div>
            <div class="space-x-1">
              <del class="text-xs text-gray-600 dark:text-gray-400">${{ Number(price + 10).toFixed(2) }}</del>
              <span v-text="`$${price}`" class="font-bold text-base"/>
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
          <div class="flex items-center gap-1">
            <UBadge @click="activeColor = index" v-for="(color, index) in colors"
                    class="cursor-pointer aspect-square ui-ring w-8 rounded-full" :style="{ backgroundColor: color }">
              <UIcon name="mingcute:check-2-fill" class="text-white text-2xl"
                     :class="[activeColor == index ? 'opacity-100' : 'opacity-0']"/>
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
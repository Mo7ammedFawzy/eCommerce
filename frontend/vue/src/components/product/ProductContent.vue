<script setup lang='ts'>

import {computed, ref} from "vue";
import {FooterLinks} from "@/utils/constants";
import QuantityController from "@/components/product/QuantityController.vue";
import {useImage} from "@vueuse/core";
import {useCartStore} from "@/store/cart.ts";
import type {ProductCard} from "@/types/common.ts";
import ProductUtils from "@/utils/ProductUtils.ts";
import {RouteLocationRaw, useRoute, useRouter} from "vue-router";
import {RouterNames} from "@/router/routerNames.ts";
import CommonUtils from "@/utils/CommonUtils.ts";

const product = defineProps<ProductCard>()
const imgUrl = product.images[0];

const {addToCart, getProductMaxItems} = useCartStore();
const {isLoading} = useImage({src: imgUrl})
const activeColor = ref(-1)
const router = useRouter();
const route = useRoute()
const productLink = computed(() => {
  console.log(route)
  const routeLocation: RouteLocationRaw = {
    name: RouterNames.PRODUCT,
    params: {
      id: product._id,
      title: CommonUtils.toSlug(product.title)
    }
  };
  return window.location.origin + router.resolve(routeLocation).href;
})
const stars = (product.rating?.rate ?? 0) / 2

const priceAfterDiscount = product.price - product.price * (product.discount ?? 0) / 100;
const priceBeforeDiscount = product.price;

const productInfo = [
  {
    label: 'Category',
    value: product.category
  },
  {
    label: "discount",
    value: `${ProductUtils.toMoney(priceAfterDiscount)} &nbsp; <span class='text-orange-600 dark:text-orange-500'>(${ProductUtils.toDiscount(product)} Discount)</span>`,
    hideInfo: !ProductUtils.canShowDiscount(product)
  },
  {
    label: "Available",
    value: `${getProductMaxItems(product)} Items`
  },
]

</script>

<template>
  <main class='rounded-md  p-5 lg:p-8 bg-background'>
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
              <span class="text-primary dark:text-blue-ribbon-400" v-for="i in 5">
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
              <del v-if="ProductUtils.canShowDiscount(product)" class="text-xs text-gray-600 dark:text-gray-400">
                {{ ProductUtils.toMoney(priceBeforeDiscount) }}
              </del>
              <span v-text="`${ProductUtils.toMoney(priceAfterDiscount)}`" class="font-bold text-base"/>
            </div>
          </div>
        </div>
        <template v-for="{ label, value,hideInfo } in productInfo">
          <div class="text-base flex items-center sm:text-lg capitalize mb-1" v-if="!hideInfo">
            <strong v-text="label"/>:
            &nbsp;
            <p v-html="value" class="text-sm sm:text-base  three-dots max-w-[70%]"/>
          </div>
        </template>
        <div class="mt-2 flex items-center gap-2" v-if="colors?.length">
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
            <QuantityController :product="product"/>
          </div>
        </div>
        <div class="mb-4 grid grid-cols-2 gap-2 max-w-full">
          <UButton @click="addToCart(product)" label="add to cart" block class="capitalize dark:text-white"
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
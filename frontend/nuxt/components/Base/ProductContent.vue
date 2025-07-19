<script setup lang='ts'>

import { FooterLinks, MAX_ITEMS, DISCOUNT } from '~/constants';
import type { Product } from '~/types';

const store = useCartStore()

const productQuantity = computed(() => store.getProductQuantity(props.product))

const activeColor = ref(0)

const props = defineProps<{ product: Product, isModal?: boolean }>()

const modal = defineModel({ required: false, default: false })

const { image, title, id, price, category, rating, discount = DISCOUNT, colors = ['black', 'red', 'green'] } = props.product

const purpleColor = "!bg-[#f55da4] hover:!bg-[#ef458f]";

const productInfo = [
  {
    label: 'Category',
    value: category
  },
  {
    label: "discount",
    value: `$${PriceAfterDiscount(price)} &nbsp; <span class='text-orange-600 dark:text-orange-500'>(${DISCOUNT}% Discount)</span>`
  },
  {
    label: "Available",
    value: `${MAX_ITEMS} Items`
  },
]

// MAKE_IT_DYNAMIC
const productLink = computed(() => useRuntimeConfig().public.baseURL + `/products/${id ?? 1}`)

onMounted(() => {
  console.log({ href: useRuntimeConfig() })
})

</script>

<template>
  <main id='' class='product__content rounded-md t-ring  bg-white  p-5 lg:p-8 dark:bg-background '>
    <UButton icon="i-heroicons-x-mark" v-if="isModal" @click="modal = false" square size="lg"
      class="rounded-full aspect-square  mb-4 float-end" color="white" />
    <div class="proudct__wrapper grid-cols-1 md:grid-cols-2 grid w-full gap-6">
      <!-- {{ data }} -->
      <div class="product__img">
        <div class="img__wrapper px-4 py-6 max-w-md mx-auto bg-white t-ring ">

          <NuxtImg :src="image" fit="content" class="object-contain w-full aspect-auto max-h-64 lg:max-h-72" quality="60"
            :alt="props.product.title" format="webp" placeholder-class="max-w-full aspect-square max-h-40 lg:max-h-72 py-16 w-full"
            placeholder="/svg/spinner.svg" loading="lazy" />
        </div>
      </div>
      <div class="product__content">
        <!-- title -->
        <div v-text="title" class="text-lg sm:text-xl md:text-2xl font-bold sm:three-dots leading-5" />
        <!-- rating + price + discount -->
        <div class="rating__group my-2 flex items-center justify-between">
          <!-- rating -->
          <div class="rating flex items-center gap-1 sm:gap-2">
            <div class="stars inline-flex">
              <UIcon name="circum:star" v-for="n in 5" />
            </div>
            <p class="!text-main-300 text-sm font-semibold">0 Review</p>
          </div>
          <!-- price -->
          <div class="price">
            <div class="space-x-1">
              <del class="text-xs text-gray-600 dark:text-gray-400">${{ Number(price + 10).toFixed(2) }}</del>
              <span v-text="`$${price}`" class="font-bold text-base" />
            </div>
          </div>
        </div>
        <!-- cateogry+discount+available -->
        <div class="text-base flex items-center sm:text-lg capitalize mb-1" v-for="{ label, value } in productInfo">
          <strong v-text="label" />:
          &nbsp;
          <p v-html="value" class="text-sm sm:text-base  three-dots max-w-[70%]" />
        </div>
        <!-- colors -->
        <div class="colors mt-2 flex items-center gap-2">
          <strong v-text="'Colors:'" class="text-lg" />
          &nbsp;
          &nbsp;
          <div class="colors__wrapper flex items-center gap-1">
            <UBadge @click="activeColor = index" v-for="(color, index) in colors"
              class="cursor-pointer aspect-square t-ring w-8 rounded-full" :style="{ backgroundColor: color }">
              <UIcon name="i-heroicons-check" class="text-white bg-white" size="20"
                :class="[activeColor == index ? 'opacity-100' : 'opacity-0']" />

            </UBadge>
          </div>
        </div>
        <!-- TODO:sizes -->
        <!-- quantity -->
        <!-- productQuantity::{{ productQuantity }} -->
        <div class="flex my-6 gap-2 items-center">
          <strong class="text-lg font-semibold" v-text="'Quantity:'" />
          &nbsp;
          <BaseQuantityController :max-items="MAX_ITEMS" @increase-quantity="store.addToCart(props.product)"
            @decrease-quantity="store.decreaseQuantity(props.product)" :quantity="productQuantity" />
        </div>
        <!-- actions_btns(addToCart|Checkout) -->
        <div class="btns-group mb-4 grid grid-cols-2 gap-2 max-w-full">
          <UButton @click="store.addToCart(props.product)" label="add to cart" block class="capitalize dark:text-white"
            color="primary" size="lg" />
          <UButton label="buy now" size="lg" block :class="purpleColor" to="/cart" class="capitalize dark:text-white" />
        </div>
        <!-- copyLink+SocialMediaLinks -->
        <div class="socialLinks mt-5 flex items-center justify-center gap-2">
          <BaseBtnCopyToClipboard :product-link="productLink" />
          <UButton v-for="{ icon, color } in FooterLinks" square size="sm" variant="link">
            <template #trailing>
              <UIcon :name="icon" size="25" :style="{ color }" />
            </template>
          </UButton>
        </div>
      </div>
    </div>
  </main>
</template>
<script setup lang='ts'>
import type { ICart } from '~/types';

import { DISCOUNT, MAX_ITEMS } from '~/constants';

const props = defineProps<{ cartItem: ICart, readonly?: boolean, checkedOut?: boolean }>()


// const { product, quantity } = props.product

// get product own quantity
const store = useCartStore()

const productQuantity = computed(() => props.checkedOut ? props.cartItem.quantity : store.getProductQuantity(props.cartItem.product))

const TPriceAfterDiscount = computed(() => formatNumber(Number(PriceAfterDiscount(props.cartItem.product.price)) * productQuantity.value))

const productPath = computed(() => `/products/${props.cartItem.product.id}`)

const attrBinding = computed(() => !props.checkedOut ? 'to' : '')

</script>

<template>
  <div class='product-controller' :class="{ 'min-w-[550px]': !readonly }">
    <!-- <UDivider /> -->
    <div class="product-controller__wrapper  grid gap-3 font-semibold items-center text-center"
      :class="[props.readonly ? 'grid-cols-3' : 'grid-cols-8']">
      <!-- info -->
      <NuxtLink :[attrBinding]="{ path: productPath }"
        :class="[props.readonly ? 'col-span-2' : 'col-span-3 xl:col-span-4', { 'hover:bg-white/10 cursor-pointer': !props.checkedOut }]"
        class="product__info  text-left p-1 ">
        <div class="flex items-center gap-2 my-1">
          <!-- img -->
          <div class="img  p-1.5 overflow-hidden rounded-full bg-white aspect-square flex items-center justify-center"
            :class="[!props.readonly ? 'w-20' : 'w-12']">
            <!-- :class="[props.readonly ? '' : '']" -->
            <NuxtImg :src="props.cartItem.product.image" class="object-contain aspect-auto w-full rounded-md max-h-full"
              quality="60" :alt="props.cartItem.product.title" format="webp"
              placeholder-class="animate-pulse !w-full rounded-full !h-full max-h-20 bg-gray-300 dark:bg-gray-800"
              placeholder loading="lazy" />
          </div>
          <!-- details -->
          <div class="details flex-1  three-dots" v-text="props.cartItem.product.title"
            :class="[!props.readonly ? 'text-sm' : 'text-xs']" />
        </div>
      </NuxtLink>
      <!-- quantity -->
      <div class="quantity col-span-2" v-if="!readonly">
        <BaseQuantityController :quantity="productQuantity" :max-items="MAX_ITEMS" small
          @increase-quantity="store.increaseQuantity(props.cartItem.product)"
          @decrease-quantity="store.decreaseQuantity(props.cartItem.product)" />
      </div>
      <!-- total__price -->
      <div class="total__price flex items-center"
        :class="[props.readonly ? 'col-span-1 justify-end' : 'col-span-2 xl:col-span-1 justify-center',]">
        <div class="w-fit text-center">
          ${{ TPriceAfterDiscount }}<br />
          <p class="text-xs" v-text="props.readonly ? `×${props.cartItem.quantity}` : ''" />
        </div>
      </div>
      <!-- action(delete_btn) -->
      <div class="action col-span-1" v-if="!readonly">
        <UButton square icon="i-heroicons-trash" size="sm" color="white" class="rounded-full"
          @click="store.deleteProductFromCart(props.cartItem.product)" />
      </div>
    </div>
    <!-- <UDivider /> -->

    <!--  -->
  </div>
</template>
<script setup lang='ts'>
import type { ICart } from '~/types';

import { DISCOUNT, MAX_ITEMS } from '~/constants';

const props = defineProps<{ cartItem: ICart }>()


// const { product, quantity } = props.product

// get product own quantity
const store = useCartStore()

const productQuantity = computed(() => store.getProductQuantity(props.cartItem.product))

const priceAfterDiscount = computed(() => formatNumber(Number(props.cartItem.product.price * DISCOUNT / 100) * productQuantity.value))

</script>

<template>
 <div class='product-controller'>
  <UDivider />
  <div class="product-controller__wrapper my-2 grid grid-cols-6 gap-3 font-semibold items-center text-center">
   <!-- info -->
   <div class="product__info col-span-3 text-left">
    <div class="flex items-center gap-2">
     <!-- img -->
     <NuxtImg :src="props.cartItem.product.image" class="w-16 h-16  object-cover rounded-lg" />
     <!-- details -->
     <div class="details max-w-fit">
      <div class="text-sm three-dots max-w-32" v-text="props.cartItem.product.title" />
     </div>
    </div>
   </div>
   <!-- quantity -->
   <div class="quantity col-span-1 pe-2">
    <BaseQuantityController :quantity="productQuantity" :max-items="MAX_ITEMS" small
     @increase-quantity="store.increaseQuantity(props.cartItem.product)"
     @decrease-quantity="store.decreaseQuantity(props.cartItem.product)" />
   </div>
   <!-- total__price -->
   <div class="total__price col-span-1">
    ${{ priceAfterDiscount }}
   </div>
   <!-- action(delete_btn) -->
   <div class="action col-span-1">
    <UButton square icon="i-heroicons-trash" size="sm" color="gray" class="rounded-full" variant="ghost"
     @click="store.deleteProductFromCart(props.cartItem.product)" />
   </div>
  </div>
  <UDivider />

  <!--  -->
 </div>
</template>
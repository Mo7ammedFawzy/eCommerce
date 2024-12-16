<script setup lang='ts'>
import type { ICart } from '~/types';

import { DISCOUNT, MAX_ITEMS } from '~/constants';

const props = defineProps<{ cartItem: ICart, readonly?: boolean }>()


// const { product, quantity } = props.product

// get product own quantity
const store = useCartStore()

const productQuantity = computed(() => store.getProductQuantity(props.cartItem.product))

const priceAfterDiscount = computed(() => formatNumber(Number(props.cartItem.product.price * DISCOUNT / 100) * productQuantity.value))

</script>

<template>
  <div class='product-controller' :class="{ 'min-w-[550px]': !readonly }">
    <!-- <UDivider /> -->
    <div class="product-controller__wrapper  grid gap-3 font-semibold items-center text-center"
      :class="[props.readonly ? 'grid-cols-3' : 'grid-cols-8']">
      <!-- info -->
      <NuxtLink :to="{ path: `/products/${props.cartItem.product.id}` }"
        :class="[props.readonly ? 'col-span-2' : 'col-span-3 xl:col-span-4']"
        class="product__info  text-left hover:bg-white/10 p-1 cursor-pointer">
        <div class="flex items-center gap-2 my-1">
          <!-- img -->
          <div class="img  p-1.5 overflow-hidden rounded-full bg-white aspect-square flex items-center justify-center"
            :class="[!props.readonly ? 'w-20' : 'w-12']">
            <!-- :class="[props.readonly ? '' : '']" -->
            <NuxtImg :src="props.cartItem.product.image" class="object-contain aspect-auto w-full max-h-full"
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
      <div class="total__price" :class="[props.readonly ? 'col-span-1' : 'col-span-2 xl:col-span-1']">
        ${{ priceAfterDiscount }}<br />
        <p class="text-xs" v-text="props.readonly ? `×${props.cartItem.quantity}` : ''" />
      </div>
      <!-- action(delete_btn) -->
      <div class="action col-span-1" v-if="!readonly">
        <UButton square icon="i-heroicons-trash" size="sm" color="gray" class="rounded-full" variant="ghost"
          @click="store.deleteProductFromCart(props.cartItem.product)" />
      </div>
    </div>
    <UDivider />

    <!--  -->
  </div>
</template>
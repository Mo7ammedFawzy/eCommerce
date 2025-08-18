<script setup lang='ts'>
import {Cart} from "@/types.ts";
import {useCartStore} from "@/store/cart.ts";
import ProductUtils from "@/utils/ProductUtils.ts";

defineProps<{ cartItem: Cart, readonly?: boolean, checkedOut?: boolean }>()
const cartStore = useCartStore();

</script>

<template>
  <div :class="{ 'min-w-[550px]': !readonly }">
    <div class="grid gap-3 font-semibold items-center text-center"
         :class="[readonly ? 'grid-cols-3' : 'grid-cols-8']">
      <RouterLink
          :to="ProductUtils.toLink(cartItem.product)" :class="[readonly ? 'col-span-2' : 'col-span-3 xl:col-span-4 hover:text-blue-500']"
          class="text-left p-1 ">
        <div class="flex items-center gap-2 my-1">
          <div class="overflow-hidden rounded-full bg-white aspect-square flex items-center justify-center"
               :class="[!readonly ? 'w-20' : 'w-12']">
            <img :src="cartItem.product.images[0]" class="object-contain aspect-auto w-full rounded-full max-h-full"
                 :alt="cartItem.product.title" loading="lazy"/>
          </div>
          <div class="flex-1  three-dots" v-text="cartItem.product.title"
               :class="[!readonly ? 'text-sm' : 'text-xs']"/>
        </div>
      </RouterLink>
      <div class="col-span-2" v-if="!readonly">
        <QuantityController :product="cartItem.product"/>
      </div>
      <div class="flex items-center"
           :class="[readonly ? 'col-span-1 justify-end' : 'col-span-2 xl:col-span-1 justify-center']">
        <div class="w-fit text-center">
          ${{ cartStore.getCartItemTotalPrice(cartItem) }}<br/>
          <p class="text-xs" v-text="readonly ? `×${12}` : ''"/>
        </div>
      </div>
      <div class="col-span-1" v-if="!readonly">
        <UButton @click="cartStore.deleteProductFromCart(cartItem)" square icon="i-heroicons-trash" size="sm" class="rounded-full"/>
      </div>
    </div>
  </div>
</template>
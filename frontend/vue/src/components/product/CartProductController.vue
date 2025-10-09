<script setup lang='ts'>
import {Cart} from "@/types/common.ts";
import {useCartStore} from "@/store/cart.ts";
import ProductUtils from "@/utils/ProductUtils.ts";
import {ButtonAction} from "@/utils/ButtonAction.ts";
import CommonUtils from "@/utils/CommonUtils.ts";
import {useUIBreakpoints} from "@/composables/useUIBreakpoints.ts";
import {useImage} from "@vueuse/core";

const props = defineProps<{ cartItem: Cart, readonly?: boolean, checkedOut?: boolean }>()
const cartStore = useCartStore();

const {isLoading} = useImage({src: props.cartItem.product.thumbnail})

</script>

<template>
  <div :class="[readonly?'items-center':'flex-col md:flex-row md:items-center']"
       class="bg-background rounded-md text-left flex py-1 ps-2 pe-2 md:pe-4">
    <div class="flex flex-grow ui-gap overflow-hidden">
      <USkeleton v-if="isLoading" :class="[readonly?'h-20 max-h-20':'h-28 max-h-28']" class="w-auto max-w-full aspect-[4/3]"/>
      <RouterLink
          v-else
          :to="ProductUtils.toLink(cartItem.product)"
          :class="[readonly?'h-20 max-h-20':'h-28 max-h-28']"
          class="text-left p-1 28 w-auto shrink-0 max-w-full aspect-[4/3]">
        <img :src="cartItem.product.thumbnail" class="object-cover max-h-full aspect-auto"
             :alt="cartItem.product.title" loading="lazy"/>
      </RouterLink>
      <div class="flex-grow text-left max-w-full overflow-hidden">
        <RouterLink :to="ProductUtils.toLink(cartItem.product)" class="w-fit max-w-full block">
          <div v-text="cartItem.product.title" class="three-dots max-w-full text-muted dark:hover:text-white hover:text-black"/>
        </RouterLink>
        <div v-text="ProductUtils.toMoney(cartStore.getCartItemTotalPrice(cartItem))" class="font-semibold my-1"/>
        <QuantityController v-if="useUIBreakpoints().isNotMobileScreen.value && !readonly" :product="cartItem.product" class="float-left p-1"/>
      </div>
    </div>
    <div v-if="readonly" class="text-center">
      <p class="text-xs" v-text="readonly ? `×${cartItem.quantity}` : ''"/>
    </div>
    <div class="flex items-center justify-start ui-gap shrink-0" v-else>
      <QuantityController v-if="useUIBreakpoints().isMobileScreen.value" :product="cartItem.product" class="float-left p-1"/>
      <UButton :disabled="ButtonAction.isButtonDisabled().value"
               @click="ButtonAction.performAction(()=>cartStore.deleteProductFromCart(cartItem))"
               icon="i-heroicons-trash"
               color="primary"
               size="sm"
               label="delete"
               v-bind="{...CommonUtils.getDisabledUI()}"/>
    </div>
  </div>
</template>
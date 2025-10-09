<script setup lang='ts'>
import CommonUtils from "@/utils/CommonUtils.ts";
import {useCartStore} from "@/store/cart.ts";
import {SHIPPING_TAXES} from "@/utils/constants";
import BasePageHeader from "@/components/base/BasePageHeader.vue";
import ProductUtils from "@/utils/ProductUtils.ts";
import {ButtonAction} from "@/utils/ButtonAction.ts";

const cartStore = useCartStore();
</script>

<template>
  <main>
    <BaseWrapper class='mt-(--ui-gap)'>
      <BasePageHeader/>
      <div class="grid grid-cols-7 ui-gap">
        <div class="col-span-full md:col-span-5 order-1 md:order-0 p-1">
          <div class="ui-rounded-ring p-4">
            <div class="mb-(--ui-gap)">
              <span class="text-xl sm:text-2xl font-bold">Shopping Cart:</span>
              &nbsp;
              <span v-text="`(${cartStore.getCartLength} item)`"/>
            </div>
            <div class="max-h-full space-y-(--ui-gap) p-2" v-if="cartStore.getCartLength > 0">
              <template v-for="product in cartStore.cart">
                <CartProductController :cart-item="product"/>
              </template>
            </div>
            <div v-else>
              <img :src="CommonUtils.getImgUrl('/empty-cart.png')"
                   class="max-w-xs w-52  aspect-auto max-h-60 mt-8 mx-auto" alt="empty-cart" loading="lazy"/>
              <USeparator class="my-6"/>
              <UButton icon="i-heroicons-arrow-left" label="Continue Shopping" size="xl" color="neutral" variant="ghost"
                       to="/products"/>
            </div>
          </div>
        </div>
        <div class="col-span-full md:col-span-2 p-1">
          <div class="bg-background ui-rounded-ring p-4">
            <div class="text-base font-bold lg:text-xl" v-text="'Payment Summary'"/>
            <div class="my-3">
              <ul class="!text-sm lg:text-base">
                <li class="flex items-center justify-between">
                  <p v-text="'Subtotal'" class="text-sm"/>
                  <strong v-text="`${ProductUtils.toMoney(cartStore.getTotalPrice)}`"/>
                </li>
                <li class="flex items-center justify-between">
                  <p v-text="'Shipping'" class="text-sm"/>
                  <strong v-text="`${ProductUtils.toMoney(SHIPPING_TAXES)}`"/>
                </li>
              </ul>
            </div>
            <USeparator class="mb-3"/>
            <div class="flex items-center justify-between">
              <strong v-text="'Total Price'" class="text-sm"/>
              <strong v-text="`${ProductUtils.toMoney(cartStore.getTotalPriceAfterShipping)}`"/>
            </div>
            <UButton
                block class="dark:text-white mt-2"
                color="primary" size="lg" label="Checkout"
                to="/checkout"
                v-bind="{...ButtonAction.getDisabledButtonProps(cartStore.isCartEmpty).value}"/>
          </div>
        </div>
      </div>
    </BaseWrapper>
  </main>
</template>
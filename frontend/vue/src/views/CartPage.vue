<script setup lang='ts'>
import CommonUtils from "@/utils/CommonUtils.ts";
import {useCartStore} from "@/store/cart.ts";

const cartStore = useCartStore();
</script>

<template>
  <main>
    <BaseWrapper class='mt-8'>
      <BasePageHeader/>
      <div class="grid grid-cols-7 gap-4 lg:gap-5">
        <div class="col-span-full md:col-span-5">
          <div class="bg-background ui-ring p-4 lg:p-6">
            <div>
              <span class="text-xl sm:text-2xl font-bold">Shopping Cart:</span>
              &nbsp;
              <span v-text="`(${cartStore.getCartLength} item)`"/>
            </div>
            <div class="max-h-[400px] overflow-y-auto p-2  overflow-x-auto my-3" v-if="cartStore.getCartLength > 0">
              <div class="min-w-[550px]">
                <div
                    class="text-center grid grid-cols-8 font-semibold [&>div]:bg-gray-5 gap-2 items-center">
                  <div class=" col-span-3 xl:col-span-4 text-left" v-text="'Product'"/>
                  <div class="col-span-2" v-text="'Quantity'"/>
                  <div class="col-span-2 xl:col-span-1" v-text="'Total Price'"/>
                  <div class="col-span-1" v-text="'Action'"/>
                </div>
              </div>
              <div class="bg-background ui-ring p-4 lg:p-6">
                <div class="text-base font-bold lg:text-xl" v-text="'Payment Summary'"/>
                <div class="my-3">
                  <ul class="!text-sm lg:text-base">
                    <li class="flex items-center justify-between">
                      <p v-text="'Subtotal'" class="text-sm"/>
                      <strong v-text="`$${12}`"/>
                    </li>
                    <li class="flex items-center justify-between">
                      <p v-text="'Shipping'" class="text-sm"/>
                      <strong v-text="`$${12}`"/>
                    </li>
                  </ul>
                </div>
                <USeparator class="mb-3"/>
                <div class="flex items-center justify-between">
                  <strong v-text="'Total Price'" class="text-sm"/>
                  <strong v-text="`$${12}`"/>
                </div>
              </div>
              <template v-for="(product, index) in cartStore.cart">
                <CartProductController :cart-item="product"/>
              </template>
            </div>
            <div v-else>
              <img :src="CommonUtils.getImgUrl('/home/landing.jpg')"
                   class="max-w-xs w-52  aspect-auto max-h-60 mt-8 mx-auto" alt="empty-cart" loading="lazy"/>
              <USeparator class="my-6"/>
              <UButton icon="i-heroicons-arrow-left" label="Contiue Shopping" size="xl" color="neutral" variant="ghost"
                       to="/products"/>
            </div>
          </div>
        </div>
        <div class="col-span-full md:col-span-2">
          <UButton
              class="dark:text-white" color="primary" size="lg" label="Checkout"
              :ui="{ rounded: 'rounded-lg' }"/>
        </div>
      </div>
    </BaseWrapper>
  </main>
</template>
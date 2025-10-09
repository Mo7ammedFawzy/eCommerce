<script setup lang='ts'>


import {useRoute} from "vue-router";
import {useOrderStore} from "@/store/order.ts";
import {computed} from "vue";
import {SHIPPING_TAX} from "@/utils/constants";
import ProductUtils from "@/utils/ProductUtils.ts";
import CommonUtils from "@/utils/CommonUtils.ts";

const route = useRoute()
const routeID = route.params.id as string

const orderStore = useOrderStore()
const order = computed(() => orderStore.getOrder(routeID))
const customer = computed(() => order.value?.customer)

const customerDetails = computed(() => ({
  name: `${customer.value?.firstName} ${customer.value?.lastName}`,
  phone: customer.value?.phoneNumber,
  email: customer.value?.email,
  address: customer.value?.address
}))

const paymentDetails = computed(() => ({
  method: order.value?.paymentMethod,
  state: order.value?.state,
  'shipping fee': `${ProductUtils.toMoney(SHIPPING_TAX)}`,
  'order date': CommonUtils.formattedDate(order.value?.createdAt),
  total: `<strong class='text-orange-600'>$${order.value?.total}</strong>`
}))

</script>

<template>
  <main id='order-page'>
    <BaseWrapper class="my-4 max-w-4xl">
      <div class="text-center max-w-xl mx-auto">
        <div v-text="'Thank you for your purchase!'" class="text-3xl font-bold"/>
        <p class="leading-7 my-3 text-base"
           v-text="`Thank you for choosing us! Your purchase is appreciated. We're committed to providing top-notch products and service. Stay tuned for updates on your order.`"/>
        <div>
          <strong v-text="`Order Number:`"/>
          &nbsp;
          <span v-text="routeID" class="text-xs text-orange-600"/>
        </div>
      </div>
      <!-- details -->
      <div class="grid grid-cols-6 gap-5 mt-6">
        <div class="col-span-full lg:col-span-4">
          <!-- items -->
          <div class="flex flex-col ui-gap overflow-y-auto" main-scroll>
            <div v-text="`${orderStore.howManyUnitInOrder(routeID)} Items`"/>
            <template v-for="cartItem in orderStore.getOrderCartItems(routeID)">
              <CartProductController readonly checked-out :cart-item="cartItem"/>
            </template>
          </div>
        </div>
        <div class="col-span-full lg:col-span-2 ui-gap flex flex-col">
          <!-- customer-info -->
          <div class="ui-ring rounded-md p-4">
            <!-- title -->
            <div class="flex items-center gap-4">
              <div
                  class="p-1 bg-background  rounded-full dark:text-white aspect-square w-12 flex items-center justify-center">
                <UIcon size="10px" name="i-heroicons-user"/>
              </div>
              <div v-text="'customer details'" class="capitalize text-lg font-semibold three-dots"/>
            </div>
            <!-- details -->
            <ul class="text-base mt-4 space-y-1">
              <!-- item -->
              <li v-for="[key, value] in Object.entries(customerDetails)" class="flex items-center">
                <strong v-text="`${key}:`" class="capitalize"/>
                &nbsp;
                <p class="inline-block text-sm three-dots max-w-[60%]" v-text="value"/>
              </li>
            </ul>
          </div>
          <!-- payment-method -->
          <div class="ui-ring rounded-md p-4">
            <!-- title -->
            <div class="flex items-center gap-4">
              <div
                  class="p-1 bg-background dark:text-white rounded-full aspect-square min-w-12 w-14 flex items-center justify-center">
                <UIcon size="25" name="ph:currency-dollar-thin"/>
              </div>
              <div v-text="'payment method'" class="capitalize text-lg font-semibold three-dots"/>
            </div>
            <!-- payment_Method -->
            <ul class="text-base mt-4 space-y-1">
              <!-- item -->
              <li v-for="[key, value] in Object.entries(paymentDetails)" class="flex items-center">
                <strong v-text="`${key}:`" class="capitalize"/>
                &nbsp;
                <p class="inline-block text-sm three-dots max-w-[60%]" v-html="value"/>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </BaseWrapper>
  </main>
</template>
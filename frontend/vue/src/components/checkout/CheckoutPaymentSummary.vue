<script setup lang='ts'>

import {useCartStore} from "@/store/cart.ts";
import {SHIPPING_TAX} from "@/utils/constants";
import ProductUtils from "@/utils/ProductUtils.ts";

const store = useCartStore()

</script>

<template>
  <div class="bg-background ui-ring rounded-md p-4 lg:p-6">
    <!-- title -->
    <div class="text-base font-bold lg:text-xl" v-text="'Payment Summary'"/>
    <div class="pay-info-group my-3">
      <ul class="!text-sm lg:text-base">
        <li class="flex items-center justify-between">
          <p v-text="'Subtotal'" class="text-sm"/>
          <strong v-text="`${ProductUtils.toMoney(store.getTotalPrice)}`"/>
        </li>
        <li class="flex items-center justify-between">
          <p v-text="'Shipping'" class="text-sm"/>
          <strong v-text="`${ProductUtils.toMoney(SHIPPING_TAX)}`"/>
        </li>
      </ul>
    </div>
    <USeparator class="mb-3"/>
    <div class="flex items-center justify-between">
      <strong v-text="'Total Price'" class="text-sm"/>
      <strong v-text="`${ProductUtils.toMoney(store.getTotalPriceAfterShipping)}`"/>
    </div>
  </div>
</template>
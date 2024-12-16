<script setup lang='ts'>

import { SHIPPING_TAX } from '~/constants';

const store = useCartStore()

</script>

<template>
 <div class="payment__summary--wrapper bg-white dark:bg-app t-ring p-4 lg:p-6 mb-3">
  <!-- title -->
  <div class="text-base font-bold lg:text-xl" v-text="'Payment Summary'" />
  <div class="pay-info-group my-3">
   <ul class="!text-sm lg:text-base">
    <li class="flex items-center justify-between">
     <p v-text="'Subtotal'" class="text-sm" />
     <strong v-text="`$${store.getTotalPrice}`" />
    </li>
    <li class="flex items-center justify-between">
     <p v-text="'Shipping'" class="text-sm" />
     <strong v-text="`$${SHIPPING_TAX}`" />
    </li>
   </ul>
  </div>
  <UDivider class="mb-3" />
  <div class="flex items-center justify-between">
   <strong v-text="'Total Price'" class="text-sm" />
   <strong v-text="`$${store.getTotalPriceAfterShipping}`" />
  </div>
 </div>
</template>
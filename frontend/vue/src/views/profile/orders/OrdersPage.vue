<script setup lang='ts'>

import {useOrderStore} from "@/store/order.ts";
import CommonUtils from "@/utils/CommonUtils.ts";
import CollectionUtils from "@/utils/CollectionUtils.ts";

const orderStore = useOrderStore()


</script>

<template>
  <main id='orders-page'>
    <BaseWrapper class='mt-8'>
      <BasePageHeader label="orders"/>
      <!-- order-list -->
      <div class="order-details">
        <div class="overflow-x-auto ui-rounded-ring p-0">
          <!-- template -->
          <div
              class="text-white hidden md:grid grid-cols-9 bg-main-500 rounded-t-md p-3  lg:p-4 text-center items-center ">
            <!-- product+items+total_status+date+action -->
            <!-- product-info -->
            <div v-text="'Product'"
                 class="text-start md:col-span-2 lg:col-span-3 min-h-12  items-center font-semibold flex"/>
            <!-- items -->
            <div v-text="'Items'" class="font-semibold"/>
            <!-- TOTOAL -->
            <div v-text="'Total'" class="col-span-1 font-semibold"/>
            <!-- status -->
            <div v-text="'Status'" class="col-span-2 font-semibold"/>
            <!-- date -->
            <div v-text="'Date'" class="md:col-span-2 lg:col-span-1 font-semibold"/>
            <!-- action -->
            <div v-text="'Action'" class="col-span-1 font-semibold text-end"/>
          </div>
          <div v-if="Boolean(orderStore.orders.length)">
            <template v-for="order in orderStore.orders">
              <OrderCard :order="order"/>
              <USeparator v-if="CollectionUtils.isNotLastElementInArray(order,orderStore.orders)" :ui="{  border: 'border-(--ring-color)' }"/>
            </template>
          </div>
          <div v-else class="py-10">
            <img :src="CommonUtils.getImgUrl('/products/empty-data.png')" class="max-h-40 mx-auto" alt="empty-img"
            />
          </div>
        </div>
      </div>
    </BaseWrapper>
  </main>
</template>
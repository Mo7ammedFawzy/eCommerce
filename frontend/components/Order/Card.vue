<script setup lang='ts'>
import type { ICart, IOrder, UI_Colors, State_Badge } from "~/types"
import { STATE_BADGES } from "~/constants"

const props = defineProps<{ order: IOrder }>()

const orderStore = useOrderStore()

const getFirstItemFromCartItems = computed(() => props.order.items[0].product);

const howManyItemsInOrder = computed(() => orderStore.getCartItemsLengthInOrder(props.order))

// const State_Badge: State_Badge = {


// }

const TBadgeState = computed(() => ({ label: props.order.state, color: STATE_BADGES[props.order.state] }))

</script>

<template>
 <!-- grid-cols-[repeat(auto-fill,minmax(50px,1fr))] -->
 <div
  class="order-details__wrapper gap-y-2 md:gap-y-0 grid gap-x-3 grid-cols-10 md:grid-cols-9 items-center text-center rounded-t-md p-3 lg:p-4">
  <!-- product+items+total_status+date+action -->
  <!-- product-info -->
  <div class="order-first col-span-full md:col-span-2 lg:col-span-3 flex items-center gap-2">
   <!-- img -->
   <div class="img__wrapper hidden md:block min-w-14 max-w-14 aspect-square p-2  bg-white rounded-full">
    <NuxtImg :src="getFirstItemFromCartItems.image" class="w-full object-contain max-h-full aspect-auto rounded-md"
     loading="lazy" />
   </div>
   <div class="three-dots text-main font-semibold md:font-normal md:!body-text md:text-xs"
    v-text="getFirstItemFromCartItems.title" />
   <!-- text -->
  </div>
  <!-- items -->
  <div class="text-end md:text-center text-sm font-semibold col-span-2 md:col-span-1 order-[0] flex items-center justify-center">
   <UIcon name="i-heroicons-shopping-cart" size="18" />
   <span v-text="`×${howManyItemsInOrder}`" />
  </div>
  <!-- TOTOAL -->
  <div v-text="`$${props.order.total}`" class="hidden md:block col-span-1 font-semibold text-sm three-dots" />
  <!-- status -->
  <div class="text-end md:text-center col-span-3 md:col-span-2  font-semibold select-none order-2 md:order-none">
   <UBadge :label="TBadgeState.label" size="sm" class="text-xs" :ui="{ variant: { solid: 'dark:text-white' } }"
    :color="TBadgeState.color" variant="soft" />
  </div>

  <p v-text="FormatDate(props.order.createdAt)"
   class="text-start md:text-center text-xs col-span-3 md:col-span-2 lg:col-span-1 font-semibold three-dots order-1 md:order-none" />
  <!-- action -->
  <div class="text-start md:text-end order-last col-span-2 md:col-span-1  font-semibold">
   <UButton size="sm" square class="rounded-full" color="white" icon="i-heroicons-eye"
    :to="{ path: `/profile/orders/${props.order.id}` }" />
  </div>
 </div>
</template>
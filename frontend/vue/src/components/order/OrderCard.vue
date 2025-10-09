<script setup lang='ts'>
import {useOrderStore} from "@/store/order.ts";
import {computed} from "vue";
import {Order} from "@/types/common.ts";
import {STATE_BADGES} from "@/utils/constants";
import ProductUtils from "@/utils/ProductUtils.ts";
import {useImage} from "@vueuse/core";
import CommonUtils from "@/utils/CommonUtils.ts";

const props = defineProps<{ order: Order }>()
const orderStore = useOrderStore()

const firstProduct = props.order.items[0].product
const {isLoading} = useImage({src: firstProduct.thumbnail})
const howManyItemsInOrder = computed(() => orderStore.getCartItemsLengthInOrder(props.order))
const TBadgeState = computed(() => ({label: props.order.state, color: STATE_BADGES[props.order.state]}))

</script>

<template>
  <div class="md:gap-y-0 grid ui-gap grid-cols-10 sm:grid-cols-9 items-center text-center rounded-t-md p-3 dark:hover:bg-white/5 hover:bg-black/5">
    <div class="order-first col-span-5 sm:col-span-2 lg:col-span-3 flex items-center gap-2">
      <div class="block max-w-24" :data-order-id="order.id">
        <USkeleton v-if="isLoading" class="w-auto max-w-full aspect-[4/3] h-16 max-h-16"/>
        <RouterLink
            v-else
            :to="{ path: `/profile/orders/${order.id}`}"
            class="text-left p-1 h-16 max-h-16 w-auto block max-w-full">
          <img :src="firstProduct.thumbnail" class="object-cover max-h-full aspect-auto"
               :alt="firstProduct.title" loading="lazy"/>
        </RouterLink>
      </div>
    </div>
    <div class="text-end sm:text-center text-sm font-semibold col-span-2 sm:col-span-1 order-[0] flex items-center justify-center">
      <UIcon name="i-heroicons-shopping-cart" size="18"/>
      <span v-text="`×${howManyItemsInOrder}`"/>
    </div>
    <div v-text="`${ProductUtils.toMoney(order.total)}`" class="hidden sm:block col-span-1 font-semibold text-sm three-dots"/>
    <div class="text-start sm:text-center col-span-3 sm:col-span-2  font-semibold select-none order-2 sm:order-none">
      <UBadge :label="CommonUtils.toCapitalize(TBadgeState.label)" size="sm" class="text-xs" :ui="{ base:  'dark:text-white'  }"
              :color="TBadgeState.color" variant="soft"/>
    </div>
    <!--    <Teleport :to="`[data-order-id='${order.id}']`" :disabled="useUIBreakpoints().isNotMobileScreen.value">-->
    <p v-text="CommonUtils.formattedDate(order.createdAt)"
       class="text-start sm:text-center text-xs col-span-3 sm:col-span-2 lg:col-span-1 font-semibold three-dots order-1 sm:order-none"/>
    <!--    </Teleport>-->
    <div class="text-start sm:text-end order-last col-span-2 sm:col-span-1 font-semibold">
      <UButton icon="i-heroicons-eye" size="sm" label="view" square class="rounded-full"
               :to="{ path: `/profile/orders/${order.id}` }"/>
    </div>
  </div>
</template>
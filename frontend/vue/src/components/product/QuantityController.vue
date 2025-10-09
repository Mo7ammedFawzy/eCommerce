<script setup lang='ts'>
import {computed} from "vue";
import {ProductCard} from "@/types/common.ts";
import {useCartStore} from "@/store/cart.ts";
import {ButtonAction} from "@/utils/ButtonAction.ts";

const props = defineProps<{ product: ProductCard }>()
const cartStore = useCartStore();

const canDecreaseQuantity = computed(() => cartStore.getProductQuantity(props.product) >= 1)
const canIncreaseQuantity = computed(() => cartStore.getProductQuantity(props.product) < cartStore.getProductMaxItems(props.product))
</script>

<template>
  <div class='max-w-32'>
    <div class="ui-ring flex items-center justify-center rounded-md gap-2 py-2 px-3 md:px-4 md:gap-3">
      <UButton
          v-bind="{...ButtonAction.getDisabledButtonProp(!canDecreaseQuantity).value}"
          icon="i-heroicons-minus" square class="rounded-full"
          :ui="{base: 'ui-ring bg-transparent ui-disabled-btn'}" size="xs"
          variant="outline" color="neutral"
          @click="ButtonAction.performAction(()=>cartStore.decreaseQuantity(product))"/>
      <div v-text="cartStore.getProductQuantity(product)" class="w-8 text-sm three-dots max-w-8 text-center"/>
      <UButton
          v-bind="{...ButtonAction.getDisabledButtonProp(!canIncreaseQuantity).value}"
          icon="i-heroicons-plus" square class="rounded-full"
          :ui="{base: 'ui-ring bg-transparent ui-disabled-btn'}" size="xs"
          variant="outline" color="neutral"
          @click="ButtonAction.performAction(()=>cartStore.increaseQuantity(product))"/>
    </div>
  </div>
</template>
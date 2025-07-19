<script setup lang='ts'>
import {SHIPPING_TAX} from '~/constants';

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
  'shipping fee': `$${formatNumber(SHIPPING_TAX)}`,
  'order date': FormatDate(order.value?.createdAt),
  total: `<strong class='text-orange-600'>$${order.value?.total}</strong>`
}))

definePageMeta({
  validate(route) {
    const id = route.params.id as string
    const TOrderStore = useOrderStore()
    return TOrderStore.isOrderValid(id)
  }
})

</script>

<template>
  <main id='order-page'>
    <BaseWrapper class="my-10 max-w-4xl">
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
          <div class="semi-card-ring max-h-[500px] overflow-y-auto" main-scroll>
            <div v-text="`${orderStore.howManyUnitInOrder(routeID)} Items`"/>
            <template v-for="(cartItem, index) in orderStore.getOrderCartItems(routeID)">
              <CartProductController readonly checked-out :cart-item="cartItem"/>
              <UDivider v-if="index !== orderStore.getOrderCartItems(routeID).length - 1"/>
            </template>
          </div>
        </div>
        <div class="col-span-full lg:col-span-2 t-cards-gap-y">
          <!-- customer-info -->
          <div class="semi-card-ring">
            <!-- title -->
            <div class="flex items-center lg:justify-center gap-4">
              <div
                  class="p-3 bg-main rounded-full text-white aspect-square min-w-12 w-14 flex items-center justify-center">
                <Icon size="25" name="i-heroicons-user"/>
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
          <div class="semi-card-ring">
            <!-- title -->
            <div class="flex items-center lg:justify-center gap-4">
              <div
                  class="p-3 bg-main text-white rounded-full aspect-square min-w-12 w-14 flex items-center justify-center">
                <Icon size="25" name="ph:currency-dollar-thin"/>
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
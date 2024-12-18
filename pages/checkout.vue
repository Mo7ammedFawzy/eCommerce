<script setup lang='ts'>
import type { CheckoutUserInfoForm } from '#build/components';
import type { ICustomer, IOrder } from '~/types';
import { PAYMENT_METHODS, T_PAYMENT_METHOD } from "~/constants"

const store = useCartStore()

const selectedPaymentMethod = ref<IOrder['paymentMethod']>('cash_on_delivery')

// make only cash_on_delivery enabled
const C_paymentMehods = PAYMENT_METHODS.map((method) => ({ label: method, value: method, disabled: method !== T_PAYMENT_METHOD }))

const userInfoForm = ref<null | InstanceType<typeof CheckoutUserInfoForm>>()

definePageMeta({
  middleware: ['can-checkout', 'have-to-auth']
})

const placeOrder = () => userInfoForm.value?.form?.submit()
</script>

<template>
  <main id='checkout-page'>
    <BaseWrapper class='mt-8'>
      <BasePageHeader title="checkout" />
      <div class="checkout--wrapper grid grid-cols-7 gap-4 lg:gap-5">
        <div class="checkout__user-info semi-card-ring col-span-full md:col-span-5 h-fit">
          <!-- form -->
          <div class="semi-title" v-text="'User Information'" />
          <CheckoutUserInfoForm  ref="userInfoForm" :selectedPaymentMethod="selectedPaymentMethod" />
        </div>
        <div class="checkout__cart-items--payment-summary t-cards-gap-y col-span-full md:col-span-2">
          <!-- cart-items -->
          <div class="cart-items semi-card-ring">
            <!-- img+title+total-price -->
            <div class="semi-title mb-3" v-text="'Cart Items'" />
            <div class="cart-items__wrapper max-h-[380px] overflow-y-auto" main-scroll v-if="!store.isCartEmpty">
              <template v-for="(product, index) in store.cart">
                <CartProductController :cart-item="product" readonly />
                <UDivider v-if="store.getCartLength - 1 !== index" />
              </template>
            </div>
            <div v-else class="semi-title">
              Cart is empty!!
            </div>
          </div>
          <!-- payment-summary -->
          <CheckoutPaymentSummary />
          <!-- payment method -->
          <div class="payment-method semi-card-ring">
            <div class="semi-title mb-3" v-text="'Payment Method'" />
            <URadioGroup :options="C_paymentMehods" :model-value="selectedPaymentMethod"
              :ui-radio="{ base: 'disabled:opacity-40' }" class="capitalize" :ui="{ fieldset: 'space-y-2' }">
              <template #label="{ option }">
                <!-- option{{ option.disabled }} -->
                <div v-text="option.label" class="text-sm capitalize" :class="{ 'opacity-40': option.disabled }" />
              </template>
            </URadioGroup>
          </div>

          <UButton block label="Place Order" color="primary" @click="placeOrder"
            class="dark:text-white  transition-colors" size="xl" />
        </div>
      </div>
    </BaseWrapper>
  </main>
</template>
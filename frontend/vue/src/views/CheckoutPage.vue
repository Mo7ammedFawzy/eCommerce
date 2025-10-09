<script setup lang='ts'>

import {ref} from "vue";
import {Order} from "@/types/common.ts";
import {PAYMENT_METHODS, T_PAYMENT_METHOD} from "@/utils/constants";
import CheckoutUserInfoForm from "@/components/checkout/CheckoutUserInfoForm.vue";
import {useCartStore} from "@/store/cart.ts";
import {RadioGroupItem} from "@nuxt/ui/components/RadioGroup.vue";
import CollectionUtils from "@/utils/CollectionUtils.ts";
import {ButtonAction} from "@/utils/ButtonAction.ts";

const cartStore = useCartStore()

const selectedPaymentMethod = ref<Order['paymentMethod']>('cash_on_delivery')

const paymentMethods: RadioGroupItem[] = PAYMENT_METHODS.map((method) => ({label: method, value: method, disabled: method != T_PAYMENT_METHOD}))


const userInfoForm = ref<null | InstanceType<typeof CheckoutUserInfoForm>>()
function placeOrder() {
  userInfoForm.value?.uFormRef?.submit()
}
</script>

<template>
  <main>
    <BaseWrapper class='mt-8'>
      <BasePageHeader/>
      <div class="grid grid-cols-7 gap-4 lg:gap-5 mb-(--ui-gap)">
        <div class="ui-rounded-ring p-4 bg-background lg:p-6 col-span-full md:col-span-5 h-fit">
          <!-- form -->
          <div class="semi-title" v-text="'User Information'"/>
          <CheckoutUserInfoForm ref="userInfoForm" :selectedPaymentMethod="selectedPaymentMethod"/>
        </div>
        <div class="gap-(--ui-gap) flex flex-col col-span-full md:col-span-2">
          <!--          <UButton-->
          <!--&lt;!&ndash;              :disabled="cartStore.isCartEmpty" block&ndash;&gt;-->
          <!--&lt;!&ndash;              class="dark:text-white mt-2"&ndash;&gt;-->
          <!--&lt;!&ndash;              color="primary" size="lg" label="Checkout"&ndash;&gt;-->
          <!--&lt;!&ndash;              to="/checkout"&ndash;&gt;-->
          <!--&lt;!&ndash;              :ui="{ base:'rounded-lg aria-disabled:!disabled-btn' }"/>&ndash;&gt;-->
          <UButton
              v-bind="{...ButtonAction.getDisabledButtonProps().value}"
              block label="Place Order"
              color="primary"
              @click="ButtonAction.performAction(placeOrder)"
              class="dark:text-white mt-2" size="xl"/>
          <!-- cart-items -->
          <div class="ui-rounded-ring p-4 bg-background lg:p-6">
            <!-- img+title+total-price -->
            <div class="mb-3" v-text="'Cart Items'"/>
            <div class="overflow-y-auto" main-scroll v-if="!cartStore.isCartEmpty">
              <template v-for="product in cartStore.cart">
                <CartProductController :cart-item="product" readonly/>
                <USeparator v-if="CollectionUtils.isNotLastElementInArray(product,cartStore.cart)" :ui="{  border: 'border-(--ring-color)' }"
                            class="my-3"/>
              </template>
            </div>
            <div v-else class="semi-title">
              Cart is empty!!
            </div>
          </div>
          <!-- payment-summary -->
          <CheckoutPaymentSummary/>
          <!-- payment method -->
          <div class="ui-rounded-ring p-4 bg-background lg:p-6">
            <div class="semi-title mb-3" v-text="'Payment Method'"/>
            <URadioGroup v-model="selectedPaymentMethod" size="xl" variant="list" default-value="cash_on_delivery" :items="paymentMethods"/>
            <!--            <URadioGroup :items="paymentMethods" :model-value="selectedPaymentMethod"-->
            <!--                         :ui-radio="{ base: 'disabled:opacity-40' }" class="capitalize" :ui="{ fieldset: 'space-y-2' }">-->
            <!--              <template #label="{ option }">-->
            <!--                <div v-text="option.label" class="text-sm capitalize" :class="{ 'opacity-40': option.disabled }"/>-->
            <!--              </template>-->
            <!--            </URadioGroup>-->
          </div>

        </div>
      </div>
    </BaseWrapper>
  </main>
</template>
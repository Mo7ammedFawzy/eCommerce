<script setup lang='ts'>

const store = useCartStore()

const cartLength = computed(() => store.getCartLength);

const isCartEmpty = computed(() => store.isCartEmpty)

const colorMode = useColorMode()

</script>

<template>
  <main id='cart-page' class='my-6'>
    <BaseWrapper>
      <BasePageHeader title="Cart" />

      <div class="cart__wrapper grid grid-cols-7 gap-4 lg:gap-5">
        <!-- shopping-cart -->
        <div class="shopping__cart col-span-full md:col-span-5">
          <div class="shopping__cart--wrapper bg-white dark:bg-app t-ring p-4 lg:p-6">
            <div class="head__title">
              <span class="text-2xl font-bold">Shopping Cart:</span>
              &nbsp;
              <span v-text="`(${cartLength} item)`" />
            </div>
            <!-- shopping-cart__items -->
            <div class="cart__items my-3 space-y-2" v-if="cartLength > 0">
              <!-- TEMPLATE -->
              <div class="product-controller__wrapper--template text-center grid grid-cols-6 font-semibold">
                <!-- info -->
                <div class="product__info col-span-3 text-left" v-text="'Product'" />
                <!-- quantity -->
                <div class="quantity col-span-1" v-text="'Quantity'" />
                <!-- total__price -->
                <div class="total__price col-span-1" v-text="'Total Price'" />
                <!-- action(delete_btn) -->
                <div class="action col-span-1" v-text="'Action'" />
              </div>
              <CartProductController v-for="product in store.cart" :cart-item="product" />
            </div>
            <!-- empty_cart -->
            <div v-else>
              <NuxtImg :src="`/products/empty-cart-${colorMode.value}.webp`" class="max-h-60 mt-8 mx-auto" />
              <UDivider class="my-6" />
              <UButton icon="i-heroicons-arrow-left" label="Contiue Shopping" size="xl" color="gray" variant="ghost"
                to="/products" />
            </div>
          </div>
        </div>
        <!-- checkout -->
        <div class="payment__summary col-span-full md:col-span-2">
          <div class="payment__summary--wrapper bg-white dark:bg-app t-ring p-4 lg:p-6 mb-3">
            <!-- title -->
            <div class="text-base font-bold lg:text-xl" v-text="'Payment Summary'" />
            <div class="pay-info-group my-3">
              <ul class="!text-sm lg:text-base">
                <li class="flex items-center justify-between">
                  <p v-text="'Subtotal'" class="text-sm" />
                  <strong v-text="'$0.0'" />
                </li>
                <li class="flex items-center justify-between">
                  <p v-text="'Shipping'" class="text-sm" />
                  <strong v-text="'Free'" />
                </li>
              </ul>
            </div>
            <UDivider />
          </div>
          <UButton :disabled="isCartEmpty" block
            class="dark:text-white disabled:dark:bg-gray-500 disabled:bg-gray-200 disabled:text-black/40 disabled:dark:text-black/70"
            color="primary" size="lg" label="Checkout" :ui="{ rounded: 'rounded-lg' }" />
        </div>
      </div>
    </BaseWrapper>
  </main>
</template>
<script setup lang="ts">

import {ServiceCard} from "@/types";

const services: ServiceCard[] = [
  {
    icon: "la:shipping-fast",
    label: "free shipping",
    subtitle: "Enjoy free shipping on all orders, providing a convenient and cost-effective way to receive your favorite products at your doorstep."
  },
  {
    icon: "material-symbols-light:support-agent",
    label: "support",
    subtitle: "Our dedicated support team is here to assist you. Reach out to us for any queries or concerns, and experience exceptional customer service."
  },
  {
    icon: "fluent-mdl2:repeat-all",
    label: "Return",
    subtitle: "Hassle-free returns within a specified period. If you're not satisfied with your purchase, we make the return process simple and convenient for you."
  },
  {
    icon: "bx:dollar",
    label: "Payment",
    subtitle: "Secure and convenient payment options for a seamless shopping experience. Choose from various payment methods to complete your order."
  },
]
</script>

<template>
  <main id="home-services">
    <BaseWrapper class="grid grid-cols-[repeat(auto-fill,minmax(230px,1fr))] xl:grid-cols-4 gap-6">
      <div v-for="item in services"
           class="w-full h-full max-w-sm mx-auto relative overflow-hidden text-white text-center bg-primary rounded-lg px-8 py-6">
        <div class="space-y-3">
          <div class="p-3 rounded-full w-fit mx-auto ui-shadow aspect-square bg-primary-600 hover:bg-primary-500 cursor-pointer flex items-center justify-center">
            <UIcon :name="item.icon" class="text-4xl"/>
          </div>
          <div class="text-2xl font-medium capitalize" v-text="item.label"/>
          <div class="text-base leading-6 text-white/70" v-text="item.subtitle"/>
        </div>
        <span class="w-24  aspect-square absolute bg-white/15 left-0 rounded-full bottom-1/2 -translate-x-1/2"/>
        <span class="w-20  aspect-square absolute bg-white/15 right-0 rounded-full -bottom-2  translate-x-1/2"/>
      </div>
    </BaseWrapper>
  </main>
</template>

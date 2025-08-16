<script setup lang='ts'>


import {Cart} from "@/types";

const props = defineProps<{ cartItem: Cart, readonly?: boolean, checkedOut?: boolean }>()

</script>

<template>
  <div :class="{ 'min-w-[550px]': !readonly }">
    <div class="grid gap-3 font-semibold items-center text-center"
         :class="[readonly ? 'grid-cols-3' : 'grid-cols-8']">
      <RouterLink
          to="/" :class="[readonly ? 'col-span-2' : 'col-span-3 xl:col-span-4', { 'hover:bg-white/10 cursor-pointer': !props.checkedOut }]"
          class="text-left p-1 ">
        <div class="flex items-center gap-2 my-1">
          <div class="p-1.5 overflow-hidden rounded-full bg-white aspect-square flex items-center justify-center"
               :class="[!readonly ? 'w-20' : 'w-12']">
            <img :src="cartItem.product.images[0]" class="object-contain aspect-auto w-full rounded-md max-h-full"
                 :alt="cartItem.product.title" loading="lazy"/>
          </div>
          <div class="flex-1  three-dots" v-text="cartItem.product.title"
               :class="[!readonly ? 'text-sm' : 'text-xs']"/>
        </div>
      </RouterLink>
      <div class="col-span-2" v-if="!readonly">
        <QuantityController :quantity="cartItem.quantity" :max-items="5"/>
      </div>
      <div class="flex items-center"
           :class="[readonly ? 'col-span-1 justify-end' : 'col-span-2 xl:col-span-1 justify-center',]">
        <div class="w-fit text-center">
          ${{ 12 }}<br/>
          <p class="text-xs" v-text="readonly ? `×${12}` : ''"/>
        </div>
      </div>
      <div class="col-span-1" v-if="!readonly">
        <UButton square icon="i-heroicons-trash" size="sm" class="rounded-full"/>
      </div>
    </div>
  </div>
</template>
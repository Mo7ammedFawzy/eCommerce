<script setup lang='ts'>
import type { ICart } from '~/types';


const props = defineProps<{ product: ICart }>()


const { product, quantity } = props.product

// get product own quantity
const store = useCartStore()

const productQuantity = computed(() => store.getProductQuantity(product))

</script>

<template>
 <div class='product-controller'>
  <UDivider />
  <div class="product-controller__wrapper my-2 grid grid-cols-6 font-semibold">
   <!-- info -->
   <div class="product__info col-span-3">
    <div class="flex items-center gap-2">
     <!-- img -->
     <NuxtImg :src="product.image" class="w-16 h-16  object-cover rounded-lg" />
     <!-- details -->
     <div class="details max-w-fit">
      <div class="text-sm three-dots max-w-32" v-text="product.title" />
     </div>
    </div>
   </div>
   <!-- quantity -->
   <div class="quantity col-span-1">
    <!-- <BaseQuantityController :quantity="productQuantity" /> -->
   </div>
   <!-- total__price -->
   <div class="total__price col-span-1"></div>
   <!-- action(delete_btn) -->
   <div class="action col-span-1"></div>
  </div>
  <UDivider />

  <!--  -->
 </div>
</template>
<script setup lang='ts'>

// const quantity = ref(1)

const store = useCartStore()

// const quantity = computed(() => store.getProductQuantity)

defineProps<{ maxItems: number, quantity: number }>()

const emit = defineEmits(['increase-quantity', 'decrease-quantity'])

</script>

<template>
  <div class='quantity-controller'>
    <div class="controller__wrapper py-2 px-3 md:px-4 t-ring flex items-center justify-center gap-2 md:gap-3">
      <!-- minus-btn -->
      <UButton icon="i-heroicons-minus" square class="rounded-full" size="xs" color="white"
        @click="emit('decrease-quantity')" :disabled="quantity <= 1" />
      <!-- label-btn -->
      <div v-text="quantity" class="min-w-8 text-sm three-dots max-w-8 text-center" />
      <!-- plus-btn -->
      <UButton icon="i-heroicons-plus" square class="rounded-full" size="xs" color="white"
        @click="emit('increase-quantity')" :disabled="quantity >= maxItems" />
    </div>
  </div>
</template>
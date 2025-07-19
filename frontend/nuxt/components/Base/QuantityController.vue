<script setup lang='ts'>

defineProps<{ maxItems: number, quantity: number, small?: boolean }>()

const emit = defineEmits(['increase-quantity', 'decrease-quantity'])

</script>

<template>
  <div class='quantity-controller max-w-32 mx-auto'>
    <div class="t-ring flex items-center justify-center"
      :class="[small ? 'py-2 px-2 sm:px-2 gap-1' : 'gap-2 py-2 px-3 md:px-4 md:gap-3']">
      <!-- minus-btn -->
      <UButton icon="i-heroicons-minus" square class="rounded-full" size="xs" color="white"
        @click="emit('decrease-quantity')" :disabled="quantity <= 1" />
      <!-- label-btn -->
      <div v-text="quantity" class="w-8 text-sm three-dots max-w-8 text-center" />
      <!-- plus-btn -->
      <UButton icon="i-heroicons-plus" square class="rounded-full" size="xs" color="white"
        @click="emit('increase-quantity')" :disabled="quantity >= maxItems" />
    </div>
  </div>
</template>
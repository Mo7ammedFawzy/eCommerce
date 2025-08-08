<script setup lang='ts'>
const props = defineProps<{ maxItems: number, quantity: number }>()
const emit = defineEmits(['increase-quantity', 'decrease-quantity'])

const canDecreaseQuantity = props.quantity >= 1
const canIncreaseQuantity = props.quantity < props.maxItems
</script>

<template>
  <div class='max-w-32 mx-auto'>
    <div class="ui-ring flex items-center justify-center rounded-md gap-2 py-2 px-3 md:px-4 md:gap-3">
      <UButton
          icon="i-heroicons-minus" square class="rounded-full"
          :ui="{base: 'ui-ring bg-transparent'}" size="xs"
          variant="outline" color="neutral"
          @click="emit('decrease-quantity')" :disabled="!canDecreaseQuantity"/>
      <div v-text="quantity" class="w-8 text-sm three-dots max-w-8 text-center"/>
      <UButton
          icon="i-heroicons-plus" square class="rounded-full"
          :ui="{base: 'ui-ring bg-transparent'}" size="xs"
          variant="outline" color="neutral"
          @click="emit('increase-quantity')" :disabled="!canIncreaseQuantity"/>
    </div>
  </div>
</template>
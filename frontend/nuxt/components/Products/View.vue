<script setup lang='ts'>

import type {Product} from '~/types'

const modal = defineModel({required: true, default: false})

const props = defineProps<{ product: Product }>()

</script>

<template>
  <main>
    <slot/>
    <UModal v-model="modal" :ui="{ width: 'md:max-w-2xl' }">
      <BaseProductContent v-model="modal" :product="props.product" is-modal/>
    </UModal>
  </main>
</template>
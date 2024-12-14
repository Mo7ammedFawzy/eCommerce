<script setup lang='ts'>

import type { API_Product } from '~/types'

const modal = defineModel({ required: true, default: false })

const props = defineProps<{ product: API_Product }>()

</script>

<template>
 <main class='view-card'>
  <slot />
  <UModal v-model="modal" :ui="{ width: 'md:max-w-2xl' }">
   <!-- close btn -->
   <BaseProductContent v-model="modal" :product="props.product" is-modal />
  </UModal>
 </main>
</template>
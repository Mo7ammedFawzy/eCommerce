<script setup lang='ts'>

import type { IProduct } from '~/types'

const modal = defineModel({ required: true, default: false })

const props = defineProps<{ product: IProduct }>()

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
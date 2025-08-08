<script setup lang="ts">
import {shallowRef} from "vue";
import {IProductCard} from "@/types";

defineProps<{ product: IProductCard }>()
const open = shallowRef(false)
</script>
<template>
  <UDrawer
      handle-only
      v-model:open="open"
      :ui="{content:'bg-background ui-ring',header:'flex justify-end items-center',body:'max-h-full overflow-y-auto ui-scrollbar-y'}"
      should-scale-background set-background-color-on-scale>
    <slot name="trigger"/>
    <template #header>
      <UButton color="neutral" class="rounded-full" variant="ghost" icon="i-lucide-x" @click="open = false"/>
    </template>
    <template #body>
      <ProductContent v-bind="product"/>
    </template>
  </UDrawer>
</template>


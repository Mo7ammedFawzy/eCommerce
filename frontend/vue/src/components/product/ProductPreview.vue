<script setup lang="ts">
import {shallowRef} from "vue";
import {ProductCard} from "@/types.ts";

defineProps<{ product: ProductCard }>()
const open = shallowRef(false)
</script>
<template>
  <UDrawer
      handle-only
      v-model:open="open"
      :ui="{content:'bg-background ui-ring',header:'flex justify-end items-center',body:'max-h-full min-h-[70vh] overflow-y-auto ui-scrollbar-y'}"
      should-scale-background set-background-color-on-scale>
    <slot name="trigger"/>
    <template #header>
      <UButton color="neutral" class="rounded-full" variant="ghost" icon="i-lucide-x" @click="open = false"/>
    </template>
    <template #body>
      <BaseWrapper class="py-2">
        <ProductContent v-bind="product"/>
      </BaseWrapper>
    </template>
  </UDrawer>
</template>


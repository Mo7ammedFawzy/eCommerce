<script setup lang="ts">
import {GetProductsMeta} from "@/types/api";

const page = defineModel({required: true, default: 1});
defineProps<GetProductsMeta>();
</script>

<template>
  <UPagination v-model:page="page" :total="totalItems" :items-per-page="limit"
               :ui="{ rounded: 'first-of-type:rounded-s-md last-of-type:rounded-e-md' }" color="white" class="mx-auto">
    <template #prev="{ onClick }">
      <UTooltip text="Previous page">
        <UButton icon="i-heroicons-arrow-small-left-20-solid" color="gray" :ui="{ rounded: 'rounded-full' }"
                 class="me-2 rtl:[&_span:first-child]:rotate-180" @click="onClick"/>
      </UTooltip>
    </template>

    <template #next="{ onClick }">
      <UTooltip text="Next page">
        <UButton icon="i-heroicons-arrow-small-right-20-solid" color="gray" :ui="{ rounded: 'rounded-full' }"
                 class="ms-2 rtl:[&_span:last-child]:rotate-180" @click="onClick"/>
      </UTooltip>
    </template>
  </UPagination>
</template>

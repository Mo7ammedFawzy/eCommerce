<script setup lang="ts">
import ProductUtils from "@/utils/ProductUtils.ts";

const items = [
  {
    label: "Show: 3",
    value: 3,
  },
  {
    label: "Show: 6",
    value: 6,
  },
  {
    label: "Show: 8",
    value: 8,
  },
];


const pageLimit = defineModel<number>({default: ProductUtils.PAGE_LIMIT, type: Number});
defineProps<{ maxLength: number, totalItems: number }>();

</script>

<template>
  <main class="!mb-4">
    <div
        class="mx-auto flex max-w-sm flex-wrap items-center justify-center gap-3 text-center lg:max-w-full lg:flex-row-reverse lg:justify-between">
      <USelect
          v-model="pageLimit"
          :items="items"
          size="lg"
          color="primary"
      />
      <p class="basis-full lg:basis-auto">
        Showing 1-{{ maxLength }} items of {{ totalItems }}
      </p>
    </div>
  </main>
</template>

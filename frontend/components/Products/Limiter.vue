<script setup lang="ts">

const { $viewport } = useNuxtApp();

const options = [
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

const pageCount = defineModel<number | string>({ default: 3 });
const props = defineProps<{ maxLength: number }>();

</script>

<template>
  <main class="filter__limiter !mb-4">
    <div
      class="filter-options__wrapper mx-auto flex max-w-sm flex-wrap items-center justify-center gap-3 text-center lg:max-w-full lg:flex-row-reverse lg:justify-between"
    >
      <AppDrawerFilter v-if="$viewport.isLessThan('desktop')" />
      <!-- @change="updateQueryFilter" -->
      <USelect
        v-model="pageCount"
        :options="options"
        :ui="{ rounded: 'rounded-[4px]' }"
        size="lg"
        color="gray"
        variant="outline"
      />
      <p class="basis-full lg:basis-auto">
        Showing 1-{{ props.maxLength }} items
      </p>
    </div>
  </main>
</template>

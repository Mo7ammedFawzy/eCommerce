<script setup lang="ts">

import {onMounted, ref, watch} from "vue";
import {Categories} from "@/utils/constants";
import {useRoute, useRouter} from "vue-router";
import {GScrollTo} from "@/composables/useAnimations.ts";

const router = useRouter();
const route = useRoute();
const emit = defineEmits(['clear-filters'])

const selected = ref();

const loadFilters = () => {
  selected.value = route.query.category ?? null;
};

const clearFilters = () => {
  emit('clear-filters')
  if (Object.keys(route.query).length === 0)
    return;
  router.push({query: {}});
};

watch(selected, () => router.push({query: selected.value ? {category: selected.value} : {}}));
watch(() => route.query, () => {
  loadFilters();
  GScrollTo("#page-header", 50)
});

onMounted(() => loadFilters());

</script>

<template>
  <div class="ui-shadow ui-ring w-full rounded-lg py-6 bg-background">
    <div class="flex items-center justify-between px-4">
      <div class="text-xl font-bold" v-text="'Filter'"/>
      <UButton icon="ic:baseline-clear" @click="clearFilters" square
               class="rounded-full" variant="ghost" color="neutral" size="xl"/>
    </div>
    <USeparator :ui="{  border: 'border-(--ring-color)' }" class="my-3"/>
    <div class="px-4">
      <div v-text="'Categories'" class="mb-3 text-lg font-bold"/>
      <div>
        <URadioGroup
            v-model="selected"
            :items="Object.values(Categories)"
            :ui="{ fieldset: 'grid grid-cols-2 gap-2 w-full',
              item: 'border-gray-400',
              base: 'cursor-pointer size-5',
              label: 'capitalize !text-sm' }"/>
      </div>
      <UButton block label="clear filters" color="primary" class="capitalize mt-6" size="lg" @click="clearFilters"/>
    </div>
  </div>
</template>

<script setup lang="ts">

import {Categories} from "@/utils/constants";
import {useRoute, useRouter} from "vue-router";
import {GScrollTo} from "@/composables/useAnimations.ts";
import CommonUtils from "@/utils/CommonUtils.ts";

const router = useRouter();
const route = useRoute();
const emit = defineEmits(['clear-filters'])
const category = defineModel({type: String});

const clearFilters = () => {
  emit('clear-filters')
  if (Object.keys(route.query).length === 0)
    return;
  category.value = null;
};

CommonUtils.onQueryChanged((query) => {
  GScrollTo("#page-header", 50)
  if ('category' in query)
    category.value = query.category
})
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
            v-model="category"
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

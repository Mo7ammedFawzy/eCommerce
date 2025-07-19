<script setup lang="ts">
import {Categories} from "~/constants";

const router = useRouter();
const route = useRoute();
const emit = defineEmits(['clear-filters'])

const selected = ref();

const modifiedCategories = Categories.map((el) => ({
  label: el.radioTitle,
  value: el.label,
}));

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
watch(() => route.query, () => loadFilters());

onMounted(() => loadFilters());

</script>

<template>
  <div class="filter">
    <div class="filter__wrapper">
      <div class="filter__header flex items-center justify-between px-4">
        <div class="text-xl font-bold" v-text="'Filter'"/>
        <!-- BTN_CLEAR_FILTERS -->
        <UButton icon="ic:baseline-clear" @click="clearFilters" square class="rounded-full" variant="ghost" color="gray"
                 size="xl"/>
      </div>
      <UDivider :ui="{ border: { base: 'border-gray-300' } }" class="my-3"/>
      <!-- categories -->
      <div class="px-4">
        <div v-text="'Categories'" class="mb-3 text-lg font-bold"/>
        <div>
          <URadioGroup
              v-model="selected"
              :options="modifiedCategories"
              :ui="{ fieldset: 'grid grid-cols-2 gap-2 w-full' }" :ui-radio="{
              ring: 'ring-red-900',
              border: 'border-gray-400',
              base: 'cursor-pointer bg-red-900 w-5 h-5',
              label: 'capitalize text-sm',
            }"/>
        </div>
        <UButton block label="clear filters" class="capitalize mt-6" size="lg" color="white" @click="clearFilters"/>
      </div>
    </div>
  </div>
</template>

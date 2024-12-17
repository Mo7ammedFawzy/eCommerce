<script setup lang="ts">
/**
 * @abstract=== while searching add skeletonLoading
 */
import { Products, MAX_SEARCH_RESULT } from "~/constants";
import type { API_Product } from "~/types";

const data = ref(Products);
const isTyping = ref(false);
const search = ref("");
const finalData = computed(() => data.value.slice(0, MAX_SEARCH_RESULT));
const canShowResult = computed(() => !isTyping.value && finalData.value.length > 0)

const searching = () => {
  data.value = Products.filter((el: API_Product) =>
    el.title.toLocaleLowerCase().includes(search.value.toLowerCase()),
  );
};
const debounceFn = useDebounceFn(
  () => {
    searching();
    isTyping.value = false;
  },
  750,
  { maxWait: 3000 },
);

watch(search, () => {
  isTyping.value = true;
  debounceFn();
});

</script>

<template>
  <main class="search-component">
    <div class="search__container">
      <!-- Search_Input -->
      <div class="search__input">
        <UInput v-model="search" icon="i-heroicons-magnifying-glass-20-solid" placeholder="Search..." size="xl"
          color="white" name="search" autocomplete="off" :ui="{
            icon: { trailing: { pointer: '' } },
            color: { white: { outline: 'ring-0 focus:ring-0 !shadow-0' } },
            base: 'border-b-2 focus:border-b-main border-gray-300 dark:border-gray-700 dark:focus:border-main-500 md:h-16 h-20',
            rounded: 'rounded-none',
          }">
          <!-- variant="none" -->
          <template #trailing>
            <UButton v-show="search != ''" @click="search = ''" variant="link" square color="gray" :padded="false"
              icon="i-heroicons-x-mark-20-solid" size="xl" />
          </template>
        </UInput>
      </div>
      <div class="search__results--products md:0 mt-4" has-wrapper>
        <div class="search__wrapper mx-auto max-w-3xl pb-8">
          <!--  load all proudcts -->
          <div v-text="'brands'" class="my-8 text-xl font-bold md:my-2" />
          <UDivider class="md:hidden" :ui="{ border: { base: 'dark:border-gray-600 border-gray-500' } }" />
          <!-- SHOW_RESULT -->
          <div main-scroll class="max-h-[500px] overflow-y-auto md:max-h-[350px]" v-if="canShowResult">
            <template v-for="(item, index) in finalData">
              <BaseListItem :item="item" />
              <UDivider v-if="finalData.length - 1 != index" :ui="{ border: { base: 'border-gray-300' } }" />
            </template>
          </div>
          <!-- SHOW_SKELETON_LOADING -->
          <div v-else-if="isTyping" class="max-h-[500px] overflow-y-auto md:max-h-[350px]" main-scroll>
            <BaseListItemSkeletonLoader v-for="n in 6" />
          </div>
          <!-- SHOW_EMPTY_IMAGE -->
          <div v-else>
            <NuxtImg src="/products/no-product.png" class="mx-auto my-8 p-20 md:my-1" />
          </div>
          <UDivider class="md:hidden" :ui="{ border: { base: 'dark:border-gray-600 border-gray-500' } }" />
        </div>
      </div>
    </div>
  </main>
</template>


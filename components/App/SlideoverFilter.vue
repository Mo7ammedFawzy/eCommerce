<script setup lang="ts">
const model = ref(false);
const rouet = useRoute()

watch(
  () => rouet.query,
  () => {
    if (!model.value) return;
    model.value = false;
  },
);
</script>

<template>
  <div class="flex">
    <UButton color="gray" variant="outline" @click="model = !model">
      <!-- size="lg" -->
      <template #trailing>
        <UIcon name="stash:filter-light" size="25" />
      </template>
    </UButton>
    <!-- <AppProductFilterOptions /> -->
  </div>

  <USlideover v-model="model">
    <div class="model-content p-4 py-6">
      <!-- <AppProductsFilte /> -->
      <!-- <AppProductsFilte /> -->
      <ProductsFIlterContent @clear-filters="model &&= false" />
    </div>
  </USlideover>
</template>

<script setup lang="ts">

const route = useRoute()

const model = ref(false);

watch(
  () => route.query,
  () => {
    if (!model.value) return;
    model.value = false;
  },
);

</script>

<template>
  <div class="flex">
    <!-- Activator -->
    <UButton color="gray" variant="outline" @click="model = !model">
      <template #trailing>
        <UIcon name="stash:filter-light" size="25" />
      </template>
    </UButton>
  </div>
  <USlideover v-model="model">
    <div class="model-content p-4 py-6">
      <!-- Filter_Content -->
      <ProductsFIlterContent @clear-filters="model &&= false" />
    </div>
  </USlideover>
</template>

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
    <UButton color="gray" variant="outline" @click="model = !model">
      <template #trailing>
        <UIcon name="stash:filter-light" size="25" />
      </template>
    </UButton>
  </div>
  <USlideover v-model="model">
    <div class="p-4 py-6">
      <ProductsFIlterContent @clear-filters="model &&= false" />
    </div>
  </USlideover>
</template>

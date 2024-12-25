<script setup lang="ts">

const { getProducts } = useAPI()

const { data, status } = getProducts({ limit: 6 })

</script>

<template>
  <section id="top-collections" class="my-10">
    <BaseSectionHeader title="top collections" class="mb-8" />

    <LazyBaseProductWrapper :products="data" :status="status" />
    <!-- <div> -->
    <UButton size="xl" color="primary" variant="solid" :trailing="true" class="btn-primary mx-auto flex w-fit px-6 mt-8"
      to="/products" icon="mdi-light:chevron-right">View All
    </UButton>
    <!-- </div> -->
  </section>
</template>

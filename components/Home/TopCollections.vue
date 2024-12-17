<script setup lang="ts">

const { getProducts } = useAPI()

const { data, status } = getProducts({ limit: 6 })

</script>

<template>
  <section id="top-collections" class="my-10">
    <BaseHeader title="top collections" class="mb-8" />
    <!-- products -->
    <!-- <section id="products-wrapper" class="max-w-xs sm:max-w-xl md:max-w-4xl xl:max-w-7xl mx-auto grid grid-cols-[repeat(auto-fill,minmax(270px,1fr))] gap-3">
   <BaseProductCard v-for="product in Products" :product="product" />
  </section> -->
    <LazyBaseProductWrapper :products="data" :status="status" />
    <!-- <div> -->
    <UButton size="xl" color="primary" variant="solid" :trailing="true" class="btn-primary mx-auto flex w-fit px-6 mt-8"
      to="/products" icon="mdi-light:chevron-right">View All
    </UButton>
    <!-- </div> -->
  </section>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import type { API_Product } from "~/types";

const props = defineProps<{
  products?: API_Product[] | null;
  status?: string;
  page?: number
}>();

const isPageChanged = ref(false)

const onPageChanged = () => {
  isPageChanged.value = true
  setTimeout(() => {
    isPageChanged.value = false
  }, 2000)
}

onMounted(() => {
  onPageChanged()
  console.log((props?.products?.length ?? 0) > 0, props?.products?.length)
})

watch(() => props.page, () => {
  onPageChanged()
})

const exist = computed(
  () =>
    props.products && props?.products?.length > 0 && props.status == "success" && !isPageChanged.value,
);

</script>

<template>
  <section class="products-wrapper min-h-[400px]">
    <section id="products-wrapper"
      class="mx-auto grid max-h-fi grid-cols-[repeat(auto-fill,minmax(135px,1fr))] gap-3 xs:grid-cols-[repeat(auto-fill,minmax(170px,1fr))] sm:grid-cols-[repeat(auto-fill,minmax(195px,1fr))] md:grid-cols-[repeat(auto-fill,minmax(200px,1fr))] lg:grid-cols-[repeat(auto-fill,minmax(230px,1fr))]"
      v-if="true">
      <!-- products{{ products }} -->
      <template v-if="exist">
        <BaseProductCard v-for="product in products" :product="product" />
      </template>
      <template v-else>
        <BaseSkeletonCard v-for="n in (products && products.length > 0) ? products.length : 3" />
      </template>
    </section>
  </section>
</template>

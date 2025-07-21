<script setup lang='ts'>

const { getProduct } = useAPI()

const { data, status } = await getProduct()

</script>

<template>
 <main class='product-page'>
  <BaseWrapper class="min-h-[calc(100vh-20vh)] mt-8">
   <BasePageHeader :label="data?.title" :subtitle="data?.label" />
   <BaseProductContent :product="data" v-if="data && status === 'success'" />
   <BaseProductContentSkeleton v-else />
  </BaseWrapper>
 </main>
</template>
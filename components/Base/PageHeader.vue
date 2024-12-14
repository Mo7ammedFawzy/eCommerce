<script setup lang='ts'>

const props = defineProps<{ title?: string, lastTitle?: string }>()

const route = useRoute()
// const links = ref([])
const headTitle = computed(() => props.title ?? route.name)

// /products
const breadcrumbLinks = computed(() => {
  // const fullPath = route.fullPath.
  const home = 'home'
  // const TFullpath = 
  return home.concat(route.path).split("/").filter(el => el).map((el, index, array) => index !== array.length - 1 ? ({ label: el, to: { name: el } }) : ({ label: props.lastTitle ?? el })) // ['home','products','']
})


</script>

<template>
  <div id='page-header'
    class='relative rounded-lg bg-gradient-to-r from-main to-main-500  !text-white p-6 overflow-hidden mb-5'>
    <div v-text="headTitle" class="capitalize mb-4 text-3xl font-bold" />
    <!-- <div v-text="headPath" /> -->

    <UBreadcrumb :links="breadcrumbLinks" class="text-white  capitalize"
      :ui="{ active: 'text-white/80 !text-xs dark:text-white/80 three-dots max-w-48', inactive: '!text-white dark:text-white !text-xs hover:text-white hover:underline', divider: { base: 'text-white w-4' } }" />
    <BaseCircle class="top-1/2 -translate-y-1/2 right-0 translate-x-1/4" />
    <BaseCircle class="bottom-0 -translate-x-1/2 left-1/2 translate-y-1/4" />
    <BaseCircle class="top-0 -translate-x-full left-1/4 -translate-y-1/4" />
  </div>
</template>
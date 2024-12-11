<script setup lang='ts'>
type Head = {
 title: string,
 path: string
}

// const props = defineProps<{ data: Head }>()
// const { title, path } = props.data
// path

const route = useRoute()
// const links = ref([])
const headTitle = computed(() => route.name)
const headPath = computed(() => {
 const arr = ("home" + route.path).split("/").filter(el => el) // ['home','products','']
 const links: any[] = []
 arr.forEach((el: string, index) => {
  if (index === 0) {
   links.push({ label: el, to: "/" })
  } else {
   links.push({ label: el })

  }
 })
 return links
}
)

</script>

<template>
 <div id='page-header' class='relative rounded-lg bg-gradient-to-r from-main to-main-500  !text-white p-6 overflow-hidden my-5'>
  <div v-text="headTitle" class="capitalize mb-4 text-3xl font-bold" />
  <!-- <div v-text="headPath" /> -->

  <UBreadcrumb :links="headPath" class="text-white  capitalize"
   :ui="{ active: 'text-white/80 !text-xs dark:text-white/80', inactive: 'text-white !text-xs hover:text-white hover:underline', divider: { base: 'text-white w-4' } }" />
   <BaseCircle class="top-1/2 -translate-y-1/2 right-0 translate-x-1/4"/>
   <BaseCircle class="bottom-0 -translate-x-1/2 left-1/2 translate-y-1/4"/>
   <BaseCircle class="top-0 -translate-x-full left-1/4 -translate-y-1/4"/>
 </div>
</template>
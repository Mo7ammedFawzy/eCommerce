<script setup lang='ts'>

import {useRoute} from "vue-router";
import {computed} from "vue";
import {BreadcrumbItem} from "@nuxt/ui";
import BaseCircle from "@/components/base/BaseCircle.vue";
import {RouterNames} from "@/router/routerNames.ts";

const props = defineProps<{ label?: string }>()
const route = useRoute()

const label = computed(() => props.label ?? route.name);

const topRouteCrumbItem: BreadcrumbItem = {
  to: "/",
  label: "home"
}

const subRouteCrumbItems = computed<BreadcrumbItem[]>(() => {
  const midRoot: BreadcrumbItem = {
    to: {name: route.name},
    label: route.name
  }
  if (route.name != RouterNames.PRODUCT_PAGE)
    return [midRoot]
  const productRoot: BreadcrumbItem = {
    to: {name: RouterNames.PRODUCTS}, label: RouterNames.PRODUCTS
  }
  const product: BreadcrumbItem = {
    label: route.params.title
  }
  return [productRoot, product]
})

const items = computed<BreadcrumbItem[]>(() => {
  const allItems = [topRouteCrumbItem, ...subRouteCrumbItems.value]
  allItems[allItems.length - 1].ui = {item: "!no-underline"}
  allItems[allItems.length - 1].to = undefined
  return allItems
})

</script>

<template>
  <main id="page-header" class="h-fit w-full mb-6 overflow-hidden">
    <div class='relative rounded-lg bg-gradient-to-r from-primary to-blue-600 text-white p-6'>
      <div v-text="label" class="capitalize mb-4 text-3xl three-dots max-w-[70%] font-bold"/>
      <UBreadcrumb
          :items="items" class="text-white  capitalize"
          :ui="{
         link: 'text-white/80 !text-xs dark:text-white/80 three-dots max-w-48',
        separator:'text-white w-4',
        item:'!text-white dark:text-white !text-xs hover:text-white hover:underline'
        }"/>
      <BaseCircle class="top-1/2 -translate-y-1/2 right-0 translate-x-1/4"/>
      <BaseCircle class="bottom-0 -translate-x-1/2 left-1/2 translate-y-1/4"/>
      <BaseCircle class="top-0 -translate-x-full left-1/4 -translate-y-1/4"/>
    </div>
  </main>
</template>
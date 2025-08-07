<script setup lang='ts'>

import {useRoute} from "vue-router";
import {computed} from "vue";
import {BreadcrumbItem} from "@nuxt/ui";
import BaseCircle from "@/components/base/BaseCircle.vue";

const props = defineProps<{ label?: string, subtitle?: string }>()
const route = useRoute()

const label = computed(() => props.label ?? route.name)
const breadcrumbLinks = computed<BreadcrumbItem[]>(() => {
  const home = 'home'
  return home.concat(route.path).split("/").filter(el => el).map((el, index, array) => index !== array.length - 1 ? ({
    label: el,
    to: {name: el}
  }) : ({label: props.subtitle ?? el}))
})

</script>

<template>
  <main class="overflow-hidden h-fit w-full mb-6">
    <div class='relative rounded-lg bg-gradient-to-r overflow-hidden from-primary to-blue-600 text-white p-6' data-animate-one-time>
      <div v-text="label" class="capitalize mb-4 text-3xl three-dots max-w-[70%] font-bold"/>
      <UBreadcrumb
          :links="breadcrumbLinks" class="text-white  capitalize"
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
<script setup lang="ts">

import CommonUtils from "@/utils/CommonUtils.ts";
import {Categories} from "@/utils/constants";
import {RouteLocationAsRelativeGeneric} from "vue-router";
import {RouterNames} from "@/router/routerNames.ts";

function getCategoryRoute(category: string): RouteLocationAsRelativeGeneric {
  return {name: RouterNames.PRODUCTS, query: {category}}
}
</script>

<template>
  <BaseSectionHeader title="categories" class="my-12"/>
  <BaseWrapper class="flex flex-wrap items-center gap-4 justify-center max-w-(--container-4xl) text-center">
    <RouterLink v-for="category in Categories" class="max-w-32 group" :to="getCategoryRoute(category)">
      <div
          class="w-full aspect-square cursor-pointer flex items-center justify-center overflow-hidden p-3  rounded-full border-2  shadow-[0_0_0px_2px_gray] border-gray-50  group-hover:border-(--ui-primary) transition-all duration-500">
        <img :src="CommonUtils.getImgUrl('/home/categories'+category+'.png')"
             class="group-hover:-rotate-6 group-hover:scale-100 transition-all duration-500 scale-90 max-h-full max-w-full w-full h-auto object-contain"
             alt="category"/>
      </div>
      <div v-text="category" class="capitalize font-semibold mt-2"/>
    </RouterLink>
  </BaseWrapper>
</template>

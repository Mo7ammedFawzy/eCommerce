<script setup lang="ts">

import CommonUtils from "@/utils/common.ts";

const categories: string[] = ["mobile", "men", "accessories", "shoes", "bags"]

</script>

<template>
  <BaseSectionHeader title="categories" class="my-12"/>
  <BaseWrapper class="grid grid-cols-[repeat(auto-fit,minmax(100px,1fr))] items-center max-w-(--container-6xl) text-center">
    <div v-for="category in categories" class="p-2 group">
      <div
          class="w-full aspect-square cursor-pointer flex items-center justify-center overflow-hidden p-3  rounded-full border-4  shadow-[0_0_0px_2px_gray] border-gray-50 shadow-slate-300 group-hover:border-gray-600 transition-all duration-500">
        <img :src="CommonUtils.getImgUrl('home/categories',category)"
             class="group-hover:-rotate-6 group-hover:scale-100 transition-all duration-500 scale-90 max-h-full max-w-full w-full h-auto object-contain"
             alt="category"/>
      </div>
      <div v-text="category" class="capitalize font-semibold mt-2"/>
    </div>
  </BaseWrapper>
</template>

<script setup lang="ts">

import type { SemiCard } from '~/types';

const { $viewport } = useNuxtApp()

withDefaults(defineProps<{ item: SemiCard, large?: boolean, isBrand?: boolean }>(), { large: true, isBrand: false })

// const class_color = "bg-red-900"
// const colors = "bg-teal-600"
const brandColors = {
  text: "text-[#26c196] dark:text-[#26c196]",
  bg: "!bg-[#caece5] dark:!bg-[#143940]",
  shape: "!bg-[#26c196]"
}
</script>
<template>
  <!--  bg-amber-100 dark:bg-stone-700 -->
  <!-- :style="{ backgroundColor: item.bg }" -->
  <div class="landing-home relative overflow-hidden"
    :class="[{ 'rounded-lg ring-1 ring-black/10 dark:ring-white/10': !large }, { 'bg-amber-100 dark:bg-stone-700': large, 'bg-blue-300 dark:bg-sky-900': !large && item.isBlue, 'bg-pink-200 dark:bg-[#5B2C50]': !large && !item.isBlue, [brandColors.bg]: large && isBrand, 'sm:pt-24': large && isBrand }]">
    <UContainer
      class="pl-8 pr-0 md:pr-4 h-full rounded-none gap-2 md:gap-4 grid !grid-cols-3 sm:!grid-cols-2 w-full max-w-7xl"
      :class="{ '!grid-cols-7 sm:!grid-cols-7 !p-0': !large }">
      <!-- <NuxtImg :src="`/${item.img}.webp`" /> -->

      <!-- header -->
      <div :class="{ 'col-span-5 sm:!col-span-4 !space-y-3  !py-8 !pl-6': !large }"
        class="col-span-2 sm:!col-span-1 left-side py-32 md:py-14 space-y-5 z-[2] relative">
        <!-- <template #header> -->
        <div
          :class="{ '!text-xl md:!text-2xl dark:text-white text-gray-800': !large, [brandColors.text]: isBrand, 'text-gray-800': isBrand }"
          class="text-xl sm:text-4xl text-black dark:text-white md:text-5xl font-bold capitalize" v-text="item.title" />
        <div v-if="!large" v-html="item.subTitle" class="text-black/80 [&>span]:font-bold dark:text-gray-300 text-sm "
          :class="{ 'dark:[&>span]:text-blue-400 [&>span]:text-blue-700': !large && item.isBlue, '[&>span]:text-pink-500': !large && !item.isBlue }" />
        <!-- </template> -->
        <div v-text="item.text" class="text-gray-600 dark:text-gray-400 text-sm sm:text-md md:text-md"
          :class="{ '!text-xs text-gray-800': !large }" />
        <!-- actions -->
        <div class="actions mt-4 space-x-3 space-y-3">
          <UButton v-for="           { title, color, style, path }            in            item.btns           "
            :style="{ backgroundColor: style }" class="capitalize !text-white  text-xs  sm:text-sm px-5 sm:px-8"
            :to="path" :size="$viewport.isLessThan('mobileWide') ? 'lg' : 'xl'">
            {{ title }}</UButton>
        </div>
      </div>
      <div :class="{ 'col-span-2 sm:col-span-3 !mr-0': !large }"
        class="col-span-1 img-side h-full relative bg-gra-200 md:mr-3">
        <NuxtImg class="hidden md:block absolute top-0 translate-y-4 z-[2] h-full left-1/2 -translate-x-1/2"
          :src="`/home/${item.img}.webp`"
          :class="{ '!w-full !h-full !aspect-auto  !bottom-0 !translate-y-0 !top-auto  !object-contain object-bottom': !large }" />
        <span
          :class="{ 'w-full z-[1] left-auto h-full rounded-none !translate-y-0 !top-0 bottom-0 rounded-l-full': !large, [brandColors.shape]: large && isBrand, '!': isBrand }"
          :style="{ backgroundColor: item.shape_bg }"
          class="absolute top-1/2 md:top-0  md:-right-1/2 h-full md:h-auto md:w-full aspect-square bg-orange-300 z-[1] rounded-[50%] md:-translate-x-1/2 -translate-y-1/2 left-1/2 right-auto md:left-auto md:translate-y-[15%]" />
        <!-- class="absolute  md:-right-1/2 w-full aspect-square top-0 translate-y-[10%]  bg-orange-300 z-[1] rounded-[50%] md:-translate-x-1/2 left-1/2 right-auto md:left-auto" /> -->
      </div>
      <!-- semi-shape -->
    </UContainer>
    <span v-if="isBrand"
      class="absolute top-0 z-[1] -translate-y-[25%] left-1/2 -translate-x-1/2 w-40 aspect-square rounded-full"
      :class="brandColors.shape" />
  </div>
</template>

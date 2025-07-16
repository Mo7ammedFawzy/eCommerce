<script setup lang="ts">
import HomeCategories from "@/components/home/HomeCategories.vue";
</script>
<template>
  <BaseWrapper full-width>
    <!--  Landing  -->
    <div class="bg-[#f6e4be] items-center grid grid-cols-1 md:grid-cols-2 relative overflow-hidden dark:bg-[#383736] min-h-[40vh]">
      <div class="ps-12 space-x-2 relative z-10">
        <h1 v-text="'top products of the year!'" class="text-5xl capitalize font-black text-[#212b36] dark:text-white"/>
        <p v-text="'It is a long established fact that a reader will be distracted by the readable.'"
           class="text-lg my-5 dark:text-gray-400 text-gray-600"/>
        <UButton size="xl" class="px-7" label="shop now" color="primary"/>
        <UButton size="xl" class="px-6" label="see all" color="secondary"/>
      </div>
      <span class="absolute aspect-square w-2/3 z-1 hidden md:block bg-[#fbca66] rounded-full left-0 -translate-y-4/5 top-0"/>
      <span class="absolute aspect-square w-2/3 z-1 bg-[#fbca66] hidden md:block rounded-full right-0 translate-y-4/5  bottom-0"/>
      <span class="absolute aspect-square w-full z-1 bg-[#fbca66] md:hidden rounded-full top-1/2 -right-3/4 -translate-y-1/2"/>
      <div class="hidden md:flex justify-center items-end h-full px-6 pt-8 overflow-hidden w-full">
        <img src="@/assets/imgs/home/landing/landing.webp" alt="landing-image"
             class="object-contain max-h-full z-10 hidden md:block"/>
      </div>
    </div>
    <BaseWrapper class="space-y-12">
      <BaseWrapper class="grid grid-cols-1 md:grid-cols-2 my-(--card-spacing) gap-(--card-spacing)">
        <div class="overflow-hidden ring ring-black/25 dark:ring-white/25 relative grid grid-cols-7 bg-(--ui-primary)/35 rounded-md">
          <div class="ps-4 py-6 relative z-10 space-y-2 col-span-4">
            <div v-text="'Men Latest Fashion'" class="text-xl lg:text-2xl font-black capitalize"/>
            <div class="font-semibold text-sm" v-text="'25%Off on first order'"/>
            <p class="hidden sm:block text-xs mb-6 dark:text-gray-300"
               v-text="'Lorem Ipsum is simply dummy text of the printing and typesetting industry'"/>
            <UButton size="md" class="px-5" label="shop now" color="primary"/>
          </div>
          <span class="left-full -translate-x-1/2 sm:-translate-x-2/5
         top-1/2 -translate-y-1/2 rounded-full  absolute w-full aspect-square
          bg-(--ui-primary)"/>
          <div class="ps-4 pr-1 pt-0 h-full w-full col-span-3">
            <div class="relative w-full h-full">
              <img src="@/assets/imgs/home/landing/card-men.webp" alt="landing-image"
                   class="object-cover max-w-full  absolute right-0 bottom-0 max-h-full z-[1]"/>
            </div>
          </div>
        </div>
        <div class="overflow-hidden relative ring ring-black/25 dark:ring-white/25 grid grid-cols-7 bg-(--ui-secondary)/35 rounded-md">
          <div class="ps-4 py-6 relative z-10 space-y-2 col-span-4">
            <div v-text="'Women Latest Fashion'" class="text-xl lg:text-2xl font-black capitalize"/>
            <div class="font-semibold text-sm" v-text="'25%Off on first order'"/>
            <p class="hidden sm:block text-xs mb-6 dark:text-gray-300"
               v-text="'Lorem Ipsum is simply dummy text of the printing and typesetting industry'"/>
            <UButton size="md" class="px-5" label="shop now" color="secondary"/>
          </div>
          <span class="left-full -translate-x-1/2 sm:-translate-x-2/5
         top-1/2 -translate-y-1/2 rounded-full  absolute w-full aspect-square
          bg-(--ui-secondary)"/>
          <div class="ps-4 pr-1 pt-0 h-full w-full col-span-3">
            <div class="relative w-full h-full">
              <img src="@/assets/imgs/home/landing/card-women.webp" alt="landing-image"
                   class="object-cover max-w-full  absolute h-full right-0 bottom-0 max-h-full z-[1]"/>
            </div>
          </div>
        </div>
      </BaseWrapper>
      <!--   categories   -->
      <BaseSectionTitle title="categories" class="my-12"/>
      <HomeCategories/>

      <!--  TopCollections    -->
      <BaseSectionTitle title="top collections" />
      <HomeTopCollections />
      <!--  PreviewSection    -->
      <!--  BestSeller    -->
      <!--  Brands    -->
      <!--  Footer    -->
    </BaseWrapper>

  </BaseWrapper>
</template>

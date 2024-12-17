<template>
 <!-- header down in (md) -->
 <header
  class="main-shadow max-h-fit fixed bottom-0 left-0 z-40 w-full bg-white rounded-none t-ring backdrop-blur-md dark:bg-[#162031] md:top-0">
  <BaseWrapper
   class="header__wrapper flex max-h-16 h-16 grid-cols-1 items-center justify-between !px-0 md:!px-4 md:grid md:grid-cols-3 gap-6">
   <USkeleton class="w-12 hidden md:block dark:bg-gray-700 aspect-square rounded-full" />
   <USkeleton class="hidden md:block dark:bg-gray-700 min-w-4 h-2" />
   <div class="actions hidden md:flex justify-end gap-1">
    <USkeleton v-for="n in 5" class="dark:bg-gray-700 w-12 aspect-square rounded-full" />

   </div>
   <div class="group-btns w-full grid grid-cols-5 h-full gap-0 md:hidden">
    <template v-for="n in 5">
     <USkeleton class="w-full h-full dark:bg-gray-700 rounded-none border-l border-gray-400 dark:border-gray-800/90" />
    </template>
   </div>
  </BaseWrapper>
 </header>
</template>

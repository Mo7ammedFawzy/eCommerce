<template>
  <div class='w-full h-full rounded-lg ring-1 dark:ring-gray-100/10 ring-gray-300'>
    <USkeleton class="w-full  aspect-square"/>
    <div class="p-4">
      <USkeleton class="w-full h-2"/>
      <div class="flex my-2 items-center justify-between">
        <USkeleton class="w-12 h-4"/>
        <div class="flex">
          <USkeleton class="w-2.5 aspect-square rounded-full" v-for="_ in 3"/>
        </div>
      </div>
      <div class="flex items-center justify-between">
        <USkeleton class="w-20 h-4"/>
        <div class="flex gap-1">
          <USkeleton class="w-6 aspect-square rounded-lg" v-for="_ in 2"/>
        </div>
      </div>
    </div>
  </div>
</template>

<template>
  <main>
    <div
        class="rounded-md ui-ring w-full grid-cols-1 md:grid-cols-2 grid p-5 lg:p-8 bg-background gap-0">
      <div class=" max-h-72 md:max-h-96 p-6">
        <USkeleton class="h-full aspect-square w-full mx-auto"/>
      </div>
      <div class="space-y-5">
        <USkeleton class="w-full h-8"/>
        <USkeleton class="w-full h-6"/>
        <USkeleton class="w-2/3 h-4" v-for="_ in 3"/>
        <USkeleton class="w-2/4 h-8" v-for="_ in 2"/>
        <div class="btn-group grid grid-cols-2 gap-3">
          <USkeleton class="h-8" v-for="_ in 2"/>
        </div>
      </div>
    </div>
  </main>
</template>

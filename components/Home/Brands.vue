<script setup lang='ts'>


</script>

<template>
  <main id='brands' class=''>
    <BaseHeader title="brands" />

    <ClientOnly>
      <NuxtMarquee class="" pause-on-click auto-fill>
        <div class="brands__wrapper items-center grid grid-cols-8 max-w-4xl">
          <div class="brands__img w-full py-1 px-2.5" v-for="n in 8">
            <NuxtImg draggable="false"
              class="shadow-[0px_7px_10px_0px_rgba(0,0,0,0.08)] aspect-square w-full rounded-lg ring-1 ring-gray-300"
              :src="`/home/brands/${n}.webp`" />
          </div>
        </div>
      </NuxtMarquee>
    </ClientOnly>
  </main>
</template>
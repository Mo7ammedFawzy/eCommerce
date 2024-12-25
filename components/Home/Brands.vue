<script setup lang='ts'>


</script>

<template>
  <main id='brands' class=''>
    <BaseSectionHeader title="brands" />

    <ClientOnly>
      <NuxtMarquee class="" pause-on-click auto-fill>
        <div class="brands__wrapper items-center grid grid-cols-8 max-w-4xl">
          <div class="brands__img w-full py-1 px-2.5" v-for="n in 8">
            <NuxtImg draggable="false" class="main-shadow aspect-square w-full rounded-lg t-ring"
              :src="`/home/brands/${n}.webp`" quality="60" :alt="`img-${n}`" format="webp"
              placeholder-class="animate-pulse w-[92px] aspect-square max-w-full bg-gray-300 dark:bg-gray-800" placeholder
              loading="lazy" />
          </div>
        </div>
      </NuxtMarquee>
    </ClientOnly>
  </main>
</template>
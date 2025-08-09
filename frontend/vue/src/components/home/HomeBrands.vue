<script setup lang="ts">
import {Vue3Marquee} from 'vue3-marquee';
import CommonUtils from "@/utils/CommonUtils.ts";
</script>

<template>
  <main id="home-brands" class="max-w-4xl mx-auto">
    <BaseSectionHeader title="brands"/>
    <Vue3Marquee pause-on-click auto-fill pause-on-hover>
      <BaseWrapper class="ring-(--ui-ring) items-center grid grid-cols-8">
        <div class="w-full py-1 px-2.5" v-for="n in 8">
          <img draggable="false" class="main-shadow aspect-square w-full rounded-lg ring-(--ui-ring)"
               :src="CommonUtils.getImgUrl('/home/brands'+n+'.webp')" :alt="`img-${n}`" loading="lazy"/>
        </div>
      </BaseWrapper>
    </Vue3Marquee>
  </main>
</template>

<script setup lang="ts">
import BaseOverlay from "@/components/base/BaseOverlay.vue";
import useAnimations from "@/composables/useAnimations.ts";
import {SectionIds} from "@/utils/constants";

const {registerZoomInImgOnScrollListener, GScrollTo} = useAnimations();

registerZoomInImgOnScrollListener();
</script>
<template>
  <section :id="SectionIds.HomeLanding" ref="sectionHomeLandingRef">
    <BaseWrapper
        data-home-landing class="overflow-hidden h-screen relative flex items-center justify-center text-center" full-width>
      <img ref="imgRef"
           data-animate-landing-img
           class="absolute left-0 top-0 origin-top
          scale-180 min-w-full max-w-none min-h-full"
           src="@/assets/imgs/home/landing/test.jpg"
           alt="landing-img"/>
      <BaseOverlay/>
      <main class="relative text-white items-center flex-col mx-auto max-w-7xl">
        <div data-animate-once-in class="uppercase mb-6 text-left text-4xl md:!text-7xl lg:text-8xl sm:text-6xl
       font-extrabold leading-tight
       bg-gray-100 bg-clip-text text-transparent mix-blend-difference drop-shadow-lg">
          furniture for <br/> now or forever
        </div>
        <UButton data-animate-once-in label="view products" @click="GScrollTo('#'+SectionIds.HomeTopCollections)" variant="outline" size="xl"
                 leading-icon="solar:t-shirt-outline"
                 class="text-white px-8 border border-gray-300 hover:bg-white/10"/>
      </main>
    </BaseWrapper>
  </section>
</template>

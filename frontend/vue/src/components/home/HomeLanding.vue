<script setup lang="ts">
import {GScrollTo} from "@/composables/useAnimations.ts";
import {SectionIds} from "@/utils/constants";
import CommonUtils from "@/utils/CommonUtils.ts";
import BaseLandingImg from "@/components/base/BaseLandingImg.vue";
import BaseOverlay from "@/components/base/BaseOverlay.vue";

const imgUrl = CommonUtils.getImgUrl("/home/landing-2.jpg");

</script>
<template>
  <section :id="SectionIds.HomeLanding">
    <BaseWrapper
        data-home-landing class="overflow-hidden h-screen relative flex items-center justify-center text-center" full-width>
      <BaseLandingImg :imgUrl="imgUrl"/>
      <BaseOverlay/>
      <main class="relative text-white items-center flex-col mx-auto max-w-7xl overflow-hidden ">
        <div data-animate-once-in class="uppercase mb-6 text-left text-3xl xs:text-4xl sm:text-5xl md:text-7xl lg:text-8xl
       font-extrabold leading-tight
       bg-gray-100 bg-clip-text text-transparent mix-blend-difference drop-shadow-lg">
          Designed for now<br/> Crafted for forever
        </div>
        <UButton data-animate-once-in label="view products" @click="GScrollTo('#'+SectionIds.HomeTopCollections)" variant="outline" size="xl"
                 leading-icon="ant-design:product-outlined"
                 class="text-white px-8 border border-gray-300 hover:bg-white/10"/>
      </main>
    </BaseWrapper>
  </section>
</template>

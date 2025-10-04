<script setup lang="ts">
import {GScrollTo} from "@/composables/useAnimations.ts";
import {BASE_URL, SectionIds} from "@/utils/constants";
import CommonUtils from "@/utils/CommonUtils.ts";
import BaseLandingImg from "@/components/base/BaseLandingImg.vue";
import BaseOverlay from "@/components/base/BaseOverlay.vue";
import {useFetch} from "@vueuse/core";
import {watch} from "vue";

const imgUrl = CommonUtils.getImgUrl("/home/landing-2.jpg");

// let url = BASE_URL + "/products";
// const {data, isFetching} = useFetch(url, {refetch: true}).json()
//
//
// watch(isFetching, v => {
//   console.log(url, data) // works very well
// })
</script>
<template>
  <section :id="SectionIds.HomeLanding">
    <BaseWrapper
        data-home-landing class="overflow-hidden h-screen relative flex items-center justify-center text-center" full-width>
      <BaseLandingImg :imgUrl="imgUrl"/>
      <BaseOverlay/>
      <main class="relative text-white items-center flex-col mx-auto max-w-7xl overflow-hidden ">
        <div data-animate-once-in class="uppercase mb-6 text-left text-4xl md:!text-7xl lg:text-8xl sm:text-6xl
       font-extrabold leading-tight
       bg-gray-100 bg-clip-text text-transparent mix-blend-difference drop-shadow-lg">
          furniture for<br/> now or forever
        </div>
        <UButton data-animate-once-in label="view products" @click="GScrollTo('#'+SectionIds.HomeTopCollections)" variant="outline" size="xl"
                 leading-icon="ant-design:product-outlined"
                 class="text-white px-8 border border-gray-300 hover:bg-white/10"/>
      </main>
    </BaseWrapper>
  </section>
</template>

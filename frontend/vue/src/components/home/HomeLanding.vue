<script setup lang="ts">
import BaseOverlay from "@/components/base/BaseOverlay.vue";
import {GScrollTo} from "@/composables/useAnimations.ts";
import {landingImgLoadKey, SectionIds} from "@/utils/constants";
import {useEventBus, useImage} from "@vueuse/core";
import {watch} from "vue";
import CommonUtils from "@/utils/common.ts";

const imgUrl = CommonUtils.getImgUrl("/home/landing.jpg");
const {isLoading} = useImage({src: imgUrl})
const bus = useEventBus(landingImgLoadKey)

watch(isLoading, () => {
  console.log("check image state")
  if (isLoading.value)
    return
  console.log("image loaded")
  bus.emit();
})

</script>
<template>
  <section :id="SectionIds.HomeLanding">
    <BaseWrapper
        data-home-landing class="overflow-hidden h-screen relative flex items-center justify-center text-center" full-width>
      <img
          data-animate-landing-img
          class="absolute left-0 top-0 origin-center min-w-full max-w-none min-h-full"
          :src="imgUrl"
          alt="landing-img"/>
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

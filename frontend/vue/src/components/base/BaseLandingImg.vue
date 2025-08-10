<script setup lang="ts">
import {useEventBus, useImage} from "@vueuse/core";
import {landingImgLoadKey} from "@/utils/constants";
import {ref, watch} from "vue";

const props = defineProps<{ imgUrl?: string }>()
const canLoadImg = ref(false);

if (!props.imgUrl)
  canLoadImg.value = true;

const {isLoading} = useImage({src: props.imgUrl ?? ''})
const bus = useEventBus(landingImgLoadKey)

watch(isLoading, () => {
  console.log("check image state")
  if (isLoading.value)
    return
  console.log("image loaded")
  canLoadImg.value = true;
})

watch(canLoadImg, () => {
  bus.emit();
})

</script>
<template>
  <slot v-if="$slots.default"/>
  <img
      v-else
      data-animate-landing-img
      class="absolute left-0 top-0 origin-center min-w-full max-w-none min-h-full -z-10"
      :src="imgUrl"
      alt="landing-img"/>
</template>

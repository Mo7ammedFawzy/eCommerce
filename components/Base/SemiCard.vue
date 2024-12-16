<script setup lang="ts">
import type { SemiCard } from "~/types";
type Color = {
  shape: string;
  bg: string;
  name: string;
  btn: string[];
};

// const { $viewport } = useNuxtApp();

// title,subtitle,text,btns,img,shape

const {
  item: props,
  double = false,
  name,
} = defineProps<{
  item: SemiCard;
  double?: boolean;
  name: string;
}>();
const { title, subTitle, text, btns, img } = props;

// colors first
const blueColor = "bg-main-400 hover:!bg-main-500";
const purpleColor = "!bg-[#f55da4] hover:!bg-[#ef458f]";

const colors: Color[] = [
  {
    name: "landing",
    shape: "!bg-[#FBCA66]",
    bg: "bg-[#F6E5BE] dark:bg-[#393736]",
    btn: [blueColor, purpleColor],
  },
  {
    shape: "!bg-[#26C196]",
    bg: "bg-[#CAECE5] dark:bg-[#143940]",
    name: "brand",
    btn: ["!bg-[#26C196] hover:!bg-[#148769]"],
  },
  {
    bg: "bg-[#A4D0FB] dark:bg-[#0A3566]",
    shape: "!bg-[#007EFC]",
    name: "men",
    btn: [blueColor],
  },
  {
    bg: "bg-[#F6D3E5] dark:bg-[#5B2C50]",
    shape: "!bg-[#F55DA4]",
    name: "women",
    btn: [purpleColor],
  },
];

const cardColors = computed(() => {
  return colors.find((el) => el.name === name) ?? colors[0];
});
</script>
<!--  -->
<template>
  <div class="semi-card w-full overflow-hidden" :class="[
    !double
      ? 'min-h-96'
      : 'rounded-lg t-ring',
    cardColors.bg,
  ]">
    <div class="semi-card__wrapper grid h-full" has-wrapper :class="[
      !double
        ? 'grid-cols-7 lg:grid-cols-2'
        : 'grid-cols-7 pr-0 lg:grid-cols-2',
    ]">
      <div class="semi-card__left--content z-[1] col-span-6 flex flex-col justify-center space-y-2 lg:col-span-1"
        :class="[!double ? 'p-6' : 'px-3 py-4 lg:p-6']">
        <!-- :class="[double?'':'']" -->
        <!-- title -->
        <div v-text="title" class="font-black capitalize" :class="[
          !double
            ? 'text-3xl sm:text-4xl md:text-5xl'
            : 'text-xl lg:text-2xl',
        ]" />
        <!-- subtitle -->
        <div name="subtitle" v-if="double" class="text-base sm:text-lg" v-html="subTitle" />
        <!-- text -->
        <p name="text" class="text-sm sm:text-base" :class="[{ '!text-xs sm:text-base': double }]" v-text="text" />
        <!-- btns -->
        <div class="btns--btns-group">
          <div class="btns__wrapper mt-3 flex items-center gap-2">
            <template v-for="({ title }, index) in btns">
              <!-- color="primary" -->
              <UButton variant="solid" :class="cardColors.btn[index]" class="px-4 capitalize dark:text-white" size="lg">{{
                title }}</UButton>
            </template>
          </div>
        </div>
      </div>
      <div class="semi-card__right--img col-span-1 lg:col-span-1 lg:overflow-hidden" :class="[!double ? '' : '']">
        <div class="h-full w-full" :class="[double ? '' : 'lg:pl-8 lg:pt-8']">
          <div class="semi-card__img--wrapper relative h-full w-full">
            <!-- img -->
            <NuxtImg :src="`/home/${img}.webp`"
              class="absolute left-0 top-0 z-[1] hidden h-full w-full object-bottom lg:block"
              :class="[double ? 'object-contain' : 'object-contain']" quality="60" :alt="cardColors.name" format="webp"
              :placeholder="`/home/${img}.webp`" loading="lazy" />
            <!-- shape -->
            <BaseCircle :class="cardColors.shape" v-if="!double"
              class="left-0 top-1/2 z-[0] h-full w-auto -translate-y-1/2 lg:left-1/2 lg:right-auto lg:top-0 lg:h-auto lg:w-full lg:-translate-x-1/2 lg:translate-y-[10%]" />
            <BaseCircle v-else :class="cardColors.shape"
              class="top-1/2 z-[0] aspect-square h-full w-auto -translate-y-1/2 rounded-r-none lg:right-0 lg:top-1/2 lg:w-full" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

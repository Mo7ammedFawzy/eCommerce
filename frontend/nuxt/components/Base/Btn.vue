<script setup lang="ts">

import type { HeaderAction } from "~/types";

const { $viewport } = useNuxtApp();
const TRoute = useRoute();

const attr = ({
  isMenu = false,
  isPopover = false,
}: Partial<Pick<HeaderAction, "isMenu" | "isPopover">>) =>
  (isMenu || isPopover) && $viewport.isGreaterOrEquals("tablet") ? "" : "to";

const props = defineProps<{ btnOptions: HeaderAction; isMenuOpen?: boolean, cartLength?: number }>();
props.btnOptions.icon = props.btnOptions.icon ?? "mdi-home";

const { icon, route, label, color, hasChip, isMenu, mobile, isPopover } =
  props.btnOptions;

const isActiveInSameRoute = computed(() => TRoute.path === route)

</script>

<template>
  <UButton v-bind:[attr({isMenu,isPopover})]="route" size="lg" square color="gray"
    class="relative flex h-full items-center justify-center rounded-none text-black/70 transition-colors hover:bg-black/10 dark:hover:bg-white/10 md:h-auto md:rounded-full"
    :class="{
      'flex md:hidden': mobile,
      'hidden md:flex': mobile === false,
      'bg-black/10 dark:bg-white/10': isMenuOpen || isActiveInSameRoute,
    }" variant="ghost">
    <span class="absolute left-0 top-0 block h-full w-full rounded-none md:hidden md:rounded-full"
      :class="{ '!bg-blue-600 !text-white': TRoute.path === route }" />

    <UChip :show="hasChip === true" :color="color" class="" :ui="{ base: 'dark:text-white' }" :text="cartLength ?? 2"
      size="2xl">
      <div class="btn-content flex flex-col items-center justify-center" :class="{
        'text-white dark:text-white/70 md:text-black/70':
          TRoute.path === route,
      }">
        <UIcon :name="icon" size="20" :class="{ 'mr-[1px] mt-[1px]': hasChip === true }" />
        <span v-text="label" class="text-[10px] capitalize md:hidden" />
      </div>
    </UChip>
  </UButton>
</template>

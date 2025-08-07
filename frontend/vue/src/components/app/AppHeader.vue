<script setup lang="ts">
import Logo from "@/components/Logo.vue";
import {breakpointsTailwind, MaybeRefOrGetter, useBreakpoints, useColorMode, useDark, useToggle} from "@vueuse/core";
import {computed, ref, toValue, useTemplateRef, watch} from "vue";
import type {Base, Route} from "@/types";
import {useRoute} from "vue-router";
import {Categories} from "@/utils/constants";

interface HeaderLink extends Base {
  route: Route
}

interface HeaderAction {
  label?: string,
  icon: MaybeRefOrGetter<string>
  route?: MaybeRefOrGetter<string | undefined>
  slot?: string
  onClick?: () => void
  canShow?: MaybeRefOrGetter<boolean>,
  badgeNumber?: MaybeRefOrGetter<number>
}

const headerRef = useTemplateRef<HTMLHeadElement>("headerRef")
const colorMode = useColorMode();
const isDark = useDark();
const route = useRoute();
const breakpoints = useBreakpoints({
  ...breakpointsTailwind,
  md: 900
});
const isMDScreen = ref(breakpoints.isGreaterOrEqual("md"));

watch(breakpoints.current(), (currentValue) => {
  isMDScreen.value = currentValue.includes("md");
})

const isMobileBreakpoint = computed(() => breakpoints.smallerOrEqual("md").value)

const headerLinks: HeaderLink[] = [
  {label: 'home', route: "/"},
  {label: 'products', route: '/products'},
  {label: Categories.ELECTRONICS, route: "/products?category=electronics"},
  {label: Categories.CLOTHING, route: "/products?category=clothing"},
  {label: Categories.BOOKS, route: "/products?category=books"},
]
const badgeNumber = ref(2);
const profileMenuModel = ref(false)

const headerActions = ref<HeaderAction[]>(
    [
      {
        label: 'home',
        icon: 'iconamoon:home',
        route: '/',
        canShow: isMobileBreakpoint,
      },
      {
        label: 'search',
        icon: 'flowbite:search-outline',
        route: computed(() => {
          if (!isMobileBreakpoint.value)
            return undefined;
          else
            return '/search';
        }),
        onClick() {
          if (isMobileBreakpoint.value)
            return;
          console.log('show search dialog')
        }
      },
      {
        label: 'products',
        icon: 'mynaui:store',
        route: '/products',
        canShow: isMobileBreakpoint,
      },
      {
        label: 'cart',
        icon: 'streamline:shopping-bag-hand-bag-2',
        route: '/cart',
        badgeNumber
      },
      {
        label: 'user',
        icon: 'si:user-line',
        route: computed(() => {
          if (!isMobileBreakpoint.value)
            return undefined;
          else
            return '/profile';
        }),
        onClick() {
          if (isMobileBreakpoint.value)
            return;
          profileMenuModel.value = true;
        }
      },
      {
        slot: 'colorMode',
        icon: computed(() => `material-symbols-light:${colorMode.value}-mode-outline-rounded`),
        onClick: () => toggleDarkMode(),
        canShow: breakpoints.greater("md"),
      },
    ]
);

function toggleDarkMode() {
  useToggle(isDark)();
}

function isProfileAction(action: HeaderAction) {
  return action.label === "user";
}

function canShowHeaderActionButton(action: HeaderAction) {
  return action.canShow ?? true;
}

const profileBtnIsActive = computed<(action: HeaderAction) => boolean>(
    () => (action) => profileMenuModel.value && isProfileAction(action)
)

</script>

<template>
  <header
      id="app-header"
      ref="headerRef"
      class="fixed overflow-hidden translate-y-[calc(var(--header-height)+var(--spacing)*8)] md:translate-y-0 bottom-0 md:top-0 origin-bottom md:origin-top left-0 h-fit z-40 max-h-fit w-full
    bg-background md:ui-ring backdrop-blur-md">
    <BaseWrapper full-width class="flex md:py-1.5 h-(--header-height) items-center justify-between !px-0 md:!px-4 overflow-hidden">
      <Logo class="hidden md:block" data-animate-one-time/>
      <!-- LINKS -->
      <ul class="hidden items-center justify-center gap-3 text-sm capitalize md:inline-flex overflow-hidden">
        <RouterLink data-animate-one-time :aria-checked="route.fullPath==link.route || undefined" v-for="link in headerLinks" :to="link.route"
                    class="hover:!text-primary aria-checked:text-primary" v-text="link.label">
        </RouterLink>
      </ul>
      <!-- ACTIONS -->
      <div class="flex items-center w-full md:w-fit md:gap-1 h-full md:h-fit">
        <template v-for="action in headerActions">
            <UButton
                v-if="canShowHeaderActionButton(action)"
                :to="toValue(action.route)"
                variant="ghost"
                data-animate-one-time
                size="xl"
                @click="action.onClick"
                square
                :class="{'bg-black/10 dark:bg-white/15':profileBtnIsActive(action)}"
                class="rounded-none w-full h-full md:rounded-full flex-1 cursor-pointer transition-colors hover:bg-black/10 dark:hover:bg-white/10 dark:[&>*]:text-white"
                color="neutral"
                active-class="bg-primary [&>*]:text-white">
              <AppHeaderProfileMenu v-model="profileMenuModel" v-if="isProfileAction(action)"/>
              <UChip
                  size="xl"
                  :show="Boolean(action.badgeNumber)"
                  :text="toValue(action.badgeNumber)"
                  :ui="{base:'dark:text-white min-h-0 px-0.5 py-1.5'}"
                  class="flex flex-col mx-auto">
                <UIcon
                    class="text-xl md:text-md"
                    :name="toValue(action.icon)"/>
                <span v-if="isMobileBreakpoint" v-text="action.label" class="dark:text-white text-xs font-normal capitalize mt-0.5"/>
              </UChip>
            </UButton>
        </template>
      </div>
    </BaseWrapper>
  </header>
</template>
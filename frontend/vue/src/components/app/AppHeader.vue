<script setup lang="ts">
import Logo from "@/components/Logo.vue";
import {breakpointsTailwind, MaybeRefOrGetter, useBreakpoints, useColorMode, useDark, useDebounceFn, useEventListener, useToggle} from "@vueuse/core";
import {computed, nextTick, onMounted, ref, toValue, useTemplateRef, watch} from "vue";
import type {Base, Route} from "@/types";
import {useRoute} from "vue-router";
import {gsap} from "gsap";
import useAnimations from "@/composables/useAnimations.ts";

/**
 * onMounted showHeader
 * horizontalScroll
 *  - if isMDScreen => setHeaderCoordinate relate to top then show it else bottom
 *  -
 * verticalScroll
 */

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

const {showHeader, hideHeader} = useAnimations();
const headerRef = useTemplateRef<HTMLHeadElement>("headerRef")
const colorMode = useColorMode();
const isDark = useDark();
const route = useRoute();
const breakpoints = useBreakpoints({
  ...breakpointsTailwind,
  md: 900
});
const isMDScreen = ref(breakpoints.isGreaterOrEqual("md"));
const canShowHeader = ref(false)
let removeScrollListener: (() => void) | null = null;
let stopWatcher: (() => void) | null = null;

watch(breakpoints.current(), (currentValue) => {
  isMDScreen.value = currentValue.includes("md");
})

watch(isMDScreen, resetHeaderCoordinatesAndShow)

const isMobileBreakpoint = computed(() => breakpoints.smallerOrEqual("md").value)

const headerLinks: HeaderLink[] = [
  {label: 'home', route: "/"},
  {label: 'products', route: '/products'},
  {label: 'men', route: "/products?category=men's clothing"},
  {label: 'women', route: "/products?category=women's clothing"},
  {label: 'electronics', route: "/products?category=electronics"},
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


function resetHeaderCoordinatesAndShow() {
  let coordinates: GSAPTweenVars = {
    padding: "16px 0"
  }
  if (breakpoints.isGreaterOrEqual("md"))
    coordinates = {
      top: 0,
      bottom: 'auto',
      y: -100,
    };
  else
    coordinates = {
      bottom: 0,
      top: 'auto',
      y: 100
    };
  gsap.set(headerRef.value, coordinates);
  useDebounceFn(() => {
    showHeader()
  }, 500)();
}

function hasScrolled() {
  return window.scrollY >= 10;
}

function isHeaderVisible() {
  return headerRef.value?.style.height.includes("64");
}

function setupHeaderControl() {
  canShowHeader.value = hasScrolled();
  const watcher = watch(canShowHeader, (canShowHeaderValue) => {
    if (canShowHeaderValue) {
      if (!isHeaderVisible())
        showHeader();
    } else
      hideHeader();
  }, {immediate: true})
  const cleanupListener = useEventListener(window, "scroll", useDebounceFn(() => {
    canShowHeader.value = hasScrolled();
  }, 250))

  removeScrollListener = () => cleanupListener();
  stopWatcher = () => watcher();
}

onMounted(async () => {
  await nextTick();
  await useDebounceFn(() => {
    showHeader()
  }, 1500)();
})

// useResizeObserver(document.documentElement, useDebounceFn(() => {
//   resetHeaderCoordinates();
// }, 250))

function cleanupHeaderControl() {
  removeScrollListener?.();
  stopWatcher?.();
}

// watch(() => route.name, useDebounceFn((routeName) => {
//   if (!routeName)
//     return;
//   else if (routeName === RouterNames.HOME)
//     setupHeaderControl();
//   else
//     cleanupHeaderControl();
// }, 500), {immediate: true})
</script>

<template>
  <header
      id="app-header"
      ref="headerRef"
      class="fixed overflow-hidden py-4 opacity-0 translate-y-(--header-height) md:-translate-y-(--header-height) bottom-0 md:top-0 origin-bottom md:origin-top left-0 h-fit z-40 max-h-fit w-full
    bg-background ui-ring backdrop-blur-md">
    <BaseWrapper full-width class="flex md:py-1.5 h-(--header-height) items-center justify-between !px-0 md:!px-4">
      <Logo class="hidden md:block"/>
      <!-- LINKS -->
      <ul class="hidden items-center justify-center gap-3 text-sm capitalize md:inline-flex">
        <RouterLink :aria-checked="route.fullPath==link.route" v-for="link in headerLinks" :to="link.route"
                    class="hover:!text-primary-600 aria-checked:text-primary-500">
          <span v-text="link.label"/>
        </RouterLink>
      </ul>
      <!-- ACTIONS -->
      <div class="flex items-center w-full md:w-fit md:gap-1 h-full md:h-fit">
        <template v-for="action in headerActions">
          <UChip
              size="xl"
              :show="Boolean(action.badgeNumber)"
              :text="toValue(action.badgeNumber)"
              :ui="{base:'dark:text-white min-h-0 px-0.5 py-1.5'}"
              inset
              class="flex flex-col mx-auto">
            <UButton
                :to="toValue(action.route)"
                variant="ghost"
                size="xl"
                square
                :class="{'bg-black/10 dark:bg-white/15 ':profileBtnIsActive(action)}"
                class="rounded-none md:rounded-full h-full flex-1 cursor-pointer transition-colors hover:bg-black/10 dark:hover:bg-white/10 dark:[&>*]:text-white"
                @click="action.onClick"
                color="neutral"
                active-class="bg-primary-600 hover:!bg-primary-700 [&>*]:text-white"
                v-if="canShowHeaderActionButton(action)">
              <AppHeaderProfileMenu v-model="profileMenuModel" v-if="isProfileAction(action)"/>
              <div class="flex flex-col items-center justify-center">
                <UIcon
                    class="text-xl md:text-md"
                    :name="toValue(action.icon)"/>
                <span v-if="isMobileBreakpoint" v-text="action.label" class="dark:text-white text-xs font-normal capitalize mt-0.5"/></div>
            </UButton>
          </UChip>
        </template>
      </div>
    </BaseWrapper>
  </header>
</template>
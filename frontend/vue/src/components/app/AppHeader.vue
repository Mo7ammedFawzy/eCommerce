<script setup lang="ts">
import Logo from "@/components/Logo.vue";
import {MaybeRefOrGetter, useBreakpoints, useColorMode, useDark, useToggle} from "@vueuse/core";
import {computed, ref, toValue} from "vue";
import type {Base, Route} from "@/types";
import {useRoute} from "vue-router";

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

const colorMode = useColorMode();
const isDark = useDark();
const route = useRoute();
const breakpoints = useBreakpoints({
  md: 900
});

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
</script>

<template>
  <header
      class="fixed h-fit bottom-0 left-0 z-40 w-full bg-white ring-1 dark:ring-white/10 ring-black/20 backdrop-blur-md dark:bg-[#162031] md:top-0">
    <BaseWrapper full-width
        class="flex md:py-1.5 h-(--header-height) items-center justify-between !px-0 md:!px-4">
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
            <UChip
                size="xl"
                :show="Boolean(action.badgeNumber)"
                :text="toValue(action.badgeNumber)"
                :ui="{base:'dark:text-white min-h-0 px-0.5 py-1.5'}"
                position="top-right"
                class="flex flex-col mx-auto">
              <UIcon
                  class="text-xl md:text-md"
                  :name="toValue(action.icon)"/>
              <span v-if="isMobileBreakpoint" v-text="action.label" class="text-xs font-normal capitalize mt-0.5"/>
            </UChip>
          </UButton>
        </template>
      </div>
    </BaseWrapper>
  </header>
</template>
<script setup lang="ts">
import Logo from "@/components/Logo.vue";
import {breakpointsTailwind, MaybeRefOrGetter, useBreakpoints, useColorMode, useDark, useToggle} from "@vueuse/core";
import {computed, Ref, ref, toValue} from "vue";
import type {Base, Route} from "@/types";

interface HeaderLink extends Base {
  route: Route
  category?: string
}

interface HeaderAction {
  label?: string,
  icon: MaybeRefOrGetter<string>
  route?: string
  slot?: string
  onClick?: () => void
  canShow?: MaybeRefOrGetter<boolean>,
  badgeNumber?: Ref<number>
}

const colorMode = useColorMode();
const isDark = useDark();
const breakpoints = useBreakpoints(breakpointsTailwind);

const headerLinks: HeaderLink[] = [
  {label: 'home', route: '/'},
  {label: 'products', route: '/products'},
  {label: 'men', route: '/products', category: "men's clothing"},
  {label: 'women', route: '/products', category: "women's clothing"},
  {label: 'electronics', route: '/products', category: 'electronics'},
]

const make = (action: HeaderAction): HeaderAction => ({...action, canShow: action.canShow ?? true})

function toggleDarkMode() {
  useToggle(isDark)();
}

const badgeNumber = ref(2);

const headerActions = ref<HeaderAction[]>(
    [
      make({
        label: 'home',
        icon: 'iconamoon:home-thin',
        route: '/',
        canShow: breakpoints.smallerOrEqual('md'),
      }),
      make({
        label: 'search',
        icon: 'material-symbols-light:search',
        route: '/search',
      }),
      make({
        label: 'products',
        icon: 'mynaui:store',
        route: '/products',
        canShow: breakpoints.smallerOrEqual('md'),
      }),
      make({
        label: 'cart',
        icon: 'streamline:shopping-bag-hand-bag-2',
        route: '/cart',
        badgeNumber
      }),
      make({
        label: 'user',
        icon: 'material-symbols-light:person-outline',
        route: '/profile',
      }),
      make({
        slot: 'colorMode',
        icon: computed(() => `material-symbols-light:${colorMode.value}-mode-outline-rounded`),
        onClick: () => toggleDarkMode(),
        canShow: breakpoints.greater("md"),
      }),
    ]
);

</script>

<template>
  <header
      class="max-h-fit fixed bottom-0 left-0 z-40 w-full bg-white ring-1 dark:ring-white/10 ring-black/20 backdrop-blur-md dark:bg-[#162031] md:top-0">
    <BaseWrapper
        class="flex max-h-16 h-16 items-center justify-between !px-0 md:!px-4">
      <Logo class="hidden md:block"/>
      <!-- LINKS -->
      <ul class="hidden items-center justify-center gap-3 text-sm capitalize md:inline-flex">
        <RouterLink v-for="{ label,route } in headerLinks" :to="route" active-class="text-primary-500" class="hover:text-primary-500">
          <span v-text="label"/>
        </RouterLink>
      </ul>
      <!-- ACTIONS -->
      <div class="flex items-center w-full md:w-fit md:gap-1 h-full md:h-fit">
        <template v-for="btn in headerActions">
          <UButton
              :to="btn.route"
              variant="ghost"
              size="xl"
              square
              class="rounded-none md:rounded-full h-full flex-1 cursor-pointer transition-colors hover:bg-black/10 dark:hover:bg-white/10 dark:[&>*]:text-white"
              @click="btn.onClick"
              active-class="bg-primary-600"
              v-if="btn.canShow">
            <UChip
                size="xl"
                :show="Boolean(btn.badgeNumber)"
                :text="btn.badgeNumber"
                :ui="{base:'dark:text-white min-h-0 px-0.5 py-1.5'}"
                position="top-right"
                class="flex flex-col mx-auto">
              <UIcon
                  class="text-xl md:text-md"
                  :name="toValue(btn.icon)"/>
              <span v-if="breakpoints.smallerOrEqual('md').value" v-text="btn.label" class="text-xs font-normal capitalize mt-0.5"/>
            </UChip>
          </UButton>
        </template>
      </div>
    </BaseWrapper>
  </header>
</template>
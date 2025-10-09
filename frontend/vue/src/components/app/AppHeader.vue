<script setup lang="ts">
import Logo from "@/components/Logo.vue";
import {MaybeRefOrGetter, useColorMode, useDark, useToggle} from "@vueuse/core";
import {computed, inject, ref, toValue, useTemplateRef} from "vue";
import {Base} from "@/types/common.ts";
import {useRoute, useRouter} from "vue-router";
import {appSearchDialogModelKey, Categories} from "@/utils/constants";
import {GlobalIcons} from "@/utils/constants/GlobalIcons.ts";
import {useCartStore} from "@/store/cart.ts";
import ObjectChecker from "@/utils/ObjectChecker.ts";
import {RouterNames} from "@/router/routerNames.ts";
import {useUIBreakpoints} from "@/composables/useUIBreakpoints.ts";

interface HeaderLink extends Base {
  routeName: `${RouterNames}`,
  query?: {
    category?: `${Categories}`
  }
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
const router = useRouter();
const {isMobileScreen, breakpoints} = useUIBreakpoints()

const headerLinks: HeaderLink[] = [
  {label: RouterNames.HOME, routeName: RouterNames.HOME},
  {label: RouterNames.PRODUCTS, routeName: RouterNames.PRODUCTS},
  {
    label: Categories.ELECTRONICS,
    routeName: RouterNames.PRODUCTS, query: {category: Categories.ELECTRONICS}
  },
  {
    label: Categories.CLOTHING,
    routeName: RouterNames.PRODUCTS, query: {category: Categories.CLOTHING}
  },
  {
    label: Categories.BOOKS, routeName: RouterNames.PRODUCTS, query: {category: Categories.BOOKS}
  },
]
const profileMenuModel = ref(false)
const appSearchDialogModel = inject(appSearchDialogModelKey, ref(false))

const headerActions = ref<HeaderAction[]>(
    [
      {
        label: 'home',
        icon: GlobalIcons.HOME,
        route: '/',
        canShow: isMobileScreen,
      },
      {
        label: 'search',
        icon: GlobalIcons.SEARCH,
        onClick() {
          appSearchDialogModel.value = true;
        }
      },
      {
        label: 'products',
        icon: GlobalIcons.PRODUCTS,
        route: '/products',
        canShow: isMobileScreen,
      },
      {
        label: 'cart',
        icon: GlobalIcons.CART,
        route: '/cart',
        badgeNumber: computed(() => useCartStore().getCartLength)
      },
      {
        label: 'user',
        icon: GlobalIcons.PROFILE,
        route: computed(() => {
          if (!isMobileScreen.value)
            return undefined;
          else
            return '/profile';
        }),
        onClick() {
          if (isMobileScreen.value)
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

const headerLinkIsActive = computed(() => (link: HeaderLink) => {
  if (route.name == RouterNames.HOME && route.name == link.routeName)
    return true;
  else if (route.name === RouterNames.PRODUCTS) {
    if ('category' in route.query)
      return link.query?.category === route.query.category
    else if (RouterNames.PRODUCTS == link.label)
      return true;
  }
  else
    return false;
})


function toProductsPage(event: MouseEvent, link: HeaderLink) {
  if (!link.query)
    return;
  event.preventDefault();
  router.push({
    name: RouterNames.PRODUCTS,
    query: {
      ...route.query,
      category: link.query.category
    }
  })
}
</script>

<template>
  <header
      id="app-header"
      ref="headerRef"
      class="ring-1 dark:ring-slate-700 ring-slate-600/20 fixed overflow-hidden translate-y-[calc(var(--header-height)+var(--spacing)*9)] md:-translate-y-[calc(var(--header-height)+var(--spacing)*9)] bottom-0 md:top-0 origin-bottom md:origin-top left-0 h-fit z-40 max-h-fit w-full
    bg-background md:ui-ring backdrop-blur-md">
    <BaseWrapper full-width class="flex md:py-1.5 h-(--header-height) items-center justify-between !px-0 md:!px-4 overflow-hidden">
      <Logo class="hidden md:block"/>
      <!-- LINKS -->
      <ul class="hidden items-center justify-center gap-3 text-sm capitalize md:inline-flex overflow-hidden">
        <RouterLink
            v-text="link.label"
            v-for="link in headerLinks" :to="{name:link.routeName,query:(link.query??{})}"
            :aria-checked="headerLinkIsActive(link)"
            @click="toProductsPage($event,link)"
            class="hover:!text-primary aria-checked:text-primary dark:aria-checked:text-blue-ribbon-400"/>
      </ul>
      <!-- ACTIONS -->
      <div class="flex items-center w-full md:w-fit md:gap-1 h-full md:h-fit">
        <template v-for="action in headerActions">
          <UButton
              v-if="canShowHeaderActionButton(action)"
              :to="toValue(action.route)"
              variant="ghost"
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
                :show="ObjectChecker.isNumber(action.badgeNumber)"
                :text="toValue(action.badgeNumber)"
                :ui="{base:'dark:text-white min-h-0 px-0.5 py-1.5'}"
                class="flex flex-col mx-auto">
              <UIcon
                  class="text-xl md:text-md"
                  :name="toValue(action.icon)"/>
              <span v-if="isMobileScreen" v-text="action.label" class="dark:text-white text-xs font-normal capitalize mt-0.5"/>
            </UChip>
          </UButton>
        </template>
      </div>
    </BaseWrapper>
  </header>
</template>
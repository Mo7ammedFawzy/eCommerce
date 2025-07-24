<script setup lang="ts">
/**
 * @abstract===HeaederApp bottom-0 md:top-0 md:bottom-auto
 * @wrapper {logo,links,btns}
 */
import {HEADER_ACTIONS, HEADER_LINKS} from "~/constants";

const { $viewport } = useNuxtApp();
const route = useRoute();
const colorMode = useColorMode()
const store = useCartStore()

const modal = ref(false);
const queryOptions = computed(() => (category?: string) => category ? { category } : {})

const canShowUserBtns = computed(() => !useUserStore().hasDashboardAccess)
</script>
<template>
  <!-- header down in (md:768px) -->
  <header
    class="main-shadow max-h-fit fixed bottom-0 left-0 z-40 w-full bg-white rounded-none t-ring backdrop-blur-md dark:bg-[#162031] md:top-0">
    <BaseWrapper
        class="flex md:py-1.5 h-(--header-height) items-center justify-between !px-0 md:!px-4">
      <!-- LOGO@on-page-color-mode-switch-change-image -->
      <ColorScheme tag="span" class="w-12 aspect-square t-skeleton hidden md:inline-flex items-center justify-center rounded-full" placeholder="...">
        <NuxtLink class="max-h-full hidden md:inline-block" to="/">
          <NuxtImg :src="`/logo-${colorMode.value}.webp`" class="w-12 aspect-square" quality="60" alt="`commerce-logo`"
                   format="webp" placeholder-class="animate-pulse !h-full max-h-full rounded-full aspect-square bg-gray-300 dark:bg-gray-800"
            placeholder loading="lazy" />
        </NuxtLink>
      </ColorScheme>
      <!-- LINKS -->
      <ul class="hidden items-center justify-center gap-3 text-sm capitalize md:inline-flex" v-if="canShowUserBtns">
        <NuxtLink v-for="({ label, to, category }) in HEADER_LINKS" :to="{ path: to, query: queryOptions(category) }">
          <!-- {{ category }} -->
          <li v-text="label" class="cursor-pointer transition-colors hover:text-blue-600" :class="{
            'text-blue-600':
              route.path == to && route.query.category == category,
          }" />
        </NuxtLink>
      </ul>
      <!-- ACTIONS 01140621100 -->
      <div
        class="actions grid h-full w-full grid-cols-5 items-center justify-between md:!flex md:w-auto md:justify-end md:gap-1">
        <template v-for="btnOptions in HEADER_ACTIONS">
          <HeaderProfileMenuBtn v-if="btnOptions.isMenu && $viewport.isGreaterOrEquals('tablet')" v-slot="{ isMenuOpen }">
            <!-- PROFILE_MENU -->
            <BaseBtn :btn-options="btnOptions" :is-menu-open="isMenuOpen" />
          </HeaderProfileMenuBtn>
          <!-- SEARCH_MODEL -->
          <template v-if="canShowUserBtns">
            <HeaderSearchModalBtn v-if="btnOptions.isPopover && $viewport.isGreaterOrEquals('tablet')
            " v-model="modal">
              <BaseBtn :btn-options="btnOptions" @click="modal = !modal"/>
            </HeaderSearchModalBtn>
            <!-- OTHER_BTNS -->
            <BaseBtn :btn-options="btnOptions" v-else
                     v-bind="btnOptions.hasChip && btnOptions.label === 'cart' ? { 'cart-length': store.getCartLength } : {}"/>
            <!--      TODO:: NotificationBtn      -->
          </template>
        </template>
        <!-- colorModeSwitcher -->
        <AppColorModeSwitcher />
      </div>
    </BaseWrapper>
  </header>
</template>

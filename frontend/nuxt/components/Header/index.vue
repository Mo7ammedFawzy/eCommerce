<script setup lang="ts">
/**
 * @abstract===HeaederApp bottom-0 md:top-0 md:bottom-auto
 * @wrapper {logo,links,btns} 
 */
import { HEADER_LINKS, HEADER_ACTIONS } from "~/constants";

const { $viewport } = useNuxtApp();
const TRoute = useRoute();
const colorMode = useColorMode()
const store = useCartStore()

const modal = ref(false);
const queryOptions = computed(() => (category?: string) => category ? { category } : {})

</script>
<template>
  <!-- header down in (md:768px) -->
  <header
    class="main-shadow max-h-fit fixed bottom-0 left-0 z-40 w-full bg-white rounded-none t-ring backdrop-blur-md dark:bg-[#162031] md:top-0">

    <BaseWrapper
      class="header__wrapper flex max-h-16 h-16 grid-cols-1 items-center justify-between !px-0 md:!px-4 lg:grid lg:grid-cols-3">
      <!-- LOGO@on-page-color-mode-switch-change-image -->
      <ColorScheme tag="span" class="w-12 aspect-square t-skeleton hidden md:inline-block  rounded-full">
        <NuxtLink class="header__img max-h-full hidden md:inline-block" to="/frontend/public">
          <NuxtImg :src="`/logo-${colorMode.value}.webp`" class=" w-12 aspect-square " quality="60" alt="`commerce-logo`"
            format="webp" placeholder-class="animate-pulse  rounded-full w-12 aspect-square  bg-gray-300 dark:bg-gray-800"
            placeholder loading="lazy" />
        </NuxtLink>
      </ColorScheme>
      <!-- LINKS -->
      <ul class="links hidden items-center justify-center gap-3 text-sm capitalize md:inline-flex">
        <NuxtLink v-for="{ title, route, category } in HEADER_LINKS" :to="{ path: route, query: queryOptions(category) }">
          <!-- {{ category }} -->
          <li v-text="title" class="cursor-pointer transition-colors hover:text-blue-600" :class="{
            'text-blue-600':
              TRoute.path == route && TRoute.query.category == category,
          }" />
        </NuxtLink>
      </ul>
      <!-- ACTIONS -->
      <div
        class="actions grid h-full w-full grid-cols-5 items-center justify-between md:!flex md:w-auto md:justify-end md:gap-1">
        <template v-for="btnOptions in HEADER_ACTIONS">
          <HeaderProfileMenuBtn v-if="btnOptions.isMenu && $viewport.isGreaterOrEquals('tablet')" v-slot="{ isMenuOpen }">
            <!-- PROFILE_MENU -->
            <BaseBtn :btn-options="btnOptions" :is-menu-open="isMenuOpen" />
          </HeaderProfileMenuBtn>
          <!-- SEARCH_MODEL -->
          <HeaderSearchModalBtn v-else-if="btnOptions.isPopover && $viewport.isGreaterOrEquals('tablet')
            " v-model="modal">
            <BaseBtn :btn-options="btnOptions" @click="modal = !modal" />
          </HeaderSearchModalBtn>
          <!-- OTHER_BTNS -->
          <BaseBtn :btn-options="btnOptions" v-else
            v-bind="btnOptions.hasChip && btnOptions.title === 'cart' ? { 'cart-length': store.getCartLength } : {}" />
        </template>
        <!-- colorModeSwitcher -->
        <AppColorModeSwitcher />
      </div>
    </BaseWrapper>
  </header>
</template>

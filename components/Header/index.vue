<script setup lang="ts">
import { HEADER_LINKS, HEADER_ACTIONS } from "~/constants";
const { $viewport } = useNuxtApp();
const TRoute = useRoute();

const modal = ref(false);

const queryOptions = computed(() => (category: string = "") => {
  // if (TRoute.name != "products") return;
  const storage = { ...TRoute.query, category };

  // check if there is a null value in query {?limit=}
  // Object.keys
  removeNullValuesFromObj(storage);

  return storage;
});
</script>
<template>
  <!-- header down in (md) -->
  <header
    class="main-shadow fixed bottom-0 left-0 z-40 max-h-20 w-full bg-white ring-1 ring-black/20 backdrop-blur-md dark:bg-[#162031] dark:ring-white/10 md:top-0"
  >
    <BaseWrapper
      class="header__wrapper flex min-h-14 grid-cols-1 items-center justify-between !px-0 md:min-h-20 md:!px-4 lg:grid lg:grid-cols-3"
    >
      <!-- LOGO@on-page-color-mode-switch-change-image -->
      <ClientOnly>
        <div class="header__img">
          <NuxtLink to="/">
            <NuxtImg
              :src="`/logo-${useColorMode().value}.webp`"
              class="hidden aspect-square w-12 md:inline-block"
            />
          </NuxtLink>
        </div>
      </ClientOnly>
      <!-- LINKS -->
      <ul
        class="links hidden items-center justify-center gap-3 text-sm capitalize md:inline-flex"
      >
        <NuxtLink
          v-for="{ title, route, category } in HEADER_LINKS"
          :to="{ path: route, query: queryOptions(category) }"
        >
          <li
            v-text="title"
            class="cursor-pointer transition-colors hover:text-blue-600"
            :class="{
              'text-blue-600':
                TRoute.path == route && TRoute.query.category == category,
            }"
          />
          <!-- <span>
            {{ category }}
          </span> -->
        </NuxtLink>
      </ul>
      <!-- ACTIONS -->
      <div
        v-if="true"
        class="actions grid h-full w-full grid-cols-5 items-center justify-between md:!flex md:w-auto md:justify-end md:gap-1"
      >
        <template v-for="btnOptions in HEADER_ACTIONS">
          <HeaderProfileMenuBtn
            v-if="btnOptions.isMenu && $viewport.isGreaterOrEquals('tablet')"
            v-slot="{ isMenuOpen }"
          >
            <!-- PROFILE_MENU -->
            <BaseBtn :btn-options="btnOptions" :is-menu-open="isMenuOpen" />
          </HeaderProfileMenuBtn>
          <!-- SEARCH_MODEL -->
          <HeaderSearchModalBtn
            v-else-if="
              btnOptions.isPopover && $viewport.isGreaterOrEquals('tablet')
            "
            v-model="modal"
          >
            <BaseBtn :btn-options="btnOptions" @click="modal = !modal" />
          </HeaderSearchModalBtn>
          <!-- OTHER_BTNS -->
          <BaseBtn :btn-options="btnOptions" v-else />
        </template>
        <AppColorModeSwitcher />
        <!-- colorModeSwitcher -->
      </div>
      <div v-else>
        <template v-for="n in 3">
          <HeaderProfileMenuBtn v-if="n !== 2">
            <UButton label="options" />
          </HeaderProfileMenuBtn>
        </template>
      </div>
    </BaseWrapper>
  </header>
</template>

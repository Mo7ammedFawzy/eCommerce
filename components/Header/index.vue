<script setup lang="ts">
import { HEADER_LINKS, HEADER_ACTIONS } from "~/constants";
const { $viewport } = useNuxtApp();
const TRoute = useRoute();
const modal = ref(false);
const colorMode = useColorMode()

const user = useState('user')
const userStore = useUserStore()

// TODO CHECK
// const queryOptions = computed(() => (category: string = "") => {
//   // if (TRoute.name != "products") return;
//   const storage = { ...TRoute.query, category };

//   // check if there is a null value in query {?limit=}
//   // Object.keys
//   removeNullValuesFromObj(storage);

//   return storage;
// });

const store = useCartStore()

onMounted(() => {
  console.log({ user: user.value })
})

</script>
<template>
  <!-- header down in (md) -->
  <header
    class="main-shadow max-h-fit fixed bottom-0 left-0 z-40 w-full bg-white rounded-none t-ring backdrop-blur-md dark:bg-[#162031] md:top-0">

    <BaseWrapper
      class="header__wrapper flex max-h-16 h-16 grid-cols-1 items-center justify-between !px-0 md:!px-4 lg:grid lg:grid-cols-3">
      <!-- LOGO@on-page-color-mode-switch-change-image -->
      <!-- <ClientOnly> -->
      <!-- <div class="header__img py-6"> -->
      <!-- userStore::{{ userStore.isAuthenticated }} -->
      <!-- userStore::{{ user }} -->

      <ColorScheme tag="span" class="w-12 aspect-square t-skeleton hidden md:inline-block  rounded-full">
        <NuxtLink class="header__img max-h-full hidden md:inline-block" to="/">
          <NuxtImg :src="`/logo-${colorMode.value}.webp`" class=" w-12 aspect-square " quality="60"
            alt="`commerce-logo`" format="webp"
            placeholder-class="animate-pulse  rounded-full w-12 aspect-square  bg-gray-300 dark:bg-gray-800" placeholder
            loading="lazy" />
        </NuxtLink>
      </ColorScheme>
      <!-- </div> -->
      <!-- </ClientOnly> -->
      <!-- LINKS -->
      <ul class="links hidden items-center justify-center gap-3 text-sm capitalize md:inline-flex">
        <NuxtLink v-for="{ title, route, category } in HEADER_LINKS" :to="{ path: route, query: { category } }">
          <li v-text="title" class="cursor-pointer transition-colors hover:text-blue-600" :class="{
            'text-blue-600':
              TRoute.path == route && TRoute.query.category == category,
          }" />
          <!-- <span>
            {{ category }}
          </span> -->
        </NuxtLink>
      </ul>
      <!-- ACTIONS -->
      <div v-if="true"
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
          <!-- <BaseBtn  :cart-length="index==0?length:''"/> -->
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

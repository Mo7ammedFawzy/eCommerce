<script setup lang="ts">
import { HEADER_LINKS, HEADER_ACTIONS } from "~/constants";
const router = useRoute()
</script>
<template>
  <header
    class="bg-white dark:bg-[#162031] backdrop-blur-md z-40 max-h-20 fixed bottom-0 md:top-0 left-0 w-full ring-1 ring-black/20 dark:ring-white/10 shadow-[0_7px_10px_0px_rgba(0,0,0,0.08)]">
    <BaseWrapper
      class="header__wrapper min-h-14 md:min-h-20 !px-0 md:!px-4 grid grid-cols-1 md:grid-cols-3 items-center justify-between">
      <!-- LOGO@on-page-color-mode-switch-change-image -->
      <ClientOnly>
        <div class="header__img">
          <NuxtLink to="/">
            <NuxtImg :src="`/logo-${useColorMode().value}.webp`" class="hidden md:inline-block w-12 aspect-square" />
          </NuxtLink>
        </div>
      </ClientOnly>
      <!-- LINKS -->
      <ul class="links hidden md:inline-flex items-center justify-center gap-3 capitalize text-sm">
        <NuxtLink v-for="{ title, route, category } in HEADER_LINKS" :to="{ path: route, query: { category } }">
          <li v-text="title" class="cursor-pointer hover:text-blue-600 transition-colors"
            :class="{ 'text-blue-600': router.path == route && router.query.category == category }" />
          <!-- <span>
            {{ category }}
          </span> -->
        </NuxtLink>
      </ul>
      <!-- ACTIONS -->
      <div class="actions grid md:!flex grid-cols-5 w-full h-full items-center justify-between md:justify-end md:gap-1">
        <template v-for="{ mobile, hasChip, icon, color, title, route } in HEADER_ACTIONS" :key="icon">
          <UButton :to="route" size="lg" square color="gray"
            class="rounded-none relative md:rounded-full h-full md:h-auto flex items-center justify-center text-black/70 hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
            :class="{ 'flex md:hidden': mobile, 'hidden md:flex': mobile === false }" variant="ghost">
            <span class="block md:hidden absolute left-0 top-0 w-full h-full  rounded-none md:rounded-full"
              :class="{ '!bg-blue-600  !text-white': router.path === route }" />
            <!-- {{ hasChip }} -->
            <!-- icon -->
            <UChip :show="hasChip === true" :color="color" class="" :ui="{ base: 'dark:text-white' }" text="3" size="2xl">
              <div class="btn-content  flex items-center justify-center flex-col"
                :class="{ 'text-white md:text-black/70 dark:text-white/70': router.path === route }">
                <UIcon :name="icon" size="20" :class="{ 'mt-[1px] mr-[1px]': hasChip === true }" />
                <span v-text="title" class="text-[10px] capitalize md:hidden " />
              </div>
            </UChip>
          </UButton>
        </template>
        <AppColorModeSwitcher />
        <!-- colorModeSwitcher -->
      </div>

    </BaseWrapper>
  </header>
</template>
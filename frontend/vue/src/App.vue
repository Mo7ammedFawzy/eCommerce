<script setup lang="ts">
import {useRoute} from "vue-router";
import {RouterNames} from "@/router/routerNames.ts";
import useAnimations from "@/composables/useAnimations.ts";
import AppScrollToTopButton from "@/components/app/AppScrollToTopButton.vue";
import AppSearchDialog from "@/components/app/AppSearchDialog.vue";
import AppContext from "@/components/app/AppContext.vue";
import {darkTheme, lightTheme, Notification, Notivue, type NotivueTheme} from "notivue"
import {computed} from "vue";
import {useDark} from "@vueuse/core";

const route = useRoute();
const isDark = useDark();
const customDarkTheme: NotivueTheme = {
  ...darkTheme,
  "--nv-global-bg": "#162031"
}

const notivueTheme = computed(() => {
  if (isDark.value)
    return customDarkTheme
  else
    return lightTheme;
})

useAnimations().startPageAnimation();
</script>
<template>
  <UApp>
    <Notivue v-slot="item">
      <Notification :theme="notivueTheme" :item="item"/>
    </Notivue>
    <AppContext>
      <AppHeader/>
      <AppScrollToTopButton/>
      <AppSearchDialog/>
      <AppLoader/>
      <div class="pt-(--header-height) hidden md:block" v-if="route.name !== RouterNames.HOME"/>
      <main data-vaul-drawer-wrapper class="min-h-screen overflow-hidden">
        <RouterView/>
      </main>
      <AppFooter/>
      <div class="pb-(--header-height) md:hidden"/>
    </AppContext>
  </UApp>
</template>
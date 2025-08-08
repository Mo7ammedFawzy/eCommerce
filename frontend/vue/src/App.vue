<script setup lang="ts">
import {useRoute} from "vue-router";
import {RouterNames} from "@/router/routerNames.ts";
import useAnimations from "@/composables/useAnimations.ts";
import AppScrollToTopButton from "@/components/app/AppScrollToTopButton.vue";

const route = useRoute();

useAnimations().startPageAnimation();
</script>
<template>
  <UApp>
    <AppHeader/>
    <AppScrollToTopButton/>
    <AppLoader/>
    <div class="pt-(--header-height) hidden md:block" v-if="route.name !== RouterNames.HOME"/>
    <main data-vaul-drawer-wrapper class="min-h-screen">
      <RouterView/>
    </main>
    <AppFooter/>
    <div class="pb-(--header-height)  md:hidden"/>
  </UApp>
</template>
<script setup lang="ts">
import {useRoute} from "vue-router";
import {RouterNames} from "@/router/routerNames.ts";
import useAnimations from "@/composables/useAnimations.ts";
import {nextTick, onMounted} from "vue";

const route = useRoute();

const {pageTransitionEnter, pageTransitionLeave} = useAnimations();


onMounted(async () => {
  await nextTick();
  pageTransitionLeave(() => {
    pageTransitionEnter()
  });
})

</script>
<template>
  <UApp>
    <AppHeader/>
    <AppLoader/>
    <div class="pt-(--header-height) hidden md:block" v-if="route.name !== RouterNames.HOME"/>
    <main class="min-h-screen">
      <RouterView/>
    </main>
    <AppFooter/>
    <div class="pb-(--header-height)  md:hidden"/>
  </UApp>
</template>
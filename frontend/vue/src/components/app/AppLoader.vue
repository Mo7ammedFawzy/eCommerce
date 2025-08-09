<script setup lang="ts">
import {useRoute} from "vue-router";
import {computed} from "vue";
import {RouterNames} from "@/router/routerNames.ts";
import {GlobalIcons} from "@/utils/constants/GlobalIcons.ts";

type RouteNameType = `${RouterNames}`
const route = useRoute();
const defaultName = RouterNames.HOME;
const defaultIcon = GlobalIcons.HOME;
//TODO:: add type
const iconsMap: Record<string, string> = {
  [RouterNames.HOME]: GlobalIcons.HOME,
  [RouterNames.SEARCH]: GlobalIcons.SEARCH,
  [RouterNames.PRODUCTS]: GlobalIcons.PRODUCTS,
  [RouterNames.CART]: GlobalIcons.CART,
  [RouterNames.PROFILE]: GlobalIcons.PROFILE,
  [RouterNames.CHECKOUT]: GlobalIcons.CHECKOUT,
  [RouterNames.DASHBOARD]: GlobalIcons.DASHBOARD,
}
const routeName = computed<RouteNameType>(() => (<RouteNameType>route.name) ?? defaultName)
const routeIcon = computed<string>(() => {
  const value = routeName.value;
  if (value && value in iconsMap)
    return iconsMap[value]
  else
    return defaultIcon
})

</script>
<template>
  <main id='app-loader'
        class='w-full h-full bg-background overflow-hidden fixed top-0 left-0 z-50 cursor-wait select-none translate-y-0'>
    <BaseWrapper class="h-full flex items-center justify-center">
      <div data-app-loader-wrapper class="absolute flex items-center justify-center h-full w-full left-0 bottom-0">
        <div  class="fit flex items-end gap-2 opacity-0 -translate-y-2" data-app-loader-inner>
          <h1 class="capitalize text-5xl md:text-7xl dark:text-white" v-text="routeName"/>
          <UIcon :name="routeIcon" class="text-5xl md:text-7xl"/>
        </div>
      </div>
    </BaseWrapper>
  </main>
</template>
<script setup lang="ts">
import {HomeItems} from "~/constants";

definePageMeta({
  name: "home"
})
</script>
<template>
  <main id="home-page" class="min-h-screen space-y-20">
    <HomeLanding/>
    <BaseWrapper>
      <HomeCategories class="my-24"/>
      <HomeTopCollections/>
    </BaseWrapper>
    <div class="flex">
      <BaseSemiCard is-brand name="brand" :item="HomeItems.landing.brandSection"/>
    </div>
    <HomeBestSeller/>
    <HomeBrands class="mx-auto !max-w-5xl" has-wrapper/>
    <HomeServices has-wrapper/>
  </main>
</template>

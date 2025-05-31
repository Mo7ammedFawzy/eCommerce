<script setup lang="ts">
import { HomeItems } from "~/constants";
definePageMeta({
  name: "home"
})
</script>
<template>
  <main id="home-page" class="min-h-screen">
    <!-- landing(carousel) -->
    <!-- 2cards-base(semi-card)-used-with-carousel -->
    <HomeLanding />
    <BaseWrapper>
      <!-- categories-base(avatar) -->
      <HomeCategories class="my-24" />
      <!-- top-collections-base(card) -->
      <HomeTopCollections />
    </BaseWrapper>
    <!-- banner-base(semi-card) -->
    <div class="flex">
      <BaseSemiCard is-brand name="brand" :item="HomeItems.landing.brandSection" />
    </div>
    <div class="my-20" />
    <!-- bestSeller-base(card)+carousel -->
    <HomeBestSeller />
    <div class="my-20" />
    <!-- brands-autoplay-carousel -->
    <HomeBrands class="mx-auto !max-w-5xl" has-wrapper />
    <div class="my-20" />
    <!--services base(horizental-cards) -->
    <HomeServices has-wrapper />
    <div class="my-20" />
    <!-- newsLetter -->
    <!-- <div class="my-20" /> -->

    <!-- footer -->
  </main>
</template>

<script setup lang=ts>
import { HomeItems } from "~/constants"
</script>
<template>
  <main id='home-page' class='min-h-screen'>
    <!-- landing(carousel) -->
    <!-- 2cards-base(semi-card)-used-with-carousel -->
    <HomeLanding />
    <BaseWrapper class="">
      <!-- categories-base(avatar) -->
      <HomeCategories />
      <!-- top-collections-base(card) -->
      <HomeTopCollections />
    </BaseWrapper>
    <!-- banner-base(semi-card) -->
    <BaseSemiCard is-brand :item="HomeItems.landing.brandSection" />
    <div class="my-20" />
    <!-- bestSeller-base(card)+carousel -->
    <HomeBestSeller />
    <div class="my-20" />
    <!-- brands-autoplay-carousel -->
    <HomeBrands class="!max-w-5xl mx-auto" has-wrapper />
    <div class="my-20" />
    <!--services base(horizental-cards) -->
    <HomeServices has-wrapper />
    <div class="my-20" />
    <!-- newsLetter -->
    <!-- <div class="my-20" /> -->

    <!-- footer -->
  </main>
</template>
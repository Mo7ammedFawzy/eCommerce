

<script setup lang="ts">

import { HomeItems } from "~/constants"

</script>

<template>
 <main id="landing-section">
  <section id="first">
   <BaseSemiCard :item="HomeItems.landing.firstSection" class="w-full" />
  </section>

  <section id="second" class="my-8">
   <BaseWrapper class="grid grid-cols-1 md:grid-cols-2 gap-6 !px-3">
    <BaseSemiCard v-for="item in HomeItems.landing.secondSection" :item="item" :large="false" />
   </BaseWrapper>
  </section>
 </main>
</template>
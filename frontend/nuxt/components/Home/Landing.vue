<script setup lang="ts">
import { HomeItems } from "~/constants";
</script>

<template>
  <main id="landing-section">
    <section id="first" class="flex">
      <BaseSemiCard
        name="landing"
        :item="HomeItems.landing.firstSection"
        class="w-full"
      />
    </section>

    <section id="second" class="my-8">
      <BaseWrapper class="grid grid-cols-1 gap-6 !px-3 md:grid-cols-2">
        <BaseSemiCard
          :name="item.name"
          :double="true"
          v-for="item in HomeItems.landing.secondSection"
          :item="item"
        />
      </BaseWrapper>
    </section>
  </main>
</template>

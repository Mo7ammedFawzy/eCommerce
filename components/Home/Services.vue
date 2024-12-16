<script setup lang='ts'>

import { Services } from "~/constants"

</script>

<template>
  <section id='services' class=''>
    <div class="services-wrapper grid grid-cols-[repeat(auto-fill,minmax(230px,1fr))] xl:grid-cols-4 gap-6">
      <HomeServiceCard v-for="item in Services" :item="item" />
    </div>
  </section>
</template>
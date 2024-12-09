<script setup lang='ts'>

import { Services } from "~/constants"

</script>

<template>
  <section id='services' class=''>
    <div class="services-wrapper grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] lg:grid-cols-3 xl:grid-cols-4 gap-6">
      <HomeServiceCard v-for="item in Services" :item="item" />
    </div>
  </section>
</template>
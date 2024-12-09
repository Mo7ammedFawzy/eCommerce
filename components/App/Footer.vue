<script setup lang='ts'>
import { FooterLinks } from "~/constants"


</script>

<template>
 <main id='footer' class='py-20 bg-white text-center dark:bg-[#162031] ring-1 dark:ring-gray-700 ring-gray-700/30'>
  <div class="footer-wrapper max-w-3xl mx-auto">
   <HomeNewsletter has-wrapper/>

   <div class="footer-links my-8">
    <div
     class="footer-links__wrapper max-w-xs mx-auto text-center items-center justify-center gap-8 flex flex-wrap">
     <NuxtLink to="#" class="footer_links__link flex items-center justify-center" v-for="{ icon, color } in FooterLinks">
      <UIcon :name="icon" size="30" :style="{ backgroundColor: color }" />
     </NuxtLink>
    </div>
   </div>
   <div class="footer-text">
    <p>
     &copy; {{ new Date().getFullYear() }} Commercehope. All rights reserved
    </p>
   </div>
  </div>
 </main>
</template>
<script setup lang='ts'>

const scrollToTop = () => {
 window.scrollTo({ top: 0, behavior: "smooth" })
}

</script>

<template>
 <UButton id='scroll-to-top-btn' class='fixed z-20 rounded-full right-4 bottom-4 btn-primary' icon="mdi-light:chevron-up"
  color="primary" square size="xl" @click="scrollToTop">

 </UButton>
</template>
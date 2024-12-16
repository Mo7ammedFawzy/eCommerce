<script setup lang='ts'>

const { id } = useRoute().params

</script>

<template>
 <main id='order-page' class='my-6'>
  route id :{{ id }}
 </main>
</template>
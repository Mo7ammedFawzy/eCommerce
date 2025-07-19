<script setup lang='ts'>
type MainHeader = {
 title: string, text?: string
}
const defaultText = "Lorem Ipsum Is Simply Dummy Text Of The Printing And Typesetting Industry."

withDefaults(defineProps<MainHeader>(), { text: defaultText })
</script>

<template>
 <div id='main-header'>
  <div class="title" v-text="title" />
  <p v-text="text" />
 </div>
</template>
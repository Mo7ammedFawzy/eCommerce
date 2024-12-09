<script setup lang='ts'>
const defaultText = "Lorem Ipsum Is Simply Dummy Text Of The Printing And Typesetting Industry."
type MainHeader = {
 title: string;
 text?: string;
};

withDefaults(defineProps<MainHeader>(), { text: defaultText })
</script>

<template>
 <div id='main-header' class=''>
  <div class="title" v-text="title" />
  <p v-text="text" />
 </div>
</template>
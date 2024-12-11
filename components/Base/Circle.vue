<script setup lang="ts">
type Circle = {
  bg?: string;
};

const props = defineProps<Circle>();
const { bg = "bg-white/15" } = props;
</script>

<template>
  <span class="absolute aspect-square w-20 rounded-full" :class="bg" />
</template>

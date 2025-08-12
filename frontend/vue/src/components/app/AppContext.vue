<script setup lang="ts">
import {provide, ref} from "vue";
import {appSearchDialogModelKey} from "@/utils/constants";

provide(appSearchDialogModelKey, ref(false))
</script>
<template>
  <slot/>
</template>
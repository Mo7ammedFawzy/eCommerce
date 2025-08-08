<script setup lang="ts">
import {useClipboard} from "@vueuse/core";

const props = defineProps<{ productLink: string }>()

const {copy, copied} = useClipboard({source: props.productLink});

</script>

<template>
  <UButton :color="copied ? 'success' : 'neutral'" variant="link" size="sm"
           :icon="copied ? 'i-lucide-copy-check' : 'i-lucide-copy'" aria-label="Copy to clipboard" @click="copy(productLink)"/>
</template>


<script setup lang="ts">

const props = defineProps<{ productLink: string }>()
const copied = ref(false)

async function copy() {
 navigator.clipboard.writeText(props.productLink)
 copied.value = true
 await delay()
 copied.value = false
}
</script>

<template>
 <UButton :color="copied ? 'green' : 'gray'" variant="link" size="sm"
  :icon="copied ? 'i-lucide-copy-check' : 'i-lucide-copy'" aria-label="Copy to clipboard" @click="copy" />
</template>


<script setup lang="ts">
// const value = ref('npx nuxi module add ui')

const props = defineProps<{ productLink: string }>()

const copied = ref(false)

function copy() {
 navigator.clipboard.writeText(props.productLink)
 copied.value = true

 setTimeout(() => {
  copied.value = false
 }, 2000)
}
</script>

<template>
 <UButton :color="copied ? 'green' : 'gray'" variant="link" size="sm"
  :icon="copied ? 'i-lucide-copy-check' : 'i-lucide-copy'" aria-label="Copy to clipboard" @click="copy" />
 <!-- <UInput v-model="value" :ui="{ trailing: 'pr-0.5' }">
  <template v-if="value?.length" #trailing>
   <UTooltip text="Copy to clipboard" :content="{ side: 'right' }">
   </UTooltip>
  </template>
 </UInput> -->
</template>


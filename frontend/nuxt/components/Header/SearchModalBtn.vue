<script setup lang="ts">
const modal = defineModel({ required: true, default: false });

const route = useRoute()

watch(() => route.path, () => {
  // TODO: ENABLE IT
  modal.value = false
})

</script>

<template>
  <div>
    <slot />
    <UModal v-model="modal">
      <div class="modal-wrapper max-h-screen overflow-hidden max-w-5xl h-[500px]">
        <AppSearch />
      </div>
    </UModal>
  </div>
</template>

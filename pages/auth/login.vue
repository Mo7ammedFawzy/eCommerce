<script setup>
definePageMeta({
  middleware: ['already-authenticated']
})

onUnmounted(() => {
  useRouter().push({ query: {} })
})

</script>
<template>
  <ClientOnly>
    <main id='login-page' class='space-y-3 min-h-screen flex items-center'>
      <BaseWrapper class="max-w-xl mb-8 md:mb-0 md:mt-8">
        <div class="text-center text-7xl">
        </div>
        <AuthLogin />
      </BaseWrapper>
    </main>
  </ClientOnly>
</template>
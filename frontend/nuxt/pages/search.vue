<script setup>
const { $viewport } = useNuxtApp();

const canAccessSearchPage = computed(() => !$viewport.isGreaterOrEquals("tablet"));
const router = useRouter();

router.beforeEach((to) => {
  if (!canAccessSearchPage.value) {
    return to.name !== "search";
  }
});
</script>

<template>
  <main id="search-page" class="mb-12 min-h-screen md:mt-0 md:pt-20">
    <AppSearch />
  </main>
</template>

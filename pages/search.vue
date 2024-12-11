<script setup>
const { $viewport } = useNuxtApp();

const canSeeSearchPage = computed(() => !$viewport.isGreaterOrEquals("tablet"));

const router = useRouter();

router.beforeEach((to, from) => {
  // console.log({ to, from });
  if (!canSeeSearchPage.value) {
    return to.name !== "search";
  }
  // return to.path === "/";
});
</script>

<template>
  <main id="search-page" class="mb-12 min-h-screen md:mt-0 md:pt-20">
    <AppSearch />
  </main>
</template>

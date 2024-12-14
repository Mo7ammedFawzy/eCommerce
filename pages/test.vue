<script setup lang="ts">
import { API_URL, Products } from "~/constants";
import type { API_Product } from "~/types";

const { data } = await useFetch<API_Product[]>(API_URL + "/products", { lazy: true });
// const TData = computed(() => data ?? []);
</script>

<template>
  <ClientOnly>
    <main id="test-page" class="my-40">
      <div class="text-center text-4xl">TEST PAGE</div>

      <!-- <template> -->
      <BaseProductWrapper :products="data" status="success" />
      <!-- </template> -->
    </main>
  </ClientOnly>
</template>

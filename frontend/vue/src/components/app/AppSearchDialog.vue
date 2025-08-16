<script setup lang="ts">
import {computed, inject, ref} from "vue";
import {appSearchDialogModelKey} from "@/utils/constants";
import {getProducts} from "@/composables/useApi.ts";
import {CommandPaletteGroup, CommandPaletteItem} from "@nuxt/ui/components/CommandPalette.vue";
import {ProductCard, ProductParams} from "@/types";
import {refDebounced} from "@vueuse/core";
import ProductUtils from "@/utils/ProductUtils.ts";
import CommonUtils from "@/utils/CommonUtils.ts";

const appSearchDialogModel = inject(appSearchDialogModelKey, ref(false));

const searchTerm = ref(undefined)
const searchTermDebounced = refDebounced(searchTerm, 300)
const params = computed<ProductParams>(() => ({
  search: searchTermDebounced.value ?? ''
}))
const {data: products, isFetching} = getProducts(params);

function toCommandPaletteItem(product: ProductCard): CommandPaletteItem {
  return {
    label: product.title,
    id: product.id,
    suffix: product.description,
    avatar: {src: product.images[0]},
    to: ProductUtils.toLink(product),
  }
}

const groups = computed<CommandPaletteGroup<CommandPaletteItem>[]>(() => [
  {
    id: "products",
    label: searchTerm.value ? `Products matching “${searchTerm.value}”...` : 'Products',
    items: products.value?.map(product => toCommandPaletteItem(product)),
    ignoreFilter: true
  }
])

CommonUtils.onRouteChanged(() => {
  appSearchDialogModel.value = false;
})

</script>
<template>
  <UDrawer
      title="products"
      as="div"
      description="products"
      v-model:open="appSearchDialogModel"
      should-scale-background set-background-color-on-scale
      :ui="{content:'bg-background ui-ring pt-0',
      header:'flex justify-end items-center',
      body:'max-h-full pt-0 min-h-[75vh] md:min-h-fit overflow-y-auto ui-scrollbar-y'}">
    <template #header>
      <UButton color="neutral" class="rounded-full" variant="ghost" icon="i-lucide-x" @click="appSearchDialogModel = false"/>
    </template>
    <template #body>
      <UCommandPalette
          :fuse="{ fuseOptions: { includeMatches: true },matchAllWhenSearchEmpty:true }"
          :ui="{itemLeadingAvatarSize:'3xl'}"
          v-model:search-term="searchTerm"
          :loading="isFetching"
          :groups="groups"
          placeholder="Search users..."
          class="max-h-[75vh] md:h-80"
      />
    </template>
  </UDrawer>
</template>


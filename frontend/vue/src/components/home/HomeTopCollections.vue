<script setup lang="ts">

import {IProductCard} from "@/types";
import {useMyFetch} from "@/composables/useApi.ts";
import {watch} from "vue";


const {data} = useMyFetch<IProductCard[]>("products?offset=10&limit=8").json();


watch(data, (d) => {
  console.log({d})
})
</script>

<template>
  <BaseWrapper class="grid grid-cols-2 xs:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-(--ui-gap)">
    <BaseProductCard v-for="product in data" v-bind="product"/>
  </BaseWrapper>
</template>

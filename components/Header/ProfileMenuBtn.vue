<script setup lang="ts" generic="T">
import { ProfileLinks } from "~/constants";
import type { ProfileLink } from "~/types";

const menu = ref(false);

const emit = defineEmits(["menu-change"]);

let dropDownItems: Array<ProfileLink[]> = ProfileLinks.filter(
  (el) => !el.hasSwitch,
).map((el) => [{ icon: el.icon, label: el.label, to: el.path }]);

dropDownItems.unshift([
  {
    label: "dev.fawzey@gmail.com",
    // icon: "mdi-home",
    slot: "head",
    disabled: true,
  },
]);
dropDownItems.push([{ label: "logout", slot: "btn", disabled: true }]);

watch(menu, () => {
  emit("menu-change", menu.value);
});
</script>

<template>
  <!-- // default: { openDelay: 5000,closeDelay:4000 }, -->
   <!-- TODO:: make aclose delay -->
  <UDropdown
    class=""
    :items="dropDownItems"
    :ui="{
      item: { disabled: 'cursor-text select-text' },
    }"
    mode="click"
    :popper="{ arrow: true, placement: 'bottom-end' }"
    v-model:open="menu"
  >
    <template #head="{ item }">
      <div class="text-left">
        <div v-text="'Mohammed Fawzey'" class="text-lg font-bold" />
        <p class="text-xs" v-text="item.label" />
      </div>
    </template>
    <template #btn="{ item }">
      <div class="btn__wrapper w-full">
        <!-- {{ menu }} -->
        <!-- :to="{ path: '/auth/login', }" -->
        <NuxtLink to="/auth/login">
          <UButton
            :label="item.label"
            block
            color="primary"
            variant="solid"
            icon="line-md:log-out"
            class="btn-primary"
          />
        </NuxtLink>
      </div>
    </template>
    <slot :is-menu-open="menu" />
    <!-- <UButton label="options" /> -->
  </UDropdown>
</template>

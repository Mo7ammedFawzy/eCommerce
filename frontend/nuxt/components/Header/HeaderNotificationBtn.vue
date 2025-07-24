<script setup lang="ts" generic="T">
import {ProfileLinks} from "~/constants";
import type {DropdownItem} from "#ui/types";

const menu = ref(false);
const router = useRouter()

const userStore = useUserStore()


const emit = defineEmits(["menu-change"]);

let dropDownItems: DropdownItem[][] = ProfileLinks.filter(
    (el) => !el.hasSwitch,
).map((el) => [{icon: el.icon, label: el.label, to: el.path}]);

dropDownItems.unshift([
  {
    label: "dev.fawzey@gmail.com",
    slot: "head",
    disabled: true,
  },
]);
dropDownItems.push([{label: "SignIn", slot: "btn", disabled: true}]);

watch(menu, () => {
  emit("menu-change", menu.value);
});

const redirectToLogin = () => {
  router.push({ path: "/auth/login" }).finally(async () => {
    await delay(250)
    menu.value = false
  })
}

const signout = async () => {
  await delay(250)
  menu.value = false
}

</script>

<template>
  <!-- TODO:: make a close delay -->
  <UDropdown :items="dropDownItems" :ui="{
    item: { disabled: 'cursor-text select-text' },
  }" mode="click" :popper="{ arrow: true, placement: 'bottom-end' }" v-model:open="menu">
    <template #head="{ item }">
      <div class="text-left max-w-full">
        <div v-text="userStore.user?.username ?? 'username'" class="text-lg capitalize three-dots font-bold" />
        <p class="text-xs three-dots" v-text="userStore.user?.email ?? 'example@gmail.com'" />
      </div>
    </template>
    <template #btn="{ item }">
      <div class="btn__wrapper w-full">
        <!--        -->
        <UButton v-if="true" :label="item.label" @click="redirectToLogin" block color="primary"
                 variant="solid" icon="solar:login-2-outline" class="btn-primary"/>
        <!-- </NuxtLink> -->
        <UButton label="Logout" block color="red" @click="signout" icon="solar:logout-2-outline"
                 class="btn-primary" v-else/>
      </div>
    </template>
    <slot :is-menu-open="menu" />
  </UDropdown>
</template>

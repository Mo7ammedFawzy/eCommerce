<script setup lang="ts" generic="T">
import { ProfileLinks } from "~/constants";
import type { ProfileLink } from "~/types";

const menu = ref(false);
const router = useRouter()

// const { signIn, signOut, status } = useAuth()

const isLoggedIn = computed(() => true)


const handleSignIn = async () => {
  // await signIn('github')
}
const handleSignOut = async () => {
  // await signOut()
}

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
dropDownItems.push([{ label: "SignIn", slot: "btn", disabled: true }]);

watch(menu, () => {
  emit("menu-change", menu.value);
});

const redirectToLogin = () => {
  router.push({ path: "/auth/login" }).finally(async () => {
    await delay(250)
    menu.value = false
  })
}

</script>

<template>
  <!-- // default: { openDelay: 5000,closeDelay:4000 }, -->
  <!-- TODO:: make aclose delay -->
  <UDropdown class="" :items="dropDownItems" :ui="{
    item: { disabled: 'cursor-text select-text' },
  }" mode="click" :popper="{ arrow: true, placement: 'bottom-end' }" v-model:open="menu">
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
        <!-- <NuxtLink > -->
        <UButton :label="item.label" @click="redirectToLogin" block color="primary" variant="solid" icon="line-md:log-in"
          class="btn-primary" />
        <!-- </NuxtLink> -->
        <!-- <UButton label="sign in" block color="green" @click="handleSignIn" variant="solid" icon="line-md:log-in"
          class="btn-primary"  /> -->
      </div>
    </template>
    <slot :is-menu-open="menu" />
    <!-- <UButton label="options" /> -->
  </UDropdown>
</template>

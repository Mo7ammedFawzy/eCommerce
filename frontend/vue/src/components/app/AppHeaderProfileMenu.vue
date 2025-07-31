<script setup lang="ts">
import {ProfileMenuLink} from "@/types";
import {DropdownMenuItem} from "@nuxt/ui";

const profileMenuModel = defineModel({default: false, type: Boolean})
const ProfileMenuLinks: ProfileMenuLink[] = [
  {
    label: "dev.fawzey@gmail.com",
    slot: "head",
    as: "div"
  },
  {
    icon: "lets-icons:home-light",
    label: 'home',
    to: "/",
  },
  {
    icon: "iconamoon:invoice-thin",
    label: "orders",
    to: "/profile/orders"
  },
  {
    icon: "material-symbols-light:person-outline-rounded",
    label: "profile",
    to: "/profile/general"
  },
  {
    label: "SignIn",
    slot: "btn",
  }
] satisfies DropdownMenuItem[];

function toDropdownMenuItem(item: any): DropdownMenuItem {
  return item;
}
</script>

<template>
  <UDropdownMenu
      :items="ProfileMenuLinks"
      v-model:open="profileMenuModel"
      :content="{align:'end',sideOffset:12,alignOffset:-12}"
      arrow
      :ui="{content:'w-48 bg-background', itemLabel: 'capitalize',arrow:'dark:fill-(--ui-bg)' }">
    <slot/>
    <template #head>
      <div class="text-left max-w-full">
        <div v-text="'username'" class="text-lg capitalize three-dots font-bold"/>
        <p class="text-xs three-dots" v-text="'example@gmail.com'"/>
      </div>
    </template>
    <template #btn="{ item }">
      <div class="w-full">
        <UButton v-if="true" :label="toDropdownMenuItem(item).label" block color="primary"
                 variant="solid" icon="solar:login-2-outline" class="btn-primary"/>
        <UButton label="Logout" block color="error" icon="solar:logout-2-outline" class="btn-primary" v-else/>
      </div>
    </template>
  </UDropdownMenu>
</template>

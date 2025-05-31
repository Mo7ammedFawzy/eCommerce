<script lang="ts" setup>
import { ProfileLinks } from "~/constants";

const route = useRoute();
const colorMode = useColorMode();

const isDark = computed(() => colorMode.value === "dark");
const isInSameRoute = computed(
  () =>
    (path: string = "/") =>
      route.path === path,
);

const toggleDarkMode = (hasSwitch: boolean = false) => {
  if (!hasSwitch) return;
  colorMode.preference = colorMode.value === "dark" ? "light" : "dark";
};
</script>

<template>
  <div class="profile-page my-8">
    <BaseWrapper class="max-w-5xl">
      <ul class="py-4">
        <template
          v-for="(
            { icon = 'mdi-home', hasSwitch, path, label: title }, index
          ) in ProfileLinks"
        >
          <NuxtLink :to="path" @click="toggleDarkMode(hasSwitch)">
            <li
              class="flex cursor-pointer items-center justify-between px-3 py-4 hover:bg-black/15"
              :class="{ 'bg-black/10': isInSameRoute(path) }"
            >
              <!-- icon+text+divider -->
              <div class="list-content flex items-center gap-2">
                <UIcon :name="icon" size="25" />
                <span
                  v-text="title"
                  class="text-base capitalize text-black/80 dark:text-white/80"
                />
              </div>
              <ClientOnly>
                <UToggle v-if="hasSwitch" color="blue" :model-value="isDark" />
              </ClientOnly>
            </li>
          </NuxtLink>
          <UDivider
            class=""
            :ui="{ border: { base: 'dark:border-white/10' } }"
            v-if="index <= ProfileLinks.length - 2"
          />
        </template>
      </ul>
      <!-- logout -->
      <UButton
        icon="line-md:log-out"
        label="logout"
        class="!capitalize hover:bg-black/10 hover:ring-black/10 t-ring dark:hover:bg-white/10 dark:hover:ring-white/10"
        variant="outline"
        block
        size="lg"
        color="black"
      />
    </BaseWrapper>
  </div>
</template>

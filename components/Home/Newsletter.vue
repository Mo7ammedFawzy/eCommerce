<script setup lang="ts">
import { z } from "zod";
import type { FormSubmitEvent } from "#ui/types";

const schema = z.object({
  email: z.string().email("invalid email"),
});
const state = reactive({
  email: "",
});
const isLoading = ref(false);

const isEmailValid = computed(
  () => schema.safeParse({ email: state.email }).success,
);

// types
type Schema = z.output<typeof schema>;
const pushNotification = () =>
  push.success({
    message: "email has been succesfully sent",
  });

async function onSubmit(event: FormSubmitEvent<Schema>) {
  // if(event.data)
  isLoading.value = true;
  setTimeout(() => {
    isLoading.value = false;
    state.email = "";
    pushNotification();
  }, 1500);
}
const newsletterText =
  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.";
</script>

<template>
  <main id="news-letter" class="">
    <BaseSectionHeader
      class="mx-auto max-w-xl [&>p]:text-gray-600 dark:[&>p]:text-gray-500"
      title="newsletter"
      :text="newsletterText"
    />

    <UForm
      :schema="schema"
      ref="form"
      :state="state"
      @submit="onSubmit"
      :validate-on="['change', 'input', 'submit']"
    >
      <UFormGroup name="email">
        <UInput
          @key.enter="onSubmit"
          v-model="state.email"
          size="xl"
          color="white"
          :trailing="true"
          placeholder="Search..."
          class="mx-auto max-w-md outline-red-900"
          :ui="{
            color: { white: { outline: 'ring-gray-400' } },
            icon: { trailing: { pointer: 'pointer-events-auto' } },
            base: 'h-14',
          }"
        >
          <template #trailing>
            <UButton
              type="submit"
              square
              class="p-0"
              size="xl"
              loading-icon="line-md:loading-twotone-loop"
              :loading="isLoading"
              variant="ghost"
              :disabled="!isEmailValid || isLoading"
              :ui="{ icon: { size: { lg: 'h-8 w-8' } } }"
            >
              <template #trailing>
                <UIcon v-if="!isLoading" name="logos:telegram" size="35" />
              </template>
              <!-- <UIcon size="25" class="cursor-pointer" /> -->
              <!-- loading-icon="eos-icons:three-dots-loading" -->
            </UButton>
          </template>
        </UInput>
      </UFormGroup>
    </UForm>
  </main>
</template>

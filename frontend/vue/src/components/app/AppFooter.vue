<script lang="ts" setup>
import {z} from "zod"
import {computed, reactive, ref, useTemplateRef, watch} from "vue";
import {push} from "notivue";
import {FooterLinks} from "@/utils/constants";
import {useRoute} from "vue-router";
import type {Form} from "@nuxt/ui";

const route = useRoute()

const schema = z.object({
  email: z.string().email("invalid email"),
});
const state = reactive({
  email: "",
});

const uFormRef = useTemplateRef<Form<any>>("uFormRef")

const isLoading = ref(false);

const isEmailValid = computed(
    () => schema.safeParse({email: state.email}).success,
);


const isSendBtnDisabled = computed(() => !isEmailValid.value || isLoading.value)

// types
const pushNotification = () =>
    push.success({
      message: "email has been successfully sent",
    });

async function onSubmit() {
  isLoading.value = true;
  setTimeout(() => {
    isLoading.value = false;
    state.email = "";
    pushNotification();
  }, 1500);
}

watch(() => route.fullPath, () => {
  uFormRef.value?.clear();
  state.email = "";

})
</script>
<template>
  <footer class="min-h-[20vh] w-full py-[calc(var(--ui-gap)*2)] bg-white text-center dark:bg-[#162031] ui-ring rounded-none">
    <div class="max-w-3xl mx-auto">
      <BaseSectionHeader
          class="mx-auto max-w-xl [&>p]:text-gray-600 dark:[&>p]:text-gray-500"
          title="newsletter"
          text=""
      />
      <UForm
          ref="uFormRef"
          :schema="schema"
          :state="state"
          @submit="onSubmit"
          :validate-on="['change', 'input']">
        <UFormField name="email">
          <UInput
              @key.enter="onSubmit"
              v-model="state.email"
              size="xl"
              :color="undefined"
              :trailing="true"
              placeholder="Search..."
              class="mx-auto max-w-md"
              :ui="{trailingIcon: 'pointer-events-auto',base: 'ring-gray-400 h-10 bg-transparent'}"
          >
            <template #trailing>
              <UButton
                  type="submit"
                  square
                  class="p-0"
                  size="xl"
                  loading-icon="line-md:loading-twotone-loop"
                  :loading="isLoading"
                  :class="{'cursor-pointer':!isSendBtnDisabled}"
                  variant="ghost"
                  :disabled="isSendBtnDisabled">
                <template #trailing>
                  <UIcon v-if="!isLoading" name="logos:telegram" class="text-2xl z-10"/>
                </template>
              </UButton>
            </template>
          </UInput>
        </UFormField>
      </UForm>
      <div class="my-(--ui-gap)">
        <div class="max-w-xs mx-auto text-center items-center justify-center gap-(--ui-gap) flex flex-wrap">
          <RouterLink to="/" class="flex items-center justify-center" v-for="{ icon, color } in FooterLinks">
            <UIcon :name="icon" class="text-3xl rounded-md" :style="{ color: color }"/>
          </RouterLink>
        </div>
      </div>
      <p class="text-sm text-muted">
        &copy; {{ new Date().getFullYear() }} Commercehope. All rights reserved
      </p>
    </div>
  </footer>
</template>


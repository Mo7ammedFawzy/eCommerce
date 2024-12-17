<script setup lang='ts'>
import { z } from "zod";
import type { FormSubmitEvent } from "#ui/types"

const schema = z.object({
  username: z.string().min(3).max(50),
  password: z.string({ message: 'password is required' }),
})

const state = reactive({
  username: undefined,
  email: undefined,
  password: undefined,
})

type Schema = z.output<typeof schema>


const onSubmit = async (event: FormSubmitEvent<Schema>) => {
}

</script>

<template>
  <main id='auth-login' class='semi-card-ring py-3'>
    <!-- head-title -->
    <div class="text-center mb-1">
      <div v-text="'Login'" class="semi-title mb-1" />
      <p v-text="'Login to your account to continue'" />
    </div>
    <!-- FORM -->
    <UForm :schema="schema" :state="state" @submit="onSubmit" class="space-y-3">
      <UFormGroup name="username" label="UserName">
        <UInput v-model="state.username" placeholder="MoFawzey" icon="i-heroicons-user" />
      </UFormGroup>
      <UFormGroup name="email" label="Email" v-if="false">
        <UInput v-model="state.email" placeholder="example@gmail.com" icon="i-heroicons-envelope" />
      </UFormGroup>
      <UFormGroup name="password" label="Password">
        <UInput v-model="state.password" icon="i-heroicons-lock-closed" />
      </UFormGroup>
      <!-- SUBMIT -->
      <UButton block label="login" type="submit" color="primary" class="dark:text-white  capitalize" size="lg" />
    </UForm>
    <UDivider label="Or" class="my-3" />
    <!-- PROVIDERS(github|google) -->
    <UButton icon="mdi-github" block label="Sign in with Github" color="gray"
      class="dark:text-white dark:hover:bg-gray-700 dark:bg-gray-600 capitalize" size="lg" />
    <UButton icon="logos:google-icon" block label="Sign in with Github" color="white"
      class="dark:text-white capitalize my-2" size="lg" variant="solid" />
    <p class="text-center">
      Don't you have an account?
      <NuxtLink to="/auth/register" class="text-main font-semibold">Register</NuxtLink>
    </p>

  </main>
</template>
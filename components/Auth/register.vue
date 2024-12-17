<script setup lang='ts'>
import { z } from "zod";
import type { FormSubmitEvent } from "#ui/types"

const schema = z.object({
  firstName: z.string().min(3).max(50),
  lastName: z.string().min(3).max(50),
  email: z.string({ message: 'email is required' }).email('invalid email'),
  password: z.string({ message: 'password is required' }),
})

const state = reactive({
  firstName: undefined,
  lastName: undefined,
  email: undefined,
  password: undefined,
})

type Schema = z.output<typeof schema>

const onSubmit = async (event: FormSubmitEvent<Schema>) => {
}

</script>

<template>
  <main id='auth-register' class='my-6 md:my-0 semi-card-ring py-3'>
    <!-- head-title -->
    <div class="text-center mb-2">
      <div v-text="'Register'" class="semi-title" />
      <p class="text-sm" v-text="'create a new account'" />
    </div>
    <!-- FORM -->
    <UForm :schema="schema" :state="state" @submit="onSubmit" class="grid grid-cols-1 md:grid-cols-2 gap-3">
      <UFormGroup name="firstName" label="FirstName">
        <UInput v-model="state.firstName" icon="i-heroicons-user" />
      </UFormGroup>
      <UFormGroup name="lastName" label="LastName">
        <UInput v-model="state.lastName" icon="i-heroicons-user" />
      </UFormGroup>
      <UFormGroup class="col-span-full" name="email" label="Email" v-if="false">
        <UInput v-model="state.email" placeholder="example@gmail.com" icon="i-heroicons-envelope" />
      </UFormGroup>
      <UFormGroup class="col-span-full" name="password" label="Password">
        <UInput v-model="state.password" icon="i-heroicons-lock-closed" />
      </UFormGroup>
      <UButton block label="register" type="submit" color="primary" class="dark:text-white col-span-full capitalize"
        size="lg" />
    </UForm>
    <UDivider label="Or" class="my-2" />
    <!-- Providers -->
    <UButton icon="mdi-github" block label="Sign in with Github" color="gray"
      class="dark:text-white dark:hover:bg-gray-700 dark:bg-gray-600 capitalize" size="lg" />
    <UButton icon="logos:google-icon" block label="Sign in with Github" color="white"
      class="my-2 dark:text-white capitalize" size="lg" variant="solid" />
    <p class="text-center">already have an account? <NuxtLink class="text-main font-semibold" to="/auth/login">login
      </NuxtLink>
    </p>
  </main>
</template>
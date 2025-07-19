<script setup lang='ts'>
import { z } from "zod";
import type { FormSubmitEvent, Form } from "#ui/types"
import type { Login, LoginError, User } from "~/types";

const { login } = useAPI()

const form = ref<Form<Schema>>()

const userStore = useUserStore()

const schema = z.object({
  username: z.string().min(3).max(50),
  // email: z.string().email(),
  password: z.string({ message: 'password is required' }),
})

const state = reactive<Login>({
  // email: undefined,
  // password: undefined,
  username: "emilys",
  // "email": "eve.holt@reqres.in",
  password: 'emilyspass'
})

type Schema = z.output<typeof schema> //{email?:string,password?:string}


const onSubmit = async (event: FormSubmitEvent<Schema>) => {
  console.log('submitin')
  // console.log({ event: event.data })
  const body: Login = { username: event.data.username, password: event.data.password }

  login(body, () => {
    // state.username = undefined;
    // state.password = undefined
    state.username = "emilys"
    // "email": "eve.holt@reqres.in",
    state.password = 'emilyspass'
  })
}



</script>

<template>
  <main id='auth-login' class='semi-card-ring py-3 max-w-md mx-auto'>
    <!-- head-title -->
    <div class="text-center mb-1">
      <div v-text="'Login'" class="semi-title mb-1" />
      <!-- <p v-text="'Login to your account to continue'" /> -->
      <p>
        username: "emilys",<br />
        password: "emilyspass"
      </p>
    </div>
    <!-- FORM -->
    <UForm ref="form" :schema="schema" :state="state" @submit="onSubmit" class="space-y-3">
      <UFormGroup name="username" label="Username">
        <UInput v-model="state.username" placeholder="MoFawzey" icon="i-heroicons-user" />
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
    <!-- TODO:: uncheck later -->
    <!-- <p class="text-center">
      Don't you have an account?
      <NuxtLink to="/auth/register" class="text-main font-semibold">Register</NuxtLink>
    </p> -->

  </main>
</template>
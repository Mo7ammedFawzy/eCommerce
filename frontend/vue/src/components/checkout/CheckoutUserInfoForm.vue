<script setup lang='ts'>
import {z} from "zod"
import type {Form, FormSubmitEvent} from "@nuxt/ui"
import {v4 as uuidv4} from 'uuid';
import {Country, Customer, Order, User} from "@/types/common.ts";
import {computed, reactive, ShallowRef, useTemplateRef} from "vue";
import {RouterNames} from "@/router/routerNames.ts";
import {push} from "notivue";
import {useOrderStore} from "@/store/order.ts";
import {useCartStore} from "@/store/cart.ts";
import {REGEX} from "@/utils/constants";
import {getCountries} from "@/composables/useApi.ts";
import CommonUtils from "@/utils/CommonUtils.ts";

const orderStore = useOrderStore()
const cartStore = useCartStore()
const props = withDefaults(defineProps<{ user?: User | null, selectedPaymentMethod?: Order['paymentMethod'], general?: boolean }>(), {
  general: false,
  selectedPaymentMethod: "cash_on_delivery"
})

const uFormRef = useTemplateRef<Form<any | null>>("uFormRef")

const canEdit = defineModel({required: false, default: false})
const isInputDisabled = computed(() => !canEdit.value && props.general)

const schema = z.object({
  // username | email | passcode | phoneNumber
  firstName: z.string().min(3).max(50),
  lastName: z.string().min(3).max(50),
  email: z.string().email('invalid email'),
  phoneNumber: z.string().regex(REGEX.phoneNumber, 'invalid phone number'),
  address: z.string().min(3).max(100),
  townCity: z.string().min(3).max(100),
  state: z.string().min(3).max(100),
  zip: z.string().regex(REGEX.zipCode, 'invalid zip code'),
  country: z.string().min(2, {message: 'select country'})
})

const state = reactive<Customer>({
  firstName: props.user?.firstName ?? "",
  lastName: props.user?.lastName ?? "",
  email: props.user?.email ?? "",
  phoneNumber: "",
  address: "",
  townCity: "",
  state: "",
  zip: "",
  country: "",
})

type Schema = z.output<typeof schema>

 function onSubmit(event: FormSubmitEvent<Schema>) {
  // check if there is items in cart first

  if (props.general)
    return;
  if (cartStore.isCartEmpty) {
    CommonUtils.navigateTo({name: RouterNames.PRODUCTS});
    return
  }
  const order: Order = {
    createdAt: new Date(),
    id: uuidv4(),
    paymentMethod: props.selectedPaymentMethod, // cash
    state: "pending", //first state is pending
    total: cartStore.getTotalPriceAfterShipping,
    customer: {...event.data},
    items: [...cartStore.cart]
  }
   orderStore.placeOrder(order)
  push.success('Order Successfully has ben placed')
}

const {data} = getCountries()

const normalize = computed(() => (data: Country[]) => {
  return data?.map(country => country?.name?.common ?? '') ?? []
})

defineExpose<{ uFormRef: Readonly<ShallowRef<Form<any> | null>>, onSubmit: Function }>({
  onSubmit,
  uFormRef
})


</script>

<template>
  <!-- <UButton @click="props.placeOrder" label="getData" ref="form" /> -->
  <UForm ref="uFormRef" :schema="schema" @submit="onSubmit" :state="state" :validate-on="['change', 'input', 'change']"
         class="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
    <UFormField name="firstName" label="First Name">
      <UInput v-model="state.firstName" variant="outline" :ui="{base:'bg-background',root:'w-full'}" color="primary" :disabled="isInputDisabled"
              size="xl"/>
    </UFormField>
    <UFormField name="lastName" label="Last Name">
      <UInput :ui="{base:'bg-background',root:'w-full'}" v-model="state.lastName" size="xl" :disabled="isInputDisabled"/>
    </UFormField>
    <UFormField name="email" label="Email">
      <UInput :ui="{base:'bg-background',root:'w-full'}" v-model="state.email" size="xl" :disabled="isInputDisabled"/>
    </UFormField>
    <UFormField name="phoneNumber" label="Phone">
      <UInput :ui="{base:'bg-background',root:'w-full'}" v-model="state.phoneNumber" size="xl" :disabled="isInputDisabled"/>
    </UFormField>
    <UFormField class="col-span-full" name="address" label="Address">
      <UInput :ui="{base:'bg-background',root:'w-full'}" v-model="state.address" size="xl" :disabled="isInputDisabled"/>
    </UFormField>
    <div class="col-span-full grid grid-cols-1 sm:grid-cols-3 gap-3">
      <UFormField name="townCity" label="Town City">
        <UInput :ui="{base:'bg-background',root:'w-full'}" v-model="state.townCity" size="xl" :disabled="isInputDisabled"/>
      </UFormField>
      <UFormField name="state" label="State">
        <UInput :ui="{base:'bg-background',root:'w-full'}" v-model="state.state" size="xl" :disabled="isInputDisabled"/>
      </UFormField>
      <UFormField name="zip" label="ZIP/POSTAL CODE">
        <UInput :ui="{base:'bg-background',root:'w-full'}" v-model="state.zip" size="xl" :disabled="isInputDisabled"/>
      </UFormField>
    </div>
    <UFormField v-if="!general" class="col-span-full" name="country" label="Country">
      <USelectMenu :ui="{base:'bg-background'}" v-model="state.country" class="w-full" :items="normalize(data)" color="neutral" size="xl"/>
    </UFormField>
  </UForm>
</template>

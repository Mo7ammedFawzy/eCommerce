<script setup lang='ts'>
import {REGEX} from "~/constants"
import {z} from "zod"
import type {FormSubmitEvent} from "#ui/types"
import type {Customer, Order, User} from "~/types";
import {v4 as uuidv4} from 'uuid';

const orderStore = useOrderStore()
const cartStore = useCartStore()

const props = withDefaults(defineProps<{ user?: User | null, selectedPaymentMethod?: Order['paymentMethod'], general?: boolean }>(), {
  general: false,
  selectedPaymentMethod: "cash_on_delivery"
})

const form = ref<HTMLFormElement>()

const canEdit = defineModel({required: false, default: false})
const isInputDisabled = computed(() => !canEdit.value && props.general)

const {getCountries} = useAPI()

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

async function onSubmit(event: FormSubmitEvent<Schema>) {
  // check if there is items in cart first
  if (props.general) return;
  if (cartStore.isCartEmpty) {
    return navigateTo('/products')
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

  // push to orders
  orderStore.placeOrder(order)
  push.success('Order Successfully has ben placed')
}

const {data} = getCountries()

defineExpose<{ form: Ref<HTMLFormElement | undefined>, onSubmit: Function }>({
  onSubmit,
  form
})


</script>

<template>
  <!-- <UButton @click="props.placeOrder" label="getData" ref="form" /> -->
  <UForm ref="form" :schema="schema" @submit="onSubmit" :state="state" :validate-on="['change', 'input', 'submit']"
         class="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4" v-if="true">

    <UFormGroup name="firstName" label="First Name">
      <UInput v-model="state.firstName" :disabled="isInputDisabled" size="xl"/>
    </UFormGroup>
    <UFormGroup name="lastName" label="Last Name">
      <UInput v-model="state.lastName" size="xl" :disabled="isInputDisabled"/>
    </UFormGroup>
    <UFormGroup name="email" label="Email">
      <UInput v-model="state.email" size="xl" :disabled="isInputDisabled"/>
    </UFormGroup>
    <UFormGroup name="phoneNumber" label="Phone">
      <UInput v-model="state.phoneNumber" size="xl" :disabled="isInputDisabled"/>
    </UFormGroup>
    <UFormGroup class="col-span-full" name="address" label="Address">
      <UInput v-model="state.address" size="xl" :disabled="isInputDisabled"/>
    </UFormGroup>
    <div class="col-span-full grid grid-cols-1 sm:grid-cols-3 gap-3">
      <UFormGroup name="townCity" label="Town City">
        <UInput v-model="state.townCity" size="xl" :disabled="isInputDisabled"/>
      </UFormGroup>
      <UFormGroup name="state" label="State">
        <UInput v-model="state.state" size="xl" :disabled="isInputDisabled"/>
      </UFormGroup>
      <UFormGroup name="zip" label="ZIP/POSTAL CODE">
        <UInput v-model="state.zip" size="xl" :disabled="isInputDisabled"/>
      </UFormGroup>
    </div>
    <UFormGroup v-if="!general" class="col-span-full bg-red-600" name="country" label="Country">
      <USelectMenu v-model="state.country" :options="data" color="white" size="xl"/>
    </UFormGroup>
  </UForm>
</template>

<style>
.custom .dropdown-menu {
  background: red !important;
}
</style>
<script setup lang="ts">
import SectionHeader from "~/components/Base/SectionHeader.vue";
import type {Form, FormSubmitEvent} from "#ui/types";
import {z} from "zod";
import type {AddProduct} from "~/types";
import { UFileUpload } from '@nuxt/ui'

const uFormRef = useTemplateRef<Form<any>>("uFormRef")
type ProductStates = {
  [K in keyof AddProduct]: AddProduct[K] | undefined
}
const colorToAdd = ref<string>()

const state = reactive<ProductStates>({
  category: undefined,
  colors: undefined,
  title: undefined,
  description: undefined,
  price: undefined,
  images: undefined,
  discount: undefined,
  quantity: undefined,
  sizes: undefined
})
const MAX_FILE_SIZE = 2 * 1024 * 1024 // 2MB
const MIN_DIMENSIONS = {width: 200, height: 200}
const MAX_DIMENSIONS = {width: 4096, height: 4096}
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
const formatBytes = (bytes: number, decimals = 2) => {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const dm = decimals < 0 ? 0 : decimals
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i]
}
const schema = z.object({
  title: z.string().min(3).max(50),
  description: z.string().min(5).max(1000),
  price: z.number().nonnegative(),
  category: z.string().min(1),
  images: z.array(
      z.instanceof(File, {
        message: 'Please select an image file.'
      })
          .refine((file) => file.size <= MAX_FILE_SIZE, {
            message: `The image is too large. Please choose an image smaller than ${formatBytes(MAX_FILE_SIZE)}.`
          })
          .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file.type), {
            message: 'Please upload a valid image file (JPEG, PNG, or WebP).'
          })
          .refine(
              (file) =>
                  new Promise((resolve) => {
                    const reader = new FileReader()
                    reader.onload = (e) => {
                      const img = new Image()
                      img.onload = () => {
                        const meetsDimensions =
                            img.width >= MIN_DIMENSIONS.width &&
                            img.height >= MIN_DIMENSIONS.height &&
                            img.width <= MAX_DIMENSIONS.width &&
                            img.height <= MAX_DIMENSIONS.height
                        resolve(meetsDimensions)
                      }
                      img.src = e.target?.result as string
                    }
                    reader.readAsDataURL(file)
                  }),
              {
                message: `The image dimensions are invalid. Please upload an image between ${MIN_DIMENSIONS.width}x${MIN_DIMENSIONS.height} and ${MAX_DIMENSIONS.width}x${MAX_DIMENSIONS.height} pixels.`
              }
          )
  ).min(1),
  colors: z.array(z.string()).optional(),
  discount: z.number().min(0).max(100).optional(),
})


type Schema = z.output<typeof schema>

function onSubmit(event: FormSubmitEvent<Schema>) {
  console.log(event)
}
</script>

<template>
  <BaseWrapper>
    <SectionHeader title="add product"/>
    <UDivider/>
    <!--    -->
    <UForm ref="uFormRef" :schema="schema" @submit="onSubmit" :state="state" :validate-on="['change', 'input', 'submit']"
           class="grid grid-cols-1  sm:grid-cols-7 gap-3">
      <div class="col-span-full sm:col-span-5">
        <UFormGroup name="title" label="Product Title">
          <UInput v-model="state.title" size="xl"/>
        </UFormGroup>
        <UFormGroup name="category" label="category">
          <UInput v-model="state.category" size="xl"/>
        </UFormGroup>
        <UFormGroup class="col-span-full" name="colors" label="colors">
          <UInput multiple v-model="colorToAdd" size="xl"/>
        </UFormGroup>
        <div class="col-span-full grid grid-cols-1 sm:grid-cols-3 gap-3">
          <UFormGroup name="discount" label="discount">
            <UInput v-model="state.discount" size="xl"/>
          </UFormGroup>
          <UFormGroup name="description" label="description">
            <UInput v-model="state.description" size="xl"/>
          </UFormGroup>
        </div>
      </div>
      <div class="col-span-full sm:col-span-2">
        <UFormGroup class="col-span-full" name="images" label="images">
          <UFileUpload
              icon="i-lucide-image"
              label="Drop your image here"
              description="SVG, PNG, JPG or GIF (max. 2MB)"
              class="w-96 min-h-48"
              multiple
              accept="image/*"
              v-model="state.images"
              size="xl"
          />
        </UFormGroup>
        <UFormGroup name="price" label="price">
          <UInput v-model="state.price" size="xl"/>
        </UFormGroup>
        <UFormGroup name="quantity" label="quantity">
          <UInput v-model="state.quantity" size="xl"/>
        </UFormGroup>
        <UButton block label="create product" size="xl"/>
      </div>
    </UForm>
  </BaseWrapper>
</template>

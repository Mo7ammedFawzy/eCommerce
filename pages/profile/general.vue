<script setup lang='ts'>

const userStore = useUserStore()



const imgPreview = ref()
const imageIsLoading = ref(false)
const canEdit = ref(false)

const onFileChange = async (e: any) => {
  imageIsLoading.value = true
  const file = e.target.files[0]
  if (!file) return;
  const reader = new FileReader()
  reader.onload = () => {
    imgPreview.value = reader.result
  }
  reader.readAsDataURL(file)
  await delay(1500)
  imageIsLoading.value = false
}

const startLoading = async () => {
  imageIsLoading.value = true
  await delay(1500)
  imageIsLoading.value = false
}

onMounted(async () => {
  await startLoading()
})

onUnmounted(() => {
  imageIsLoading.value = false;
})

const canShowEmptyState = computed(() => !imgPreview.value && !imageIsLoading.value);
const canShowImg = computed(() => imgPreview.value && !imageIsLoading.value)
const canLoadSkeleton = computed(() => !imgPreview.value || imageIsLoading.value)

const saveUserInfoChanges = () => {
  if (!canEdit.value) return;
  push.success('Changes has been saved')
  canEdit.value = false
}

</script>

<template>
  <main id='profle-general-page' class='mt-6 min-h-screen mb-16 md:mb-8'>
    <BaseWrapper>
      <BasePageHeader title="general" />
      <div class="profile-genral__wrapper grid grid-cols-3 gap-6 mt-8">
        <!-- upload-photo -->
        <div class="upload-photo col-span-full md:col-span-1 semi-card-ring flex items-center">
          <div class="upload-photo__wrapper mx-auto max-w-xs flex flex-col items-center justify-center text-center">
            <div
              class="circle-dotted w-40 aspect-square  rounded-full border-dashed border-gray-400 dark:border-gray-600 p-3 border">
              <input accept="image/*" @change="onFileChange" type="file" class="hidden" id="upload-file" />
              <label for="upload-file" type="file"
                class="placeholder bg-slate-50 relative  dark:bg-app-foreground w-full aspect-square flex rounded-full cursor-pointer dark:hover:opacity-70 select-none dark:text-white">
                <ProfileUploadImageContent v-if="canShowEmptyState" />
                <USkeleton v-else-if="canLoadSkeleton" class="w-full h-full rounded-full dark:bg-gray-700" />
                <NuxtImg :src="imgPreview" class="w-full  aspect-square rounded-full" v-else />
                <!-- <div v-else class="w-full h-full p-3 rounded-full overflow-hidden">
                </div> -->
                <div class="absolute flex items-center justify-center top-0 right-0 aspect-square rounded-full"
                  v-if="canShowImg">
                  <div
                    class="bg-white w-1/2 aspect-square absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full" />
                  <UIcon class=" text-main" name="bitcoin-icons:verify-filled" size="40" />
                </div>

                <!-- <ProfileUploadImageContentSkeleton v-else/> -->
              </label>
            </div>
            <!-- hint -->
            <div class="min-h-9 mt-3 w-full">
              <div class="two-lines w-full space-y-2" v-if="canLoadSkeleton && !canShowEmptyState">
                <USkeleton class="dark:bg-gray-700 w-full h-2.5" />
                <USkeleton class="dark:bg-gray-700 w-3/4 mx-auto h-2.5" />
              </div>
              <p class="text-xs upload-photo__hint" v-else>
                Allowed *.jpeg, *.jpg, *.png, *.gif<br />
                max size of 3145728
              </p>
            </div>
          </div>
        </div>
        <!-- user-info -->
        <div class="user-info col-span-full md:col-span-2 semi-card-ring">
          <CheckoutUserInfoForm general v-model="canEdit" :user="userStore.user" />
          <div class="space-x-3 float-end flex items-center mt-3">
            <UButton @click="canEdit = true" label="Edit" color="gray" class="dark:text-white px-6
          " icon="i-heroicons-pencil-square" />
            <UButton @click="saveUserInfoChanges" :disabled="!canEdit" label="Save" color="primary" class="dark:text-white disabled-btn px-6
          " />
          </div>
        </div>
      </div>
    </BaseWrapper>
  </main>
</template>
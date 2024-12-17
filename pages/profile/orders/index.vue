<script setup lang='ts'>

const orderStore = useOrderStore()

const loadLoader = ref(true)
const loadSkeleton = ref(false)
const canExecute = ref(false)

onMounted(async () => {
  await loadingState()
})


const loadingState = async () => {
  //  loadLoader => loadSkeleton => canExecute
  loadLoader.value = true
  await delay(1000)
  loadLoader.value = false
  loadSkeleton.value = true
  await delay(1000)
  loadSkeleton.value = false
  canExecute.value = true
}

const reset = () => {
  canExecute.value = false
  loadSkeleton.value = false
  loadLoader.value = true
}

onUnmounted(() => {
  reset()
})

// length is more than 0 |
const canLoadOrders = computed(() => orderStore.orders && !orderStore.isOrdersEmpty && canExecute.value && !loadLoader.value && !loadSkeleton.value)

const canLoadLoader = computed(() => loadLoader.value && !loadSkeleton.value && !canExecute.value)

const canLoadSkeleton = computed(() => !loadLoader.value && loadSkeleton.value && !canExecute.value && !orderStore.isOrdersEmpty)

</script>

<template>
  <!-- first loadLoader => laodSkeleton => canExecute -->
  <main id='orders-page' >
    <BaseWrapper class='mt-8'>
      <BasePageHeader title="orders" />
      <!-- order-list -->
      <div class="order-details">
        <div class="order-details__wrapper max-h-[500px]  overflow-x-auto t-ring" main-scroll>
          <!-- template -->
          <div
            class="order-details__wrapper--template text-white hidden md:grid grid-cols-9 bg-main-500 rounded-t-md p-3  lg:p-4 text-center items-center ">
            <!-- product+items+total_status+date+action -->
            <!-- product-info -->
            <div v-text="'Product'"
              class="text-start md:col-span-2 lg:col-span-3 min-h-12  items-center font-semibold flex" />
            <!-- items -->
            <div v-text="'Items'" class="font-semibold" />
            <!-- TOTOAL -->
            <div v-text="'Total'" class="col-span-1 font-semibold" />
            <!-- status -->
            <div v-text="'Status'" class="col-span-2 font-semibold" />
            <!-- date -->
            <div v-text="'Date'" class="md:col-span-2 lg:col-span-1 font-semibold" />
            <!-- action -->
            <div v-text="'Action'" class="col-span-1 font-semibold text-end" />
          </div>
          <div v-if="canLoadOrders">
            <template v-for="(order, index) in orderStore.orders">
              <OrderCard :order="order" />
              <UDivider v-if="orderStore.orders.length - 1 !== index" />
            </template>
          </div>
          <div v-else-if="canLoadSkeleton">
            <template v-for="(order, index) in orderStore.orders">
              <OrderCardSkeleton />
              <UDivider v-if="orderStore.orders.length - 1 !== index" />
            </template>
          </div>
          <div v-else-if="canLoadLoader" class="py-10">
            <NuxtImg src="/svg/spinner.svg" class="max-h-40 w-full aspect-auto mx-auto" placeholder="/svg/spinner.svg"
              placeholder-class="max-h-40 w-full aspect-square" />
          </div>
          <div v-else class="py-10">
            <NuxtImg src="/products/empty-data.png" class="max-h-40 mx-auto" placeholder="/svg/spinner.svg"
              placeholder-class="text-white max-h-40 w-full aspect-square" />
          </div>
        </div>
      </div>
    </BaseWrapper>
  </main>
</template>
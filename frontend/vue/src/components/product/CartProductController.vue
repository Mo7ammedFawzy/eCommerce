<script setup lang='ts'>


const props = defineProps<{ cartItem: any, readonly?: boolean, checkedOut?: boolean }>()


</script>

<template>
  <div :class="{ 'min-w-[550px]': !readonly }">
    <div class="grid gap-3 font-semibold items-center text-center"
         :class="[props.readonly ? 'grid-cols-3' : 'grid-cols-8']">
      <RouterLink
          to="/" :class="[props.readonly ? 'col-span-2' : 'col-span-3 xl:col-span-4', { 'hover:bg-white/10 cursor-pointer': !props.checkedOut }]"
          class="text-left p-1 ">
        <div class="flex items-center gap-2 my-1">
          <div class="p-1.5 overflow-hidden rounded-full bg-white aspect-square flex items-center justify-center"
               :class="[!props.readonly ? 'w-20' : 'w-12']">
            <img :src="props.cartItem.product.images" class="object-contain aspect-auto w-full rounded-md max-h-full"
                 :alt="props.cartItem.product.label" loading="lazy"/>
          </div>
          <div class="flex-1  three-dots" v-text="props.cartItem.product.label"
               :class="[!props.readonly ? 'text-sm' : 'text-xs']"/>
        </div>
      </RouterLink>
      <div class="col-span-2" v-if="!readonly">
        <QuantityController :quantity="{}" :max-items="MAX_ITEMS"/>
      </div>
      <div class="flex items-center"
           :class="[props.readonly ? 'col-span-1 justify-end' : 'col-span-2 xl:col-span-1 justify-center',]">
        <div class="w-fit text-center">
          ${{ 12 }}<br/>
          <p class="text-xs" v-text="props.readonly ? `×${12}` : ''"/>
        </div>
      </div>
      <div class="col-span-1" v-if="!readonly">
        <UButton square icon="i-heroicons-trash" size="sm" class="rounded-full"/>
      </div>
    </div>
  </div>
</template>
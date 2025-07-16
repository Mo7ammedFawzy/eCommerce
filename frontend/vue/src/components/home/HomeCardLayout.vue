<template>
  <BaseWrapper full-width class="items-center">
    <div class="ps-4 flex flex-col justify-center space-y-1 h-full max-h-full">
      <slot name="title"/>
      <slot name="subtitle"/>
      <div class="flex gap-1 items-center">
        <slot name="action"/>
      </div>
    </div>
    <div class="w-full h-full relative">
      <slot name="image"/>
    </div>
  </BaseWrapper>
</template>

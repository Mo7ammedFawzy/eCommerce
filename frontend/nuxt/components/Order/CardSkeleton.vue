
<template>
 <div
  class="order-details__wrapper grid gap-3 grid-cols-10 md:grid-cols-9 items-center text-center rounded-t-md p-3 lg:p-4">
  <div class="order-first col-span-full md:col-span-2 lg:col-span-3 flex items-center gap-2">
   <!-- img -->
   <USkeleton class="img__wrapper hidden md:block min-w-14 max-w-14 aspect-square p-2   rounded-full" />
   <!-- <USkelton class="w-full  max-h-full aspect-auto rounded-md" /> -->
   <USkeleton class="three-dots  font-semibold md:font-normal md:!body-text md:text-xs w-full h-2" />
   <!-- text -->
  </div>
  <!-- items -->
  <div
   class="text-end md:text-center text-sm font-semibold col-span-2 md:col-span-1 order-[0] flex items-center justify-center">
   <USkeleton class="w-3/4 h-2" />
   <!-- <USkeleton  class="w-4 h-2"/> -->
  </div>
  <!-- TOTOAL -->
  <div class="hidden md:block col-span-1 font-semibold text-sm three-dots">
   <USkeleton class="w-3/4 h-2" />
  </div>
  <!-- status -->
  <div
   class="text-end md:text-center col-span-3 md:col-span-2  font-semibold select-none order-2 md:order-none flex items-center justify-center">
   <!-- <UBadge size="sm" class="text-xs" variant="soft" /> -->
   <USkeleton class="w-3/4 h-8" />
  </div>

  <USkeleton
   class="text-start md:text-center text-xs col-span-3 md:col-span-2 lg:col-span-1 font-semibold three-dots h-2 order-1 md:order-none" />
  <!-- action -->
  <div class="flex items-center  justify-start md:justify-end order-last col-span-2 md:col-span-1 font-semibold">
   <USkeleton  class="rounded-full h-8 aspect-square"  />
  </div>
 </div>
</template>
<template>
  <section class="overflow-hidden bg-[#fffaf5] pt-10 md:pt-16">
    <BaseWrapper class="grid items-center gap-10 pb-16 md:grid-cols-2 md:pb-24">
      <div class="order-2 text-center md:order-1 md:text-left">
        <p class="mb-4 text-sm font-bold uppercase tracking-[.22em] text-rose-600">The everyday edit</p>
        <h1 class="max-w-xl text-5xl font-black leading-[1.02] text-slate-900 sm:text-6xl">Good things,<br><span class="text-rose-600">well chosen.</span></h1>
        <p class="mx-auto mt-6 max-w-md text-base leading-7 text-slate-600 md:mx-0">A brighter, simpler place to discover useful favorites for your home, wardrobe, and everyday life.</p>
        <div class="mt-8 flex flex-wrap justify-center gap-3 md:justify-start"><UButton to="/products" size="xl" class="!rounded-full !bg-slate-900 !px-7 !font-bold hover:!bg-rose-600">Shop new arrivals</UButton><UButton to="/products" variant="outline" size="xl" class="!rounded-full !border-slate-300 !px-7 !text-slate-800">Browse categories</UButton></div>
        <div class="mt-10 flex justify-center gap-7 text-left md:justify-start"><div><b class="block text-lg">Free delivery</b><span class="text-xs text-slate-500">On qualifying orders</span></div><div><b class="block text-lg">Easy returns</b><span class="text-xs text-slate-500">Within 30 days</span></div></div>
      </div>
      <div class="order-1 md:order-2"><div class="relative aspect-[4/4.6] overflow-hidden rounded-[2.5rem] bg-rose-100 shadow-xl"><img src="@/assets/imgs/home/landing-2.jpg" alt="Curated everyday collection" class="size-full object-cover" /><div class="absolute inset-x-5 bottom-5 flex items-center justify-between rounded-2xl bg-white/90 p-4 backdrop-blur"><div><p class="text-xs text-slate-500">Fresh picks for you</p><p class="font-bold text-slate-900">New season essentials</p></div><span class="flex size-10 items-center justify-center rounded-full bg-rose-600 text-white"><UIcon name="i-lucide-arrow-up-right" /></span></div></div></div>
    </BaseWrapper>
  </section>
</template>

<template>
  <UApp>
    <AppHeader/>
    <div class="pt-(--header-height) hidden md:block"/>
    <main class="min-h-[calc(90vh/2)]">
      <RouterView/>
    </main>
    <AppFooter/>
    <div class="pb-(--header-height)  md:hidden"/>
  </UApp>
</template>
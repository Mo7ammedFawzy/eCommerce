<template>
 <Header />
 <AppScrollToTopBtn v-if="true" />
 <!-- <BaseWrapper> -->
 <slot />
 <AppFooter />
 <!-- </BaseWrapper> -->
</template>
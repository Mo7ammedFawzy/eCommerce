<template>

 <Header v-if="true"/>
 <AppScrollToTopBtn v-if="true" />
 <!-- <BaseWrapper> -->
 <slot />
 <AppFooter />
 <!-- </BaseWrapper> -->
</template>
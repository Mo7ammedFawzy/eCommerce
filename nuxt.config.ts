// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: {
    enabled: true,

    timeline: {
      enabled: true,
    },
  },
  modules: [
    '@nuxt/ui',
    "@vueuse/nuxt",
    "@pinia/nuxt",
    "@nuxt/image",
    "@nuxtjs/google-fonts",
    "nuxt-viewport",//optionl
    "nuxt-marquee",//optionl
    "notivue/nuxt"
  ],
  css: [
    'notivue/notification.css', // Only needed if using built-in notifications
    'notivue/animations.css' // Only needed if using built-in animations
  ],
  colorMode: {
    preference: "light",
    fallback: "light",
    classSuffix: '',
  },
  googleFonts: {
    families: {
      Poppins: [100, 200, 300, 400, 500, 600, 700, 800, 900],
      Figtree: [100, 200, 300, 400, 500, 600, 700, 800, 900]
    }
  },
  image: {
    provider:"vercel"
  },
  icon: {
    customCollections: [
      {
        dir: "./public/svg",
        prefix: "my-icon"
      }
    ]
  },
  notivue: {
    limit: 3,
    
    // avoidDuplicates: true,
  },

})
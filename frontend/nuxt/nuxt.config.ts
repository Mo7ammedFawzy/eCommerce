// https://nuxt.com/docs/api/configuration/nuxt-config
const isProduction = process.env.NODE_ENV == "production"
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  app: {
    head: {
      title: "eCommerceHope",
      link: [
        {
          href: "/logo-dark.webp", rel: "icon", type: "image/webp"
        }
      ]
    }
  },
  devtools: {
    enabled: true,

    timeline: {
      enabled: true,
    },
  },
  // nitro: {
  //   imports: {
  //     a
  //   }
  // },
  modules: [
    '@nuxt/ui',
    "@vueuse/nuxt",
    "@pinia/nuxt",
    "@nuxt/image",
    "@nuxtjs/google-fonts",
    //optional
    "nuxt-viewport",
    //optional
    "nuxt-marquee",
    // "@sidebase/nuxt-auth",
    // 'nuxt-server-utils',
    "notivue/nuxt",
    "@formkit/auto-animate",
  ],
  css: [
    'notivue/notification.css',
    'notivue/animations.css',
    '~/assets/css/global.css'
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
    ...(isProduction && {provider: "vercel"})
  },
  icon: {
    customCollections: [
      {
        dir: "./public/svg",
        prefix: "my-icon"
      }
    ]
  },
  runtimeConfig: {
    authSecret: process.env.NUXT_AUTH_SECRET || 'key',
    githubClientId: process.env.GITHUB_CLIENT_ID,
    githubClientSecret: process.env.GITHUB_CLIENT_SECRET,
    public: {
      baseURL: process.env.BASE_URL || 'http://localhost:3000'
    }
  },
  notivue: {
    limit: 3,
  },
})

const site_name = 'Seek and Deploy';
const site_description = '“I can assure you that there is no doubt, not a possibility of error.” - HAL 9000';
const site_url = 'https://www.seekanddeploy.com'

export default defineNuxtConfig({
  compatibilityDate: '2025-04-30',
  devtools: {
    enabled: false
  },
  nitro: {
    preset: 'netlify-static'
  },
  //
  // Runtime config
  //
  runtimeConfig: {
    public: {
      isDev: process.env.NODE_ENV === 'development'
    }
  },
  //
  // SSR + Target
  //
  ssr: true,
  target: 'static',
  //
  // Sourcemap https://nuxtseo.com/sitemap/getting-started/installation
  //
  sourcemap: {
    server: true,
    client: false
  },
  //
  // Site https://nuxtseo.com/sitemap/getting-started/installation
  //
  site: {
    url: site_url,
    name: site_name
  },
  //
  // App
  //
  app: {
    head: {
      htmlAttrs: {
        lang: 'en'
      },
      title: site_name,
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0' },
        { property: 'og:type', content: 'website' },
        { property: 'og:site_name', content: site_name },
        { hid: 'description', name: 'description', content: site_description },
        { hid: 'og:title', property: 'og:title', content: site_name },
        { hid: 'og:description', property: 'og:description', content: site_description },
        { hid: 'og:url', property: 'og:url', content: site_url }
        // { name: 'twitter:card', content: 'summary_large_image' },
        // { name: 'apple-mobile-web-app-title', content: site_name }
      ]
      // link: [
      //   { rel: 'icon', type: 'image/png', sizes: '96x96', href: '/favicon-96x96.png' },
      //   { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
      //   { rel: 'shortcut icon', href: '/favicon.ico' },
      //   { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
      //   { rel: 'manifest', href: '/site.webmanifest' }
      // ]
    },
    pageTransition: {
      name: 'page',
      mode: 'out-in'
    }
  },
  //
  // CSS
  //
  css: [
    '~/assets/styles/reset.scss',
    '~/assets/styles/main.scss',
    '~/assets/styles/typography.scss'
  ],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
            @use "~/assets/styles/_vars.scss" as *;
            @use "~/assets/styles/_mixins.scss" as *;
          `
        }
      }
    }
  },
  //
  // Modules
  //
  modules: [
    '@nuxtjs/sitemap',
    '@nuxtjs/google-fonts'
  ],
  //
  // Googley Fonts
  //
  googleFonts: {
    families: {
      Lexend: [400, 600, 800]
    },
    display: 'swap',
    preconnect: true
  },
  //
  // Generate
  //
  generate: {
    fallback: true
  }
});

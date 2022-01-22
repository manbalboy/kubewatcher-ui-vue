export default {
  /*
   ** Headers of the page
   */
  head: {
    title: 'Nuxt Black Dashboard PRO by Creative Tim',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.png' }],

    bodyAttrs: {
      class: 'sidebar-mini', // delete the class to have the sidebar expanded by default. Add `white-content` class here to enable "white" mode.
    },
  },

  router: {
    linkExactActiveClass: 'active',
  },
  /*
   ** Customize the progress-bar color
   */
  loading: '~/components/LoadingTest.vue',
  /*
   ** Global CSS
   */
  css: [
    'assets/css/demo.css',
    'assets/css/font-awesome.css',
    'assets/css/nucleo-icons.css',
    'assets/sass/black-dashboard-pro.scss',
  ],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    `~/plugins/dashboard-plugin.js`,
    { src: '~/plugins/full-calendar.js', ssr: false },
    { src: '~/plugins/world-map.js', ssr: false },
  ],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [],
  /*
   ** Nuxt.js modules
   */
  modules: [
    '@nuxtjs/pwa',
    '@nuxtjs/axios',
    'nuxt-i18n',
    [
      '~/modules/log/',
      {
        IS_JSON_FORMAT: false,
      },
    ],
    [
      '~/modules/prometheus/',
      {
        port: 9091,
        metrics: {
          collectDefault: true,
          requestDuration: true,
        },
      },
    ],
  ],
  i18n: {
    locales: [
      {
        code: 'en',
        file: 'en.js',
      },
      {
        code: 'ar',
        file: 'ar.js',
      },
    ],
    lazy: true,
    langDir: 'lang/',
    defaultLocale: 'en',
  },
  /*
   ** Build configuration
   */
  build: {
    transpile: [/^element-ui/],
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {},
    babel: {
      plugins: [
        [
          'component',
          {
            libraryName: 'element-ui',
            styleLibraryName: 'theme-chalk',
          },
        ],
      ],
    },
  },
};

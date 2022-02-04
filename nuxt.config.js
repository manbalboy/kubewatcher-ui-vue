// import KUBE_WATCHER from './config/banner.js';

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
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.png' },
      { rel: 'stylesheet', href: '/css/bootstrap.min.css' },
      { rel: 'stylesheet', href: '/css/style.css' },
      { rel: 'stylesheet', href: '/css/custom.css' },
    ],
    script: [
      // { src: '/js/flexible.js' },
      { src: '/js/jquery-3.4.1.min.js' },
      { src: '/js/common.js' },
      { src: '/js/bootstrap-multiselect.js' },
      { src: '/js/panelTemplate.js' },
      { src: '/js/highcharts/highmaps.js' },
      { src: '/js/highcharts/highcharts-more.js' },
      { src: '/js/highcharts/solid-gauge.js' },
      { src: '/js/highcharts/tilemap.js' },
      { src: '/js/highcharts/exporting.js' },
      { src: '/js/highcharts/export-data.js' },
      { src: '/js/highcharts/accessibility.js' },
      { src: '/js/menu.js' },
    ],

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
    // 'assets/css/bootstrap.min.css',
    // 'assets/css/style.css',
    // 'assets/css/custom.css',
    'assets/sass/kubewatcher-ui.scss',
  ],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    // `~/plugins/dashboard-plugin.js`,
    // { src: '~/plugins/full-calendar.js', ssr: false },
    // { src: '~/plugins/world-map.js', ssr: false },
  ],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // '@nuxtjs/pwa',
    // '@nuxtjs/axios',
    // 'nuxt-i18n',
    // [
    //   'nuxt-logger-winston',
    //   {
    //     BANNER_STRING: KUBE_WATCHER,
    //   },
    // ],
    // [
    //   '~/modules/prometheus/',
    //   {
    //     port: 9091,
    //     metrics: {
    //       collectDefault: true,
    //       requestDuration: true,
    //     },
    //   },
    // ],
  ],
  // i18n: {
  //   locales: [
  //     {
  //       code: 'en',
  //       file: 'en.js',
  //     },
  //     {
  //       code: 'ar',
  //       file: 'ar.js',
  //     },
  //   ],
  //   lazy: true,
  //   langDir: 'lang/',
  //   defaultLocale: 'en',
  // },
  /*
   ** Build configuration
   */
  // build: {
  //   transpile: [/^element-ui/],
  //   /*
  //    ** You can extend webpack config here
  //    */
  //   extend(config, ctx) {},
  //   babel: {
  //     plugins: [
  //       [
  //         'component',
  //         {
  //           libraryName: 'element-ui',
  //           styleLibraryName: 'theme-chalk',
  //         },
  //       ],
  //     ],
  //   },
  // },
};

export default {
  mode: "universal",
  /*
   ** Headers of the page
   */
  head: {
    title: process.env.npm_package_name || "",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: process.env.npm_package_description || ""
      }
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: "#fff" },
  /*
   ** Global CSS
   */
  css: ["leaflet/dist/leaflet.css"],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: ["~/plugins/vue-content-placeholders"],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://bootstrap-vue.js.org/docs/
    "bootstrap-vue/nuxt",
    "nuxt-leaflet",
    // Doc: https://axios.nuxtjs.org/usage
    "@nuxtjs/axios",
    "@nuxtjs/pwa",
    [
      "nuxt-i18n",
      {
        locales: [
          { code: "en", iso: "en-US", name: "English", file: "en-US.js" },
          { code: "pl", iso: "pl-PL", name: "Polski", file: "pl-PL.js" }
        ],
        defaultLocale: "en",
        // differentDomains: true,
        lazy: true,
        langDir: "lang/"
      }
    ]
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {},
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {}
  }
};

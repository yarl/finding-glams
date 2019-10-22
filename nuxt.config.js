export default {
  mode: "universal",
  /*
   ** Headers of the page
   */
  head: {
    title: "%s - FindingGLAMs",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content:
          "Building a worldwide database of Galleries, Libraries, Archives and Museums and their collections on Wikipedia, available free, for everyone, to use and improve"
      }
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: {
    color: "#096",
    height: "5px"
  },
  /*
   ** Global CSS
   */
  css: ["leaflet/dist/leaflet.css"],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    "~/plugins/global.js",
    "~/plugins/vue-content-placeholders",
    {
      src: "~/plugins/vue-bootstrap-typeahead.js",
      ssr: false
    }
  ],
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

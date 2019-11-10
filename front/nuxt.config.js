module.exports = {
  /*
   ** Headers of the page
   */
  head: {
    title: "스터디그램",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "studyGram" }
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/studycon.ico" }]
  },
  /*
   ** Customize the progress bar color
   */
  loading: { color: "#3B8070" },
  /*
   ** modules
   */
  modules: ["@nuxtjs/axios"],

  buildModules: [
    // Simple usage
    "@nuxtjs/vuetify"
  ],
  // axios: {
  //   browserBaseURL: "http://localhost:3001",
  //   baseURL: "http://localhost:3001",
  //   https: false
  // },

  /*
   ** Build configuration
   */
  build: {
    /*
     ** Run ESLint on save
     */
    extend(config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: "pre",
          test: /\.(js|vue)$/,
          loader: "eslint-loader",
          exclude: /(node_modules)/
        });
      }
    }
  }
};

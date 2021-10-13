//const path = require("path");
module.exports = {
  //transpileDependencies: ["vuetify"],
  //outputDir: path.resolve(__dirname, "../server/public"),
  devServer: {
    proxy: {
      "/api": {
        target: "http://localhost:5000",
        //change to 5000 to work in development mode and 3000 for Raspberry

      }
    }
  },
  chainWebpack: config => {
    config.module
      .rule('raw')
      .test(/\.txt$/)
      .use('raw-loader')
      .loader('raw-loader')
      .end()
  },

  transpileDependencies: ["vuetify"],
};

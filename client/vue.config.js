const path = require("path");
module.exports = {
  transpileDependencies: ["vuetify"],
  outputDir: path.resolve(__dirname, "../server/public"),
  devServer: {
    proxy: 'https://mime-project.herokuapp.com/api',
}
};

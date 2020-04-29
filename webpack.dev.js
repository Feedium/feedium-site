const merge = require("webpack-merge");
const path = require("path");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const common = require("./webpack.common");

module.exports = merge(common, {
  mode: "development",

  output: {
    filename: "assets/script/[name].js",
    chunkFilename: "assets/style/normal/[id].css",
    path: path.join(__dirname, "dist")
  },

  devServer: {
    port: process.env.PORT || 3000,
    contentBase: path.join(process.cwd(), "./dist"),
    watchContentBase: true,
    quiet: false,
    open: true,
    historyApiFallback: {
      rewrites: [{from: /./, to: "404.html"}]
    }
  },

  plugins: [
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: [
        "dist/assets/script/**/*.js",
        "dist/assets/style/normal/**/*.css",
        "site/content/webpack.json"
      ]}),

    new MiniCssExtractPlugin({
      filename: "assets/style/normal/[name].css",
      chunkFilename: "assets/style/normal/[id].css"
    })
  ]
});

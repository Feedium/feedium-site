const merge = require("webpack-merge");
const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");

const common = require("./webpack.common.js");

module.exports = merge(common, {
  mode: "production",

  output: {
    filename: "assets/script/[name].js",
    chunkFilename: "assets/style/normal/[id].css",
    path: path.join(__dirname, "site/static")
  },

  optimization: {
    minimizer: [
      new TerserPlugin({
        cache: true,
        parallel: true,
        sourceMap: true,
        exclude: /\/node_modules\//,
      }),
      new MiniCssExtractPlugin({
        filename: "assets/style/normal/[name].css",
        chunkFilename: "assets/style/normal/[id].css"
      }),
      new OptimizeCSSAssetsPlugin({}),
    ]
  }
});

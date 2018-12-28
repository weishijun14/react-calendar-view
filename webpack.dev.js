const path = require("path");
const webpack = require("webpack");
const merge = require("webpack-merge");
const common = require("./webpack.common");

module.exports = merge(common, {
  mode: "development",
  devtool: "inline-source-map",
  devServer: {
    contentBase: "./dist", // publicPath 了解
    hot: true,
    open: false
  },
  resolve: {
    alias: {
      "react-calendar-view$": path.resolve(__dirname, "./src/index.js"),
      "react-calendar-view/lib": path.resolve(__dirname, "./src")
    }
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],
  output: {
    filename: "index.[hash].js",
    path: path.resolve(__dirname, "dist")
  }
});

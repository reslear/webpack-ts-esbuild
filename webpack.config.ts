import fs from "fs";
import webpack from "webpack";

// @ts-ignore
import { ESBuildPlugin, ESBuildMinifyPlugin } from "esbuild-loader";
import HtmlWebpackPlugin from "html-webpack-plugin";
import { CleanWebpackPlugin } from "clean-webpack-plugin";

const isDev = process.env.NODE_ENV === "development";

const config: webpack.Configuration = {
  mode: isDev ? "development" : "production",
  devtool: isDev ? "eval" : false,
  entry: "./src/index.ts",
  devServer: {
    publicPath: "/",
    contentBase: "./static",
    hot: true,
    stats: "errors-only",
    disableHostCheck: true,
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "esbuild-loader",
        options: {
          loader: "ts",
        },
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin({
      verbose: true,
    }),
    new ESBuildPlugin({}),

    new HtmlWebpackPlugin({
      title: "Output Management",
      template: "src/index.html",
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: false,
      },
    }),
  ],
  optimization: {
    minimize: true,
    minimizer: [
      new ESBuildMinifyPlugin({
        target: "es2015",
        minify: false,
      }),
    ],
  },
  output: {
    filename: "index_bundle.js",
    path: __dirname + "/dist",
  },
  resolve: {
    extensions: [".js", ".ts"],
  },
};

export default config;

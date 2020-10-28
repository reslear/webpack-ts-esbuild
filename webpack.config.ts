import fs from "fs";
import webpack from "webpack";

// @ts-ignore
import { ESBuildPlugin, ESBuildMinifyPlugin } from "esbuild-loader";
import HtmlWebpackPlugin from "html-webpack-plugin";
import { CleanWebpackPlugin } from "clean-webpack-plugin";

const { env } = process;

const config: webpack.Configuration = {
  mode: env.production ? "production" : "development",
  devtool: env.production ? "inline-source-map" : "eval",
  entry: "./src/index.ts",
  devServer: {
    contentBase: "./dist",
    hot: true,
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
};

export default config;

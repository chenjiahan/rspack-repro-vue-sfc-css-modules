import path from "path";
import { fileURLToPath } from "url";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import rspack from "@rspack/core";
import { VueLoaderPlugin } from "vue-loader";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const isRunningWebpack = !!process.env.WEBPACK;
const isRunningRspack = !!process.env.RSPACK;
if (!isRunningRspack && !isRunningWebpack) {
  throw new Error("Unknown bundler");
}

/**
 * @type {import('webpack').Configuration | import('@rspack/cli').Configuration}
 */
const config = {
  mode: "development",
  devtool: false,
  entry: {
    main: "./src/index",
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
          isRunningWebpack
            ? MiniCssExtractPlugin.loader
            : rspack.CssExtractRspackPlugin.loader,
          {
            loader: "css-loader",
            options: {
              modules: true,
            },
          },
        ],
      },
      {
        test: /\.vue$/,
        loader: "vue-loader",
        options: {
          // 注意，为了绝大多数功能的可用性，请确保该选项为 `true`
          experimentalInlineMatchResource: true,
        },
      },
    ],
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin(),
    isRunningWebpack
      ? new MiniCssExtractPlugin()
      : new rspack.CssExtractRspackPlugin(),
  ],
  output: {
    clean: true,
    path: isRunningWebpack
      ? path.resolve(__dirname, "webpack-dist")
      : path.resolve(__dirname, "rspack-dist"),
    filename: "[name].js",
  },
  experiments: {
    css: false,
  },
};

export default config;

require("dotenv").config();
const path = require("path");
const webpack = require('webpack');

const config = {
  entry: "./client/src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "main.js"
  },
  // mode: "development" // "production"
  devServer: {
    port: 3000,
    // hot: true,
    // liveReload: false
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env",
              ["@babel/preset-react", { "runtime": "automatic" }]]
          }
        },
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(gif|svg|jpg|png)$/,
        loader: "file-loader",
      },
    ]
  },
  resolve: {
    extensions: [".js", ".jsx", ".json", ".wasm", ".mjs", "*"]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.LOCALHOST': JSON.stringify(process.env.LOCALHOST),
      'process.env.PORT': JSON.stringify(process.env.SERVER_PORT),
    }),
  ],
};

module.exports = config;
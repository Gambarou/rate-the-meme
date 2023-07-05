const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CompressionPlugin = require('compression-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  devServer: {
    static: {
      directory: path.join(__dirname, "/build"),
      publicPath: '/',
    },
    // historyApiFallback: true,
    compress: true,
    port: 8080,
    proxy: {
      "/api": "http://localhost:3000",
    },
  },
  entry: path.resolve(__dirname, "client", 'index.js'),
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "bundle.js",
    publicPath: "/",
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'index.html')
    }),
    new CompressionPlugin({
      algorithm: 'gzip',
      test: /\.(js|css|html)$/,
      filename: '[path][base].gz',
      threshold: 10240,
      minRatio: 0.8
    }),
    // new BundleAnalyzerPlugin(),
  ],
  mode: process.env.NODE_ENV,
  module: {
    rules: [
      {
        test: /\.(png|jpg|gif)$/,
        use: {
          loader: 'file-loader',
          options: {},
        }
      },
      {
        test: /\.jsx?/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env', '@babel/preset-react'
            ],
          },
        },
      },
      {
        test: /\.css$/i,
        use: [
          'style-loader', 'css-loader', 'postcss-loader'
        ],
      },
      {
        test: /\.svg$/i,
        type: 'asset',
        resourceQuery: /url/, // *.svg?url
      },
      {
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/,
        resourceQuery: { not: [/url/] }, // exclude react component if *.svg?url
        use: ['@svgr/webpack'],
      },
    ],
  },
  resolve: {
    fallback: {
      crypto: require.resolve('crypto-browserify'),
      stream: false,
      buffer: require.resolve('buffer/'),
    },
  },
};

require('es6-promise').polyfill()
const webpack    = require('webpack');
const path       = require("path")
const assetsPath = path.resolve(__dirname, "./dist")
const srcPath    = path.resolve(__dirname, "./src")

module.exports = {
  entry: [
    srcPath + "/index.js",
  ],
  output: {
    path: assetsPath,
    filename: "bundle.js",
  },
  resolve: {
    extensions: ['', '.js'],
    modulesDirectories: ['node_modules', srcPath],
    alias: {
      'vue$': 'vue/dist/vue.common.js',
    }
  },
  module: {
    loaders: [
      {test: /\.css$/,   loaders: ["style", "css"] },
      {
        test: /\.less$/,
        loaders: [
          'style-loader', 'css-loader', 'less-loader'
        ]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      }
    ]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
      output: {
        comments: false,
      },
    }),
  ]
}

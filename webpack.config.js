const path = require('path');
const webpack = require('webpack');
const { VueLoaderPlugin } = require('vue-loader');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ZipPlugin = require('zip-webpack-plugin');

module.exports = {
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '/dist/',
    filename: 'inpage.js'
  },
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          cssModules: {
            localIdentName: '[local]__[hash:base64:5]',
            camelCase: true
          },
        }
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /css\/.+\.less$/,
        use: [
          'vue-style-loader',
          {
            loader: 'css-loader',
          },
          'less-loader'
        ]
      },
      {
        test: /\.less$/,
        exclude: /css/,
        use: [
          'vue-style-loader',
          {
            loader: 'css-loader',
            options: { modules: true }
          },
          'less-loader'
        ]
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'url-loader',
        options: {
          limit: 50000,
        }
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin()
  ],
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.common.js'
    }
  },
  devServer: {
    historyApiFallback: true,
    noInfo: true
  },

  optimization: {
    minimize: false
  },

  performance: {
    hints: false
  },
  devtool: '#eval-source-map'
};

if (process.env.NODE_ENV === 'development') {
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'DEV_MODE': JSON.stringify(true)
    })
  ])
}

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map';

  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: '"production"' },
      'DEV_MODE': JSON.stringify(false)
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    }),
    new CopyWebpackPlugin([
      { from: 'manifest.json' },
      { from: 'background.js' },
      { from: 'icon/*.png' }
    ]
    ),
    new ZipPlugin({
      path: 'zip',
      filename: 'pack.zip',
      exclude: [/\.map$/, /\.sketch$/, /\.psd$/]
    })
  ])
}

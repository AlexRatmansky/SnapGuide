const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const ZipPlugin = require('zip-webpack-plugin')
const webpack = require('webpack')

module.exports = {
  mode: 'production',
  entry: ['./src/index.tsx'],

  module: {
    rules: [
      {
        test: /(\.ts|\.tsx)/,
        loader: 'ts-loader',
        exclude: [path.resolve(__dirname, 'static'), path.resolve(__dirname, 'node_modules')],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-modules-typescript-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              modules: {
                mode: 'local',
                localIdentName: '[local]___[hash:base64:5]',
              },
            },
          },
          'sass-loader',
        ],
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg|pdf)/,
        exclude: /(node_modules|bower_components)/,
        loader: 'file-loader',
        options: {
          name: './images/[name].[ext]',
        },
      },
    ],
  },

  resolve: {
    alias: {
      actions: path.resolve(__dirname, 'src/actions'),
      components: path.resolve(__dirname, 'src/components'),
      constants: path.resolve(__dirname, 'src/constants'),
      containers: path.resolve(__dirname, 'src/containers'),
      helpers: path.resolve(__dirname, 'src/helpers'),
      reducers: path.resolve(__dirname, 'src/reducers'),
      store: path.resolve(__dirname, 'src/store'),
      styles: path.resolve(__dirname, 'src/styles'),
    },
    extensions: ['.ts', '.tsx', '.js'],
  },

  output: {
    path: path.resolve(__dirname, 'dist/'),
    filename: 'inpage.js',
  },

  optimization: {
    minimize: false,
  },

  performance: {
    hints: false,
  },

  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'MeasureMate',
      template: path.resolve(__dirname, 'static/index.html'),
    }),
    new CopyWebpackPlugin([
      { from: './static/manifest.json' },
      { from: './static/background.js' },
      { from: './icon/*.png' },
    ]),
    new ZipPlugin({
      path: 'zip',
      filename: 'pack.zip',
      exclude: [/\.map$/, /\.sketch$/, /\.psd$/, /^index\.html$/],
    }),
    new webpack.DefinePlugin({
      PRODUCTION: JSON.stringify(true),
      env: { DEVELOPMENT: JSON.stringify(true) },
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
  ],
}

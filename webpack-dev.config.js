const path = require('path')
const webpack = require('webpack')

module.exports = {
  mode: 'development',
  entry: './src/index.tsx',
  devtool: 'inline-source-map',

  module: {
    rules: [
      {
        test: /(\.ts|\.tsx)/,
        loader: 'ts-loader',
        include: [path.resolve(__dirname, 'src')],
        exclude: [path.resolve(__dirname, 'node_modules')],
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
        test: /\.(png|jpg|jpeg|gif|svg|pdf)$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
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
    extensions: ['*', '.ts', '.tsx', '.js', '.jsx', '.json'],
  },

  output: {
    path: path.resolve(__dirname, 'dist/'),
    publicPath: '/dist/',
    filename: 'bundle.js',
  },

  devServer: {
    contentBase: path.join(__dirname, 'static/'),
    port: 3001,
    publicPath: '/dist/',
    hotOnly: true,
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin({ multiStep: true }),
    new webpack.DefinePlugin({
      PRODUCTION: JSON.stringify(false),
      env: {
        DEVELOPMENT: JSON.stringify(false),
      },
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    }),
  ],
}

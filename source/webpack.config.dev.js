const path = require('path');
const webpack = require('webpack');
const BundleTracker = require('webpack-bundle-tracker');
const postcssPresetEnv = require('postcss-preset-env');

// const isDebug = process.env.NODE_ENV !== 'production';

module.exports = {
  mode: 'development',
  devtool: "source-map",

  context: __dirname,

  entry: [
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server',
    './react/js/index',
  ],

  output: {
    path: path.resolve('../public/react/bundles/'),
    filename: '[name].js',
    publicPath: 'http://localhost:3000/react/bundles/',
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    // new webpack.NoErrorsPlugin(), // don't reload if there is an error
    new BundleTracker({ filename: './webpack-stats.json' }),
  ],

  module: {
    rules: [
      // to transform JSX into JS
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env',
                '@babel/react', { plugins: ['@babel/plugin-proposal-class-properties'] }],
            },
          },
          { loader: 'react-hot-loader/webpack' },
        ],
      },
      {
        test: /\.scss$/,
        use: [
          { loader: 'isomorphic-style-loader' },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              esModule: false,
              sourceMap: true,
              modules: {
                localIdentName: '[name]_[local]-[hash:base64:5]',
              },
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                ident: 'postcss',
                plugins: () => [
                  postcssPresetEnv({
                    autoprefixer: { grid: true },
                  }),
                ],
              }
            },
          },
          { loader: 'sass-loader' },
        ],
      },
    ],
  },

  resolve: {
    modules: ['node_modules'],
    extensions: ['.js', '.jsx'],
  },
};
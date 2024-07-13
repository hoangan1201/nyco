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
    // 'webpack-dev-server/client?http://localhost:3000',
    // 'webpack/hot/only-dev-server',
    './react/js/index',
  ],

  output: {
    path: path.resolve('../public/react/bundles/'),
    filename: '[name].js',
    publicPath: 'http://localhost:3000/react/bundles/',
  },

  plugins: [
    // new webpack.HotModuleReplacementPlugin(),
    // new webpack.NoErrorsPlugin(), // don't reload if there is an error
    new BundleTracker({ filename: './webpack-stats.json' }),
  ],


  resolve: {
    modules: ['node_modules'],
    extensions: ['.js', '.jsx'],
  },
};

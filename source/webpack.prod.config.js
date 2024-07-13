var config = require('./webpack.config.base.js');
var BundleTracker = require('webpack-bundle-tracker');
const postcssPresetEnv = require('postcss-preset-env');

// config.mode = 'production';

config.module = {
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
        //  { loader: 'react-hot-loader/webpack' },
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
config.plugins = [
    new BundleTracker({ filename: './webpack-stats-prod.json' }),
];

// override any other settings here like using Uglify or other things that make sense for production environments.

module.exports = config;

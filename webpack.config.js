const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: {
    route: './src/js/router.js',
    common: [
      './src/js/main.js',
      './src/js/pages/search.js',
      './src/js/pages/listing.js',
      './src/js/pages/404.js',
    ],
  },
  output: {
    filename: '[name].js',
    path: `${__dirname}/dist`,
    clean: true,
  },
  module: {
    rules: [
      {
        test: /.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
          },
          'postcss-loader',
          'sass-loader',
        ],
      },
    ],
  },
  optimization: {
    splitChunks: { chunks: 'all' },
  },
  devtool: 'source-map',
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      inject: 'body',
      minify: {
        collapseWhitespace: true,
        removeComments: true,
        removeCommentsFromCDATA: true,
        minifyJS: false,
        minifyCSS: false,
        ignoreCustomFragments: [/{{[\s\S]*?}}/],
      },
    }),
    new HtmlWebpackPlugin({
      filename: '404.html',
      template: './src/pages/404.html',
      inject: false,
      minify: {
        collapseWhitespace: true,
        removeComments: true,
        removeCommentsFromCDATA: true,
        minifyJS: false,
        minifyCSS: false,
        ignoreCustomFragments: [/{{[\s\S]*?}}/],
      },
    }),
    new HtmlWebpackPlugin({
      filename: 'listing.html',
      template: './src/pages/listing.html',
      inject: false,
      minify: {
        collapseWhitespace: true,
        removeComments: true,
        removeCommentsFromCDATA: true,
        minifyJS: false,
        minifyCSS: false,
        ignoreCustomFragments: [/{{[\s\S]*?}}/],
      },
    }),
    new HtmlWebpackPlugin({
      filename: 'search.html',
      template: './src/pages/search.html',
      inject: false,
      minify: {
        collapseWhitespace: true,
        removeComments: true,
        removeCommentsFromCDATA: true,
        minifyJS: false,
        minifyCSS: false,
        ignoreCustomFragments: [/{{[\s\S]*?}}/],
      },
    }),
    new MiniCssExtractPlugin({
      filename: 'main.css',
    }),
  ],
  devServer: {
    static: './dist',
    port: 3010,
    open: true,
    hot: false,
    liveReload: true,
    historyApiFallback: true,
    devMiddleware: {
      writeToDisk: true,
    },
  },
};

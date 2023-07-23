const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

module.exports = {
    entry: {
        common: ['./src/js/common.js', './src/js/router.js'],
    },
    output: {
        filename: '[name].[chunkhash].js',
        path: `${__dirname}/dist`,
        clean: true,
    },
    module: {
        rules: [
            {
                test: [/.js$/],
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
        new MiniCssExtractPlugin({
            filename: 'main.css',
        }),
        new BrowserSyncPlugin({
            host: 'localhost',
            port: 3010,
            server: { baseDir: ['dist'] },
        }),
    ],
};

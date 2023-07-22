module.exports = {
    entry: {
        common: './src/js/common.js',
        route: './src/js/router.js',
    },
    mode: 'production',
    module: {
        rules: [
            {
                test: /\.js$/,

                loader: 'babel-loader',

                exclude: /node_modules/,
            },
        ],
    },
};

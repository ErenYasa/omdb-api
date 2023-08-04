module.exports = {
    plugins: [
        require('postcss-preset-env')({
            browsers: ['last 3 version', '> 1%'],
        }),
    ],
};

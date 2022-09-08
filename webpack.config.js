const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    mode: 'development',
    entry: {
        index: './src/index.js',
    },
    devServer: {
        static: './build',
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'SmithChart',
        }),
    ],
    output: {
        filename: '[name].bundle.js',
        path: path.resolve('./build'),
        clean: true,
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: { loader: 'babel-loader' }
            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            },
        ],
    },
    resolve: {
        extensions: ['.js', '.jsx'],
        modules: [path.resolve('./src/smithchart'), 'node_modules'],
    },
};

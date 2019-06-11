const webpack = require('webpack');
const htmlWebpackPlugin = require('html-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
    entry: ['babel-polyfill', './app/index.jsx'],
    output: {
        path: '/',
        filename: 'bundle.js',
        publicPath: '/'
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    module: {
        rules: [
            {test: /\.(js|jsx)$/, use: 'babel-loader', exclude: /node_modules/},
            {test: /\.scss$/, use: ['style-loader', {loader: 'css-loader', options: {
                modules: true,
                localIdentName: '[hash:base64:5]__[local]'
            }}, 'sass-loader']},
            {test: /\.(png|jpg|svg)$/, loader: 'url-loader?linit=8192'}
        ]
    },
    devServer: {
        historyApiFallback: true  
    },
    plugins: [
        new htmlWebpackPlugin({
            template: 'public/index.html',
            inject: false
        }), 
        new BundleAnalyzerPlugin()
    ],
    mode: 'development'
} 
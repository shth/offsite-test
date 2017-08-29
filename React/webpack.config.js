const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

// const HTMLWebpackPluginConfig = new HtmlWebpackPlugin({
//     template: path.join(__dirname, '../views/index.html'),
//     filename: 'index.html',
//     inject: 'body',
// });

module.exports = {
    entry: [
        './app/index.js',
    ],
    output: {
        path: path.join(__dirname, '../public/javascripts'),
        filename: 'index_bundle.js',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['es2015', 'react'],
                        },
                    }
                ]
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[path][name].[ext]'
                        }
                    }
                ]
            },
            {
                test: /\.scss$/i,
                use: [{
                    loader: "style-loader"
                }, {
                    loader: "css-loader"
                }, {
                    loader: "sass-loader"
                }]
            }
        ]
    },
    devServer: {
        inline: true,
        port: 8008,
    },
    devtool: 'cheap-module-eval-source-map',
    // plugins: [HTMLWebpackPluginConfig],
};
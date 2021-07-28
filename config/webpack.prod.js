const paths = require('./paths');

const webpack = require('webpack');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {VueLoaderPlugin} = require('vue-loader');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    mode: "production",
    devtool: false,
    entry: {
        app: './src/main.js'
    },
    output: {
        filename: paths.assetsPath('js/[name].[contenthash].js'),
        chunkFilename: paths.assetsPath('js/[id].[contenthash].js'),
        path: paths.dist,
        publicPath: '/',
    },
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
            '@': paths.src
        }
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        // Removes/cleans build folders and unused assets when rebuilding
        new CleanWebpackPlugin(),

        // Copies files from target to destination folder
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: paths.static,
                    to: paths.assets_dir,
                    globOptions: {
                        ignore: ['.*'],
                    },
                },
            ],
        }),

        // Generates an HTML file from a template
        new HtmlWebpackPlugin({
            title: 'Тестовый чат',
            filename: 'index.html',
            template: 'index.html',
            inject: true,
        }),

        new VueLoaderPlugin(),

        new MiniCssExtractPlugin({
            filename: paths.assetsPath('css/[name].[contenthash].css'),
        }),
    ],
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            // JavaScript: Use Babel to transpile JavaScript files
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },

            // Styles: Inject CSS into the head
            {
                test: /\.(s*)[a|c]ss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {loader: 'css-loader', options: {sourceMap: false, importLoaders: 1}},
                    {loader: 'postcss-loader', options: {sourceMap: false}},
                    {loader: 'sass-loader', options: {sourceMap: false}},
                ]
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: false,
                    name: paths.assetsPath('img/[name].[hash:7].[ext]'),
                    esModule: false,
                }
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                loader: 'file-loader',
                options: {
                    limit: false,
                    name: paths.assetsPath('media/[name].[hash:7].[ext]'),
                    esModule: false,
                    //fallback: 'file-loader'
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: false,
                    name: paths.assetsPath('fonts/[name].[hash:7].[ext]'),
                    esModule: false,
                }
            }
        ]
    },
    optimization: {
        splitChunks: {
            chunks: 'all',
        }
    }
};

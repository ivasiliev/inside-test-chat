const paths = require('./paths');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
    entry: {
        app: './src/main.js'
    },
    output: {
        filename: '[name].js',
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
        // Generates an HTML file from a template
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'index.html',
            inject: true,
        }),

        new VueLoaderPlugin(),
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
                    "vue-style-loader",
                    'style-loader',
                    {loader: 'css-loader', options: {sourceMap: false, importLoaders: 1}},
                    {loader: 'postcss-loader', options: {sourceMap: false}},
                    {loader: 'sass-loader', options: {sourceMap: false}},
                ]
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: paths.distResolve('img/[name].[hash:7].[ext]'),
                    esModule: false,
                }
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: paths.distResolve('media/[name].[hash:7].[ext]'),
                    esModule: false,
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: paths.distResolve('fonts/[name].[hash:7].[ext]'),
                    esModule: false,
                }
            }
        ]
    }
};
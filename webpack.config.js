var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    //devtool: 'eval-source-map', //配置生成Source Maps，选择合适的选项
    entry:  __dirname + "/app/main.js", //已多次提及的唯一入口文件
    output: {
        path: __dirname + "/dist", //打包后的文件存放的地方
        filename: "bundle.js" //打包后输出文件的文件名
    },
    module: { //在配置文件里添加JSON loader
        loaders: [
            {
                test: /\.json$/,
                loader: "json"
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel', //在webpack的module部分的loaders里进行配置即可
            },
            {
                test: /\.css$/,
                loader: 'style!css?modules' //跟前面相比就在后面加上了?modules
            },
        ]
    },
    postcss: [
        require('autoprefixer') //调用autoprefixer插件
    ],
    plugins: [
        new HtmlWebpackPlugin({
            template: __dirname + "/app/tpl/index.tmpl.html" //new 一个这个插件的实例，并传入相关的参数
        }),
        new webpack.HotModuleReplacementPlugin(), //热加载插件
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({
             compress: {
                 warnings: false
             },
             sourceMap: true, //这里的soucemap 不能少，可以在线上生成soucemap文件，便于调试
             mangle: true
        }),
        new ExtractTextPlugin("[name]-[hash].css")
    ],
    devServer: {
        contentBase: "./public", //本地服务器所加载的页面所在的目录
        port: '80',
        colors: true, //终端中输出结果为彩色
        historyApiFallback: true, //不跳转
        inline: true //实时刷新
    } 
};

/**
 * Created by madlord on 16/1/14.
 */
var path = require('path');
var webpack = require('webpack');
var relativeToRootPath = ".";


module.exports = {
    entry: {
        "index": ['./src/index.js'],
        "test":['./test/test.js']
    },
    output: {
        filename: '[name].js',
        path: path.join(__dirname, relativeToRootPath, './dist'),
        chunkFilename: '[name].[chunkhash].js',
        sourceMapFilename: '[name].map'
    },
    cache: true,
    devtool: 'source-map',
    resolve: {
        alias: {"@lib": path.resolve(__dirname, relativeToRootPath, "./src/lib")}
    },
    module: {
        loaders: [{
            test: /\.(js)$/,
            loader: 'babel',
            exclude: /node_modules/,
            query: {
                presets: ['stage-0', 'es2015']
            }
        }, {
            test: /\.css$/,
            loader:"style!css?-restructuring!postcss"
        }, {
            test: /\.css\.module/,
            loader: "style!css?-restructuring&modules&localIdentName=[local]___[hash:base64:5]!postcss"
            // },{
            //     test: /\.svg$/,
            //     loader: "url-loader?limit=10000&mimetype=image/svg+xml"
        }, {
            test: /\.woff|ttf|woff2|eot$/,
            loader: 'url?limit=100000'
        }, {
            test: /\.less$/,
            loader: "style!css!postcss!less"
        }, {
            test: /\.less\.module/,
            loader:  "style!css?modules&localIdentName=[local]___[hash:base64:5]!postcss!less"
            // }, {
            //     test: /\.(png|jpg)$/,
            //     loader: 'url?limit=25000'
        }, {
            test: /\.(jpe?g|png|gif|svg)$/i,
            loaders: ['url?limit=25000'],
            // loaders: env == "dev" ? ["url?limit=25000"] : [
            //     'url?limit=25000',
            //     'image-webpack?progressive&optimizationLevel=3&interlaced=false'
            // ]
        }]
    },
    postcss: function () {
        //处理css兼容性代码，无须再写-webkit之类的浏览器前缀
        return [
            require('postcss-initial')({
                reset: 'all' // reset only inherited rules
            }),
            require('autoprefixer')({
                browsers: ['> 5%']
            })];
    }
};

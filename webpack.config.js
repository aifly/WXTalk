var webpack = require('webpack');
 var config = {
     entry: {
         'index': "./index.jsx"
     },
     output: {
         //publicPath: './static/js',
         path: './assets/js',
         filename: "[name].js",
         chunkFilename: "[name].js"
     },
     devServer: {
         inline: true,
         port: 3004,
         hot: true
     },
     externals:{
         //'react':'React',
         //'react-dom':'ReactDOM',
         //'jquery':"$",
        // 'iscroll':'IScroll'
     },
     module: {
         loaders: [{
             test: /\.jsx|\.js|\.es6$/,
             exclude: /node_modules/,
             loaders: ['babel']
             },
             {
                 test: /\.(css)$/,
                 loader: 'style-loader!css-loader'
             },
             {
                 test: /\.(png|jpg)$/,
                 loader: 'url-loader?limit=8192'
             }]
     },
 
 }
 
 module.exports = config; 
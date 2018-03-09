/*
 * @created by mohit
 * 
 */
var path = require("path");
const HtmlPlugin = require('html-webpack-plugin')
var config = {
   entry: './app/main.js',
   output: {
      path:path.resolve(__dirname,'build'),
      filename: 'index.js',
   },
   devServer: {
      contentBase: "./build",
      port: 8080,
      historyApiFallback: true,
      hot:true
   },
   module: {
      loaders: [
         {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            query: {
               presets: ['es2015', 'react']
            }
         },
         {
            test: /\.css$/,
            exclude: /node_modules/,
            loaders: 'style-loader!css-loader',
            
         }
      ]
   },
  plugins: [
    // Configure HtmlPlugin to use our own index.html file
    // as a template.
    // Check out https://github.com/jantimon/html-webpack-plugin
    // for the full list of options.
    new HtmlPlugin({
      template: 'build/index.html'
    })
  ]
}
module.exports = config;

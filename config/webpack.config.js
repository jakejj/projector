var webpack = require('webpack')
var path = require('path')

var BUILD_DIR = path.resolve(__dirname, '../public/webpack')
var APP_DIR = path.resolve(__dirname, '../app/client')


var config = {

  entry: {
    'crabrat': APP_DIR + '/app.js',
  },

  output: {
    path: BUILD_DIR,
    publicPath: '/webpack/',
    filename: 'app.js'
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        query: {stage: 0, plugins: ['jsx-control-statements/babel']}
      },
      { test: /\.coffee$/, loader: "coffee-loader" },
      { test: /\.(coffee\.md|litcoffee)$/, loader: "coffee-loader?literate" },
      { 
        test: /\.cjsx$/, 
        loader: "coffee-jsx-loader" 
      },
      
      { test: /\.css$/, loader: 'style-loader!css-loader' },
      {test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/font-woff'},
      {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/octet-stream'},
      {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file'},
      {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=image/svg+xml'}
    ],
  },

}

module.exports = config






















//// Example webpack configuration with asset fingerprinting in production.
//'use strict';
//
//var path = require('path');
//var webpack = require('webpack');
//var StatsPlugin = require('stats-webpack-plugin');
//
//// must match config.webpack.dev_server.port
//var devServerPort = 3811;
//
//// set TARGET=production on the environment to add asset fingerprints
//var production = process.env.TARGET === 'production';
//
//var config = {
//  entry: {
//    // Sources are expected to live in $app_root/app/client
//    'admin': './app/client/crabrat.js'
//  },
//
//  output: {
//    // Build assets directly in to public/webpack/, let webpack know
//    // that all webpacked assets start with webpack/
//
//    // must match config.webpack.output_dir
//    path: path.join(__dirname, '..', 'public', 'webpack'),
//    publicPath: '/webpack/',
//
//    filename: production ? '[name]-[chunkhash].js' : '[name].js'
//  },
//
//  resolve: {
//    root: path.join(__dirname, '..', 'webpack')
//  },
//
//  plugins: [
//    // must match config.webpack.manifest_filename
//    new StatsPlugin('manifest.json', {
//      // We only need assetsByChunkName
//      chunkModules: false,
//      source: false,
//      chunks: false,
//      modules: false,
//      assets: true
//    })
//  ],
//
//  module: {
//    loaders: [
//      {
//        test: /\.js$/,
//        exclude: /node_modules/,
//        loader: "babel-loader",
//        query: {stage: 0}
//      },
//      { test: /\.coffee$/, loader: "coffee-loader" },
//      { test: /\.(coffee\.md|litcoffee)$/, loader: "coffee-loader?literate" },
//      { 
//        test: /\.cjsx$/, 
//        loader: "coffee-jsx-loader" 
//      },
//      
//      { test: /\.css$/, loader: 'style-loader!css-loader' },
//      {test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/font-woff'},
//      {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/octet-stream'},
//      {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file'},
//      {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=image/svg+xml'}
//    ],
//  },
//
//};
//
//if (production) {
//  config.plugins.push(
//    new webpack.NoErrorsPlugin(),
//    new webpack.optimize.UglifyJsPlugin({
//      compressor: { warnings: false },
//      sourceMap: false
//    }),
//    new webpack.DefinePlugin({
//      'process.env': { NODE_ENV: JSON.stringify('production') }
//    }),
//    new webpack.optimize.DedupePlugin(),
//    new webpack.optimize.OccurenceOrderPlugin()
//  );
//} else {
//  config.devServer = {
//    port: devServerPort,
//    headers: { 'Access-Control-Allow-Origin': '*' }
//  };
//  config.output.publicPath = '//localhost:' + devServerPort + '/webpack/';
//  // Source maps
//  config.devtool = 'cheap-module-eval-source-map';
//}
//
//module.exports = config;

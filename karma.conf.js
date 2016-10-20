// Karma configuration

var webpackConfig = require('./config/webpack.config');
webpackConfig.devtool = 'inline-source-map';


module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['chai', 'mocha'],


    // list of files / patterns to load in the browser
    files: [
      'tests.bundle.js'
      //'./test/client/*.js'
      //'test/client/*.js',
    ],


    // list of files to exclude
    exclude: [
    ],


    preprocessors: {
      // add webpack as preprocessor
      //'./test/client/*.js': ['webpack'],
      //'./test/client/**/*.js': ['webpack']
      'tests.bundle.js': [ 'webpack', 'sourcemap' ]
    },


    webpack: {
        // karma watches the test entry points
        // (you don't need to specify the entry option)
        // webpack watches dependencies

        // webpack configuration
    },

    webpack: webpackConfig,

    webpackMiddleware: {
        // webpack-dev-middleware configuration
        // i. e.
        noInfo: true
    },
    
    //KarmaWebpack = import KarmaWebpack from "karma-webpack"
    plugins: [
      'karma-chrome-launcher',
      'karma-chai',
      'karma-mocha',
      'karma-sourcemap-loader',
      'karma-webpack',
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    //preprocessors: {
    //  '**/*.coffee': ['coffee'],
    //  '**/*.jsx': ['jsx'],
    //  'app/client/**/*.js': ['babelSourceMap'],
    //  'test/**/*.js': ['babelSourceMap']
    //},
    //
    //babelPreprocessor: {
    //  options: {
    //    presets: ['es2015'],
    //    sourceMap: 'inline'
    //  },
    //  filename: function (file) {
    //    return file.originalPath.replace(/\.js$/, '.es5.js');
    //  },
    //  sourceFileName: function (file) {
    //    return file.originalPath;
    //  }
    //},
    //
    //customPreprocessors: {
    //  babelSourceMap: {
    //    base: 'babel',
    //    options: {
    //      presets: ['es2015'],
    //      sourceMap: 'inline'
    //    },
    //    filename: function (file) {
    //      return file.originalPath.replace(/\.js$/, '.es5.js');
    //    },
    //    sourceFileName: function (file) {
    //      return file.originalPath;
    //    }
    //  }
    //},


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],


    //webpack: { //kind of a copy of your webpack config
    //  devtool: 'inline-source-map', //just do inline source maps instead of the default
    //  module: {
    //    loaders: [
    //      { test: /\.js$/, loader: 'babel-loader' }
    //    ]
    //  }
    //},


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    //browsers: ['Chrome', 'Chrome_without_security', 'PhantomJS'],
    browsers: ['Chrome'],

    //customLaunchers: {
    //  Chrome_without_security: {
    //    base: 'Chrome',
    //    flags: ['--disable-web-security']
    //  }
    //},


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  })
}

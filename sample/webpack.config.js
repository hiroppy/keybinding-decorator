'use strict';

const path    = require('path');
const webpack = require('webpack');

module.exports = {
  entry: [
    path.join(__dirname, 'main.js')
  ],
  output: {
    path      : path.join(__dirname, 'dist'),
    filename  : 'bundle.js',
    publicPath: '/dist/'
  },
  target : 'web',
  devtool: 'cheap-module-eval-source-map',
  module : {
    loaders: [
      {
        test   : /\.js$/,
        loader : 'babel-loader',
        exclude: path.join(__dirname, 'node_modules')
      }
    ]
  },
  plugins: [
  ],
  devServer: {
    port       : 8080,
    inline     : true,
    contentBase: '.'
  }
};

module.exports = {
  devtool: 'source-map',
  entry: './src/index.js',
  output: {
    filename: './dist/js-data-adapter-tests.js',
    libraryTarget: 'umd',
    library: 'TestRunner'
  },
  module: {
    loaders: [
      {
        test: /(src)(.+)\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel'
      }
    ]
  }
}

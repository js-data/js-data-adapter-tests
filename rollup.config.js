var babel = require('rollup-plugin-babel')

module.exports = {
  moduleName: 'JSDataAdapterTests',
  moduleId: 'js-data-adapter-tests',
  globals: {
    chai: 'chai',
    sinon: 'sinon'
  },
  plugins: [
    babel({
      exclude: 'node_modules/**'
    })
  ]
}

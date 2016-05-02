var babel = require('rollup-plugin-babel')

module.exports = {
  moduleName: 'JSDataAdapterTests',
  moduleId: 'js-data-adapter-tests',
  external: [
    'chai',
    'sinon'
  ],
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

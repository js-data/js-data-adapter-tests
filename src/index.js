require('babel-polyfill')

try {
  require('co-mocha')(Mocha)
} catch (err) {

}

var assert = require('chai').assert

assert.equalObjects = function (a, b, m) {
  assert.deepEqual(JSON.parse(JSON.stringify(a)), JSON.parse(JSON.stringify(b)), m || (JSON.stringify(a) + ' should be equal to ' + JSON.stringify(b)))
}

var prefix = 'TestRunner.init(options): options'

module.exports = {
  init: function (options) {
    options = options || {}
    options.methods = options.methods || 'all'
    options.features = options.features || 'all'
    if (!options.DS || typeof options.DS !== 'function') {
      throw new Error(prefix + '.DS: Expected function, Actual: ' + typeof options.DS)
    }
    if (!options.Adapter || typeof options.Adapter !== 'function') {
      throw new Error(prefix + '.Adapter: Expected function, Actual: ' + typeof options.Adapter)
    }
    beforeEach(function () {
      this.$$adapter = new options.Adapter(options.adapterConfig)
      this.$$store = new options.DS(options.storeConfig || {
        log: false,
        debug: false
      })
      this.$$User = this.$$store.defineResource(options.userConfig || {
        name: 'user',
        relations: {
          hasMany: {
            post: {
              localField: 'posts',
              foreignKey: 'post'
            }
          },
          hasOne: {
            profile: {
              localField: 'profile',
              localKey: 'profileId'
            },
            address: {
              localField: 'address',
              localKey: 'addressId'
            }
          }
        }
      })
      this.$$Profile = this.$$store.defineResource(options.profileConfig || {
        name: 'profile'
      })
      this.$$Address = this.$$store.defineResource(options.addressConfig || {
        name: 'address'
      })
      this.$$Post = this.$$store.defineResource(options.postConfig || {
        name: 'post',
        relations: {
          belongsTo: {
            user: {
              localField: 'user',
              localKey: 'userId'
            }
          },
          hasMany: {
            comment: {
              localField: 'comments',
              foreignKey: 'postId'
            }
          }
        }
      })
      this.$$Comment = this.$$store.defineResource(options.commentConfig || {
        name: 'comment',
        relations: {
          belongsTo: {
            post: {
              localField: 'post',
              localKey: 'postId'
            },
            user: {
              localField: 'user',
              localKey: 'userId'
            }
          }
        }
      })
    })

    describe('js-data-adapter-tests', function () {
      if (options.methods === 'all' || options.methods.indexOf('create') !== -1) {
        require('./create.test')(options)
      }
      if (options.methods === 'all' || options.methods.indexOf('find') !== -1) {
        require('./find.test')(options)
      }
      if (options.methods === 'all' || options.methods.indexOf('findAll') !== -1) {
        require('./findAll.test')(options)
      }
      if (options.methods === 'all' || options.methods.indexOf('destroy') !== -1) {
        require('./destroy.test')(options)
      }
      if (options.methods === 'all' || options.methods.indexOf('destroyAll') !== -1) {
        require('./destroyAll.test')(options)
      }
      if (options.methods === 'all' || options.methods.indexOf('update') !== -1) {
        require('./update.test')(options)
      }
      if (options.methods === 'all' || options.methods.indexOf('updateAll') !== -1) {
        require('./updateAll.test')(options)
      }
    })

    afterEach(function * () {
      yield this.$$adapter.destroyAll(this.$$Comment)
      yield this.$$adapter.destroyAll(this.$$Post)
      yield this.$$adapter.destroyAll(this.$$User)
      yield this.$$adapter.destroyAll(this.$$Profile)
      yield this.$$adapter.destroyAll(this.$$Address)
    })
  },
  assert: assert,
  fail: function (msg) {
    assert.equal('should not reach this!: ' + msg, 'failure')
  },
  TYPES_EXCEPT_STRING: [123, 123.123, null, undefined, {}, [], true, false, function () {
  }],
  TYPES_EXCEPT_STRING_OR_ARRAY: [123, 123.123, null, undefined, {}, true, false, function () {
  }],
  TYPES_EXCEPT_STRING_OR_NUMBER: [null, undefined, {}, [], true, false, function () {
  }],
  TYPES_EXCEPT_STRING_OR_OBJECT: [123, 123.123, null, undefined, [], true, false, function () {
  }],
  TYPES_EXCEPT_STRING_OR_NUMBER_OBJECT: [null, undefined, [], true, false, function () {
  }],
  TYPES_EXCEPT_STRING_OR_ARRAY_OR_NUMBER: [null, undefined, {}, true, false, function () {
  }],
  TYPES_EXCEPT_NUMBER: ['string', null, undefined, {}, [], true, false, function () {
  }],
  TYPES_EXCEPT_OBJECT: ['string', 123, 123.123, null, undefined, true, false, function () {
  }],
  TYPES_EXCEPT_BOOLEAN: ['string', 123, 123.123, null, undefined, {}, [], function () {
  }],
  TYPES_EXCEPT_FUNCTION: ['string', 123, 123.123, null, undefined, {}, [], true, false]
}

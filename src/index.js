assert.equalObjects = function (a, b, m) {
  assert.deepEqual(JSON.parse(JSON.stringify(a)), JSON.parse(JSON.stringify(b)), m || (JSON.stringify(a) + ' should be equal to ' + JSON.stringify(b)))
}

assert.objectsEqual = function (a, b, m) {
  assert.deepEqual(JSON.parse(JSON.stringify(a)), JSON.parse(JSON.stringify(b)), m || (JSON.stringify(a) + ' should be equal to ' + JSON.stringify(b)))
}

let debug = false

assert.debug = function (...args) {
  if (debug) {
    console.log(...args)
  }
}

var prefix = 'TestRunner.init(options): options'

module.exports = {
  init: function (options) {
    options = options || {}
    debug = !!options.debug
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
              foreignKey: 'userId'
            }
          },
          hasOne: {
            profile: {
              localField: 'profile',
              foreignKey: 'userId'
            },
            address: {
              localField: 'address',
              foreignKey: 'userId'
            }
          }
        }
      })
      this.$$Profile = this.$$store.defineResource(options.profileConfig || {
        name: 'profile',
        relations: {
          belongsTo: {
            user: {
              localField: 'user',
              localkey: 'userId'
            }
          }
        }
      })
      this.$$Address = this.$$store.defineResource(options.addressConfig || {
        name: 'address',
        relations: {
          belongsTo: {
            user: {
              localField: 'user',
              localkey: 'userId'
            }
          }
        }
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

    afterEach(async function () {
      await this.$$adapter.destroyAll(this.$$Comment)
      await this.$$adapter.destroyAll(this.$$Post)
      await this.$$adapter.destroyAll(this.$$User)
      await this.$$adapter.destroyAll(this.$$Profile)
      await this.$$adapter.destroyAll(this.$$Address)
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

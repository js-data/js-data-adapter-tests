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
    if (!options.Adapter || typeof options.Adapter !== 'function') {
      throw new Error(prefix + '.Adapter: Expected function, Actual: ' + typeof options.Adapter)
    }
    beforeEach(function () {
       this.$$adapter = new options.Adapter(options.adapterConfig)
      this.$$container = new options.JSData.Container(options.containerConfig || {
        mapperDefaults: {
          debug: false
        }
      })
      this.$$store = new options.JSData.DataStore(options.storeConfig || {
        mapperDefaults: {
          debug: false
        }
      })
      this.$$container.registerAdapter('adapter', this.$$adapter, { 'default': true })
      this.$$store.registerAdapter('adapter', this.$$adapter, { 'default': true })
      var userOptions = {
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
          },
          belongsTo: {
            organization: {
              localField: 'organization',
              foreignKey: 'organizationId'
            }
          }
        }
      }
      var organizationOptions = {
        name: 'organization',
        relations: {
          hasMany: {
            user: {
              localField: 'users',
              foreignKey: 'organizationId'
            }
          }
        }
      }
      var postOptions = {
        name: 'post',
        relations: {
          belongsTo: {
            user: {
              localField: 'user',
              foreignKey: 'userId'
            }
          },
          hasMany: {
            comment: {
              localField: 'comments',
              foreignKey: 'postId'
            }
          }
        }
      }
      var commentOptions = {
        name: 'comment',
        relations: {
          belongsTo: {
            post: {
              localField: 'post',
              foreignKey: 'postId'
            },
            user: {
              localField: 'user',
              foreignKey: 'userId'
            }
          }
        }
      }
      this.$$User = this.$$container.defineMapper('user', options.userConfig || options.JSData.utils.copy(userOptions))
      this.$$store.defineMapper('user', options.userConfig || options.JSData.utils.copy(userOptions))
      this.$$Organization = this.$$container.defineMapper('organization', options.organizationConfig || options.JSData.utils.copy(organizationOptions))
      this.$$store.defineMapper('organization', options.organizationConfig || options.JSData.utils.copy(organizationOptions))
      this.$$Profile = this.$$container.defineMapper('profile', options.profileConfig || {})
      this.$$store.defineMapper('profile', options.profileConfig || {})
      this.$$Address = this.$$container.defineMapper('address', options.addressConfig || {})
      this.$$store.defineMapper('address', options.addressConfig || {})
      this.$$Post = this.$$container.defineMapper('post', options.postConfig || options.JSData.utils.copy(postOptions))
      this.$$store.defineMapper('post', options.postConfig || options.JSData.utils.copy(postOptions))
      this.$$Comment = this.$$container.defineMapper('comment', options.commentConfig || options.JSData.utils.copy(commentOptions))
      this.$$store.defineMapper('comment', options.commentConfig || options.JSData.utils.copy(commentOptions))
    })

    describe('js-data-adapter-tests', function () {
      if (options.methods === 'all' || options.methods.indexOf('create') !== -1) {
        require('./create.test')(options)
      }
      if (options.methods === 'all' || options.methods.indexOf('createMany') !== -1) {
        require('./createMany.test')(options)
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
      if (options.methods === 'all' || options.methods.indexOf('updateMany') !== -1) {
        require('./updateMany.test')(options)
      }
    })

    afterEach(async function () {
      await this.$$adapter.destroyAll(this.$$Comment)
      await this.$$adapter.destroyAll(this.$$Post)
      await this.$$adapter.destroyAll(this.$$User)
      await this.$$adapter.destroyAll(this.$$Profile)
      await this.$$adapter.destroyAll(this.$$Address)
      await this.$$adapter.destroyAll(this.$$Organization)
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

import afterCreateTest from './afterCreate.test'
import afterUpdateTest from './afterUpdate.test'
import beforeCreateTest from './beforeCreate.test'
import beforeUpdateTest from './beforeUpdate.test'
import createTest from './create.test'
import createManyTest from './createMany.test'
import destroyTest from './destroy.test'
import destroyAllTest from './destroyAll.test'
import extendTest from './extend.test'
import findTest from './find.test'
import findAllTest from './findAll.test'
import updateTest from './update.test'
import updateAllTest from './updateAll.test'
import updateManyTest from './updateMany.test'

import {assert} from 'chai'
import sinon from 'sinon'

assert.equalObjects = function (a, b, m) {
  assert.deepEqual(JSON.parse(JSON.stringify(a)), JSON.parse(JSON.stringify(b)), m || (JSON.stringify(a) + ' should be equal to ' + JSON.stringify(b)))
}

assert.objectsEqual = function (a, b, m) {
  assert.deepEqual(JSON.parse(JSON.stringify(a)), JSON.parse(JSON.stringify(b)), m || (JSON.stringify(a) + ' should be equal to ' + JSON.stringify(b)))
}

let debug = false

assert.debug = function (...args) {
  if (debug) {
    args.forEach(function (arg, i) {
      args[i] = JSON.stringify(arg, null, 2)
    })
    console.log('DEBUG (TEST):', ...args)
  }
}

var prefix = 'TestRunner.init(options): options'

export default {
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
            },
            tag: {
              localField: 'tags',
              localKeys: 'tagIds'
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
      var tagOptions = {
        name: 'tag',
        relations: {
          hasMany: {
            post: {
              localField: 'posts',
              foreignKeys: 'tagIds'
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
      this.$$Tag = this.$$container.defineMapper('tag', options.tagConfig || options.JSData.utils.copy(tagOptions))
      this.$$store.defineMapper('tag', options.tagConfig || options.JSData.utils.copy(tagOptions))
      this.toClear = ['User']
    })

    describe('js-data-adapter-tests', function () {
      if (options.methods === 'all' || options.methods.indexOf('beforeCreate') !== -1) {
        beforeCreateTest(options)
      }
      if (options.methods === 'all' || options.methods.indexOf('create') !== -1) {
        createTest(options)
      }
      if (options.methods === 'all' || options.methods.indexOf('afterCreate') !== -1) {
        afterCreateTest(options)
      }
      if (options.methods === 'all' || options.methods.indexOf('createMany') !== -1) {
        createManyTest(options)
      }
      if (options.methods === 'all' || options.methods.indexOf('extend') !== -1) {
        extendTest(options)
      }
      if (options.methods === 'all' || options.methods.indexOf('find') !== -1) {
        findTest(options)
      }
      if (options.methods === 'all' || options.methods.indexOf('findAll') !== -1) {
        findAllTest(options)
      }
      if (options.methods === 'all' || options.methods.indexOf('destroy') !== -1) {
        destroyTest(options)
      }
      if (options.methods === 'all' || options.methods.indexOf('destroyAll') !== -1) {
        destroyAllTest(options)
      }
      if (options.methods === 'all' || options.methods.indexOf('beforeUpdate') !== -1) {
        beforeUpdateTest(options)
      }
      if (options.methods === 'all' || options.methods.indexOf('update') !== -1) {
        updateTest(options)
      }
      if (options.methods === 'all' || options.methods.indexOf('afterUpdate') !== -1) {
        afterUpdateTest(options)
      }
      if (options.methods === 'all' || options.methods.indexOf('updateAll') !== -1) {
        updateAllTest(options)
      }
      if (options.methods === 'all' || options.methods.indexOf('updateMany') !== -1) {
        updateManyTest(options)
      }
    })

    afterEach(async function () {
      const Test = this
      await Promise.all(Test.toClear.map(function (Mapper) {
        return Test.$$adapter.destroyAll(Test['$$' + Mapper])
      }))
    })
  },
  assert,
  sinon,
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

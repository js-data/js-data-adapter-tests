/* global assert:true */
module.exports = function (options) {
  describe('Adapter#destroy', function () {
    it('should exist', function () {
      assert.equal(typeof this.$$adapter.destroy, 'function', 'adapter should have a "destroy" method')
    })
    it('should destroy a user', async function () {
      const adapter = this.$$adapter
      const User = this.$$User
      const props = { name: 'John' }

      assert.debug('create', props)
      let user = await adapter.create(User, props)
      assert.debug('created', JSON.stringify(user, null, 2))

      let beforeDestroyCalled = false
      let afterDestroyCalled = false

      // Test beforeDestroy and afterDestroy
      adapter.beforeDestroy = function (mapper, id, opts) {
        beforeDestroyCalled = true
        assert.isObject(mapper, 'beforeDestroy should have received mapper argument')
        assert.isDefined(id, 'beforeDestroy should have received id argument')
        assert.isObject(opts, 'beforeDestroy should have received opts argument')
        // Test re-assignment
        return Promise.resolve()
      }
      adapter.afterDestroy = function (mapper, id, opts) {
        afterDestroyCalled = true
        assert.isObject(mapper, 'afterDestroy should have received mapper argument')
        assert.isDefined(id, 'afterDestroy should have received id argument')
        assert.isObject(opts, 'afterDestroy should have received opts argument')
        // Test re-assignment
        return Promise.resolve(1234)
      }

      assert.debug('destroy', user[User.idAttribute])
      const destroyedUser = await adapter.destroy(User, user[User.idAttribute])
      assert.debug('destroyed', JSON.stringify(destroyedUser, null, 2))
      assert.equal(destroyedUser, 1234)
      assert.isTrue(beforeDestroyCalled, 'beforeDestroy should have been called')
      assert.isTrue(afterDestroyCalled, 'afterDestroy should have been called')
    })
    it('should destroy a user and return raw', async function () {
      const adapter = this.$$adapter
      const User = this.$$User
      const props = { name: 'John' }

      assert.debug('create', props)
      let user = await adapter.create(User, props)
      assert.debug('created', JSON.stringify(user, null, 2))

      assert.debug('destroy', user[User.idAttribute])
      const result = await adapter.destroy(User, user[User.idAttribute], { raw: true })
      assert.debug('destroyed', JSON.stringify(result, null, 2))
      assert.isDefined(result.data, 'result.data is defined')
      assert.isDefined(result.deleted, 'result.deleted is defined')
      assert.equal(result.data, user[User.idAttribute], `result.data should be ${user[User.idAttribute]}`)
      assert.equal(result.deleted, 1, 'result.deleted should be 1')
    })
    it('should destroy nothing', async function () {
      const adapter = this.$$adapter
      const User = this.$$User

      assert.debug('destroy', 'non-existent-id')
      const result = await adapter.destroy(User, 'non-existent-id')
      assert.debug('destroyed', JSON.stringify(result, null, 2))
      assert.isUndefined(result, 'result should be undefined')
    })
    it('should destroy nothing and return raw', async function () {
      const adapter = this.$$adapter
      const User = this.$$User

      assert.debug('destroy', 'non-existent-id')
      const result = await adapter.destroy(User, 'non-existent-id', { raw: true })
      assert.debug('destroyed', JSON.stringify(result, null, 2))
      assert.isUndefined(result.data, 'result.data should be undefined')
      assert.isDefined(result.deleted, 'result.deleted is defined')
      assert.equal(result.deleted, 0, 'result.deleted should be 0')
    })
  })
}

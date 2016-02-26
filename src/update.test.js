/* global assert:true */
module.exports = function (options) {
  describe('Adapter#update', function () {
    it('should exist', function () {
      assert.equal(typeof this.$$adapter.update, 'function', 'adapter should have a "update" method')
    })
    it('should update a user', async function () {
      const adapter = this.$$adapter
      const User = this.$$User
      const props = { name: 'John' }

      assert.debug('create', User.name, props)
      const user = await adapter.create(User, props)
      assert.debug('created', User.name, user)

      assert.equal(user.name, props.name, `name of user should be "${props.name}"`)
      assert.isDefined(user[User.idAttribute], 'new user should have an id')

      assert.debug('find', User.name, user[User.idAttribute])
      let foundUser = await adapter.find(User, user[User.idAttribute])
      assert.debug('found', User.name, foundUser)

      assert.equal(foundUser.name, props.name, `name of user should be "${props.name}"`)
      assert.isDefined(foundUser[User.idAttribute], 'new user should have an id')
      assert.equal(foundUser[User.idAttribute], user[User.idAttribute])

      assert.debug('update', User.name, user[User.idAttribute], { name: 'Johnny' })
      let updatedUser = await adapter.update(User, user[User.idAttribute], { name: 'Johnny' })
      assert.debug('updated', User.name, updatedUser)
      assert.equal(updatedUser.name, 'Johnny')
      assert.equal(updatedUser[User.idAttribute], user[User.idAttribute])

      let beforeUpdateCalled = false
      let afterUpdateCalled = false

      // Test beforeUpdate and afterUpdate
      adapter.beforeUpdate = function (mapper, id, props, opts) {
        beforeUpdateCalled = true
        assert.isObject(mapper, 'beforeUpdate should have received mapper argument')
        assert.isDefined(id, 'beforeUpdate should have received id argument')
        assert.isObject(props, 'beforeUpdate should have received props argument')
        assert.isObject(opts, 'beforeUpdate should have received opts argument')
        // Test re-assignment
        return Promise.resolve({ [User.idAttribute]: user[User.idAttribute], name: 'bar' })
      }
      adapter.afterUpdate = function (mapper, id, props, opts, record) {
        afterUpdateCalled = true
        assert.isObject(mapper, 'afterUpdate should have received mapper argument')
        assert.isDefined(id, 'afterUpdate should have received id argument')
        assert.isObject(props, 'afterUpdate should have received props argument')
        assert.isObject(opts, 'afterUpdate should have received opts argument')
        assert.isObject(record, 'afterUpdate should have received record argument')
        // Test re-assignment
        return Promise.resolve({ [User.idAttribute]: user[User.idAttribute], name: record.name + 'baz' })
      }
      assert.debug('update', User.name, user[User.idAttribute], { name: 'foo' })
      updatedUser = await adapter.update(User, user[User.idAttribute], { name: 'foo' })
      assert.debug('updated', User.name, updatedUser)
      assert.equal(updatedUser.name, 'barbaz')
      assert.equal(updatedUser[User.idAttribute], user[User.idAttribute])
      assert.isTrue(beforeUpdateCalled, 'beforeUpdate should have been called')
      assert.isTrue(afterUpdateCalled, 'afterUpdate should have been called')

      assert.debug('find', User.name, user[User.idAttribute])
      foundUser = await adapter.find(User, user[User.idAttribute])
      assert.debug('found', User.name, foundUser)
      assert.equal(foundUser.name, 'bar')
      assert.equal(foundUser[User.idAttribute], user[User.idAttribute])
    })
    it('should update a user and return raw', async function () {
      const adapter = this.$$adapter
      const User = this.$$User
      const props = { name: 'John' }

      assert.debug('create', props)
      const user = await adapter.create(User, props)
      assert.debug('created', JSON.stringify(user, null, 2))

      assert.equal(user.name, props.name, `name of user should be "${props.name}"`)
      assert.isDefined(user[User.idAttribute], 'new user should have an id')

      assert.debug('update', user[User.idAttribute], { name: 'Johnny' })
      const result = await adapter.update(User, user[User.idAttribute], { name: 'Johnny' }, { raw: true })
      assert.debug('updated', JSON.stringify(result, null, 2))
      assert.isDefined(result.data, 'result.data is defined')
      assert.isDefined(result.updated, 'result.updated is defined')
      assert.equal(result.data.name, 'Johnny', 'result.data.name should be "Johnny"')
      assert.equal(result.data[User.idAttribute], user[User.idAttribute], `result.data.${User.idAttribute} should be ${user[User.idAttribute]}`)
      assert.equal(result.updated, 1, 'result.updated should be 1')
    })
    it('should throw when updating non-existent row', async function () {
      const adapter = this.$$adapter
      const User = this.$$User

      assert.debug('update', 'non-existent-id', { name: 'Johnny' })
      try {
        await adapter.update(User, 'non-existent-id', { name: 'Johnny' })
        throw new Error('update should have failed!')
      } catch (err) {
        assert.debug('correctly threw error', err.message)
        assert.isDefined(err.message, 'err.message is defined')
        assert.equal(err.message, 'Not Found', 'err.message should be "Not Found"')
      }
    })
  })
}

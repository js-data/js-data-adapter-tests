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
      const user = await adapter.create(User, props)
      assert.debug('created', JSON.stringify(user, null, 2))

      assert.debug('destroy', user[User.idAttribute])
      const destroyedUser = await adapter.destroy(User, user[User.idAttribute])
      assert.debug('destroyed', JSON.stringify(destroyedUser, null, 2))
      assert.isFalse(!!destroyedUser)

      try {
        await adapter.find(User, user[User.idAttribute])
        throw new Error('Should not have reached here!')
      } catch (err) {
        assert.equal(err.message, 'Not Found!')
      }
    })
  })
}

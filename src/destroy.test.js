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

      assert.debug('destroy', user[User.idAttribute])
      const destroyedUser = await adapter.destroy(User, user[User.idAttribute])
      assert.debug('destroyed', JSON.stringify(destroyedUser, null, 2))
      assert.equal(destroyedUser, user[User.idAttribute])

      user = await adapter.find(User, user[User.idAttribute])
      assert.isTrue(!user)
    })
  })
}

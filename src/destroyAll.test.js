/* global assert:true */
module.exports = function (options) {
  describe('Adapter#destroyAll', function () {
    it('should exist', function () {
      assert.equal(typeof this.$$adapter.destroyAll, 'function', 'adapter should have a "destroyAll" method')
    })
    it('should destroy all users', async function () {
      const adapter = this.$$adapter
      const User = this.$$User
      const props = { name: 'John' }

      assert.debug('create', props)
      const user = await adapter.create(User, props)
      assert.debug('created', JSON.stringify(user, null, 2))

      assert.debug('findAll', props)
      let foundUsers = await adapter.findAll(User, props)
      assert.debug('found', JSON.stringify(foundUsers, null, 2))
      assert.equal(foundUsers.length, 1)
      assert.equal(foundUsers[0][User.idAttribute], user[User.idAttribute])
      assert.equal(foundUsers[0].name, 'John')

      assert.debug('destroyAll', props)
      const destroyedUsers = await adapter.destroyAll(User, props)
      assert.equal(destroyedUsers.length, 2)
      assert.debug('destroyed', JSON.stringify(destroyedUsers, null, 2))

      assert.debug('findAll', props)
      foundUsers = await adapter.findAll(User, props)
      assert.debug('found', JSON.stringify(foundUsers, null, 2))
      assert.equal(foundUsers.length, 0)
    })
  })
}

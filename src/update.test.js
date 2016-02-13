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

      assert.debug('create', props)
      const user = await adapter.create(User, props)
      assert.debug('created', JSON.stringify(user, null, 2))

      assert.equal(user.name, props.name, `name of user should be "${props.name}"`)
      assert.isDefined(user[User.idAttribute], 'new user should have an id')

      assert.debug('find', user[User.idAttribute])
      let foundUser = await adapter.find(User, user[User.idAttribute])
      assert.debug('found', JSON.stringify(foundUser, null, 2))

      assert.equal(foundUser.name, props.name, `name of user should be "${props.name}"`)
      assert.isDefined(foundUser[User.idAttribute], 'new user should have an id')
      assert.equal(foundUser[User.idAttribute], user[User.idAttribute])

      assert.debug('update', user[User.idAttribute], { name: 'Johnny' })
      const updatedUser = await adapter.update(User, user[User.idAttribute], { name: 'Johnny' })
      assert.debug('found', JSON.stringify(updatedUser, null, 2))
      assert.equal(updatedUser.name, 'Johnny')
      assert.equal(updatedUser[User.idAttribute], user[User.idAttribute])

      assert.debug('find', user[User.idAttribute])
      foundUser = await adapter.find(User, user[User.idAttribute])
      assert.debug('found', JSON.stringify(foundUser, null, 2))
      assert.equal(foundUser.name, 'Johnny')
      assert.equal(foundUser[User.idAttribute], user[User.idAttribute])
    })
  })
}

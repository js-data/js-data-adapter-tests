/* global assert:true */
module.exports = function (options) {
  describe('Adapter#create', function () {
    it('should exist', function () {
      assert.equal(typeof this.$$adapter.create, 'function', 'adapter should have a "create" method')
    })
    it('should create a user', async function () {
      const adapter = this.$$adapter
      const User = this.$$User
      const props = { name: 'John' }

      assert.debug('create', props)
      const user = await adapter.create(User, props)
      assert.debug('created', JSON.stringify(user, null, 2))

      assert.equal(user.name, props.name, `name of user should be "${props.name}"`)
      assert.isDefined(user[User.idAttribute], 'new user should have an id')

      assert.debug('find', user[User.idAttribute])
      const foundUser = await adapter.find(User, user[User.idAttribute])
      assert.debug('found', JSON.stringify(foundUser, null, 2))

      assert.equal(foundUser.name, props.name, `name of user should be "${props.name}"`)
      assert.isDefined(foundUser[User.idAttribute], 'new user should have an id')
      assert.equal(foundUser[User.idAttribute], user[User.idAttribute])
    })
  })
}

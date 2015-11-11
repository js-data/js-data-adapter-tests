module.exports = function (options) {
  describe('Adapter#update', function () {
    it('should exist', function * () {
      assert.equal(typeof this.$$adapter.update, 'function', 'adapter should have a "update" method')
    })
    it('should update a user', function * () {
      var adapter = this.$$adapter
      var User = this.$$User
      var user = yield adapter.create(User, {name: 'John'})
      var id = user.id
      assert.equal(user.name, 'John')
      assert.isDefined(user.id)

      var foundUser = yield adapter.find(User, user.id)
      assert.equal(foundUser.name, 'John')
      assert.isDefined(foundUser.id)
      assert.equal(foundUser.id, id)
      assert.equal(foundUser.name, 'John')

      var updatedUser = yield adapter.update(User, foundUser.id, {name: 'Johnny'})
      assert.equal(updatedUser.name, 'Johnny')
      assert.isDefined(updatedUser.id)
      assert.equal(updatedUser.id, id)
      assert.equal(updatedUser.name, 'Johnny')

      var foundUser2 = yield adapter.find(User, updatedUser.id)
      assert.equal(foundUser2.name, 'Johnny')
      assert.isDefined(foundUser2.id)
      assert.equal(foundUser2.id, id)
      assert.equal(foundUser2.name, 'Johnny')

      var destroyUser = yield adapter.destroy(User, foundUser2.id)
      assert.isFalse(!!destroyUser)

      try {
        yield adapter.find(User, id)
        throw new Error('Should not have reached here!')
      } catch (err) {
        assert.equal(err.message, 'Not Found!')
      }
    })
  })
}

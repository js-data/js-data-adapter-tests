module.exports = function (adapter) {
  describe('Adapter#destroy', function () {
    it('should exist', function * () {
      assert.equal(typeof this.$$adapter.destroy, 'function', 'adapter should have a "destroy" method')
    })
    it('should destroy a user', function * () {
      var adapter = this.$$adapter
      var User = this.$$User
      var createUser = yield adapter.create(User, {name: 'John'})
      var id = createUser.id

      var destroyUser = yield adapter.destroy(User, createUser.id)
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

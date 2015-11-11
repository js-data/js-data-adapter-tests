module.exports = function (options) {
  describe('Adapter#destroyAll', function () {
    it('should exist', function * () {
      assert.equal(typeof this.$$adapter.destroyAll, 'function', 'adapter should have a "destroyAll" method')
    })
    it('should destroy all users', function * () {
      var adapter = this.$$adapter
      var User = this.$$User
      var createUser = yield adapter.create(User, {name: 'John'})
      var id = createUser.id

      var findUsers = yield adapter.findAll(User, { name: 'John' })
      assert.equal(findUsers.length, 1)
      assert.equal(findUsers[0].id, id)
      assert.equal(findUsers[0].name, 'John')

      yield adapter.destroyAll(User, { name: 'John' })
      var findUsers2 = yield adapter.findAll(User, { name: 'John' })
      assert.equal(findUsers2.length, 0)
    })
  })
}

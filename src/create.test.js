module.exports = function (adapter) {
  describe('Adapter#create', function () {
    it('should exist', function * () {
      assert.equal(typeof this.$$adapter.create, 'function', 'adapter should have a "create" method')
    })
    it('should create a user', function * () {
      var adapter = this.$$adapter
      var User = this.$$User
      var createUser = yield adapter.create(User, {name: 'John'})
      var id = createUser.id
      assert.equal(createUser.name, 'John')
      assert.isDefined(createUser.id)

      var findUser = yield adapter.find(User, createUser.id)
      assert.equal(findUser.name, 'John')
      assert.isDefined(findUser.id)
      assert.equalObjects(findUser, {id: id, name: 'John', age: null, profileId: null})

      var destoryUser = yield adapter.destroy(User, findUser.id)
      assert.isFalse(!!destoryUser)

      try {
        yield adapter.find(User, id)
        throw new Error('Should not have reached here!')
      } catch (err) {
        assert.equal(err.message, 'Not Found!')
      }
    })
  })
}

module.exports = function (options) {
  describe('Adapter#updateAll', function () {
    it('should exist', function * () {
      assert.equal(typeof this.$$adapter.updateAll, 'function', 'adapter should have a "updateAll" method')
    })
    it('should update multiple users', function * () {
      var adapter = this.$$adapter
      var User = this.$$User
      var user1 = yield adapter.create(User, {name: 'John', age: 20})
      var userId1 = user1.id

      var user2 = yield adapter.create(User, {name: 'John', age: 30})
      var userId2 = user2.id

      var users = yield adapter.findAll(User, { name: 'John' })
      users.sort(function (a, b) {
        return a.age - b.age
      })
      assert.equal(users[0].name, 'John')
      assert.equal(users[0].name, 'John')
      assert.equal(users.filter(function (x) { return x.id === userId1 }).length, 1)
      assert.equal(users.filter(function (x) { return x.id === userId2 }).length, 1)
      assert.equal(users.filter(function (x) { return x.age === 20 }).length, 1)
      assert.equal(users.filter(function (x) { return x.age === 30 }).length, 1)

      var users2 = yield adapter.updateAll(User, { name: 'Johnny' }, { name: 'John' })
      users2.sort(function (a, b) {
        return a.age - b.age
      })
      assert.equal(users2[0].name, 'Johnny')
      assert.equal(users2[0].name, 'Johnny')
      assert.equal(users2.filter(function (x) { return x.id === userId1 }).length, 1)
      assert.equal(users2.filter(function (x) { return x.id === userId2 }).length, 1)
      assert.equal(users2.filter(function (x) { return x.age === 20 }).length, 1)
      assert.equal(users2.filter(function (x) { return x.age === 30 }).length, 1)

      var users3 = yield adapter.findAll(User, { name: 'John' })
      assert.equalObjects(users3, [])
      assert.equal(users3.length, 0)

      var users4 = yield adapter.findAll(User, { name: 'Johnny' })
      users4.sort(function (a, b) {
        return a.age - b.age
      })
      assert.equal(users4[0].name, 'Johnny')
      assert.equal(users4[0].name, 'Johnny')
      assert.equal(users4.filter(function (x) { return x.id === userId1 }).length, 1)
      assert.equal(users4.filter(function (x) { return x.id === userId2 }).length, 1)
      assert.equal(users4.filter(function (x) { return x.age === 20 }).length, 1)
      assert.equal(users4.filter(function (x) { return x.age === 30 }).length, 1)
    })
  })
}

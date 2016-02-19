module.exports = function (options) {
  describe('Adapter#updateAll', function () {
    it('should exist', function () {
      assert.equal(typeof this.$$adapter.updateAll, 'function', 'adapter should have a "updateAll" method')
    })
    it('should update multiple users', async function () {
      const adapter = this.$$adapter
      const User = this.$$User
      let props = { name: 'John', age: 20 }

      assert.debug('create', props)
      const user1 = await adapter.create(User, props)
      assert.debug('created', JSON.stringify(user1, null, 2))
      const userId1 = user1[User.idAttribute]

      props = { name: 'John', age: 30 }

      assert.debug('create', props)
      const user2 = await adapter.create(User, props)
      assert.debug('created', JSON.stringify(user2, null, 2))
      const userId2 = user2[User.idAttribute]

      assert.debug('findAll', { name: 'John' })
      const users = await adapter.findAll(User, { name: 'John' })
      assert.debug('found', JSON.stringify(users, null, 2))
      users.sort(function (a, b) {
        return a.age - b.age
      })
      assert.equal(users[0].name, 'John')
      assert.equal(users[0].name, 'John')
      assert.equal(users.filter(function (x) { return x[User.idAttribute] === userId1 }).length, 1)
      assert.equal(users.filter(function (x) { return x[User.idAttribute] === userId2 }).length, 1)
      assert.equal(users.filter(function (x) { return x.age === 20 }).length, 1)
      assert.equal(users.filter(function (x) { return x.age === 30 }).length, 1)

      assert.debug('updateAll', { name: 'Johnny' }, { name: 'John' })
      const users2 = await adapter.updateAll(User, { name: 'Johnny' }, { name: 'John' })
      assert.debug('updated', JSON.stringify(users2, null, 2))
      users2.sort(function (a, b) {
        return a.age - b.age
      })
      assert.equal(users2[0].name, 'Johnny')
      assert.equal(users2[0].name, 'Johnny')
      assert.equal(users2.filter(function (x) { return x[User.idAttribute] === userId1 }).length, 1)
      assert.equal(users2.filter(function (x) { return x[User.idAttribute] === userId2 }).length, 1)
      assert.equal(users2.filter(function (x) { return x.age === 20 }).length, 1)
      assert.equal(users2.filter(function (x) { return x.age === 30 }).length, 1)

      assert.debug('findAll', { name: 'John' })
      const users3 = await adapter.findAll(User, { name: 'John' })
      assert.debug('found', JSON.stringify(users3, null, 2))
      assert.equalObjects(users3, [])
      assert.equal(users3.length, 0)

      assert.debug('findAll', { name: 'Johnny' })
      const users4 = await adapter.findAll(User, { name: 'Johnny' })
      assert.debug('found', JSON.stringify(users4, null, 2))
      users4.sort(function (a, b) {
        return a.age - b.age
      })
      assert.equal(users4[0].name, 'Johnny')
      assert.equal(users4[0].name, 'Johnny')
      assert.equal(users4.filter(function (x) { return x[User.idAttribute] === userId1 }).length, 1)
      assert.equal(users4.filter(function (x) { return x[User.idAttribute] === userId2 }).length, 1)
      assert.equal(users4.filter(function (x) { return x.age === 20 }).length, 1)
      assert.equal(users4.filter(function (x) { return x.age === 30 }).length, 1)
    })
  })
}

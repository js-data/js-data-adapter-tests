/* global assert:true */
export default function (options) {
  describe('Adapter#createMany', function () {
    it('should exist', function () {
      assert.equal(typeof this.$$adapter.createMany, 'function', 'adapter should have a "createMany" method')
    })
    it('should create multiple users', async function () {
      var adapter = this.$$adapter
      var User = this.$$User
      var user1 = {name: 'John', age: 20}

      var user2 = {name: 'John', age: 30}

      var users = await adapter.createMany(User, [user1, user2])
      users.sort(function (a, b) {
        return a.age - b.age
      })
      assert.isDefined(users[0][User.idAttribute])
      assert.isDefined(users[1][User.idAttribute])
      assert.equal(users.filter(function (x) { return x.age === 20 }).length, 1)
      assert.equal(users.filter(function (x) { return x.age === 30 }).length, 1)

      var users3 = await adapter.findAll(User, { age: 20 })
      assert.equal(users3.length, 1)
    })
  })
}

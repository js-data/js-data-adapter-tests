module.exports = function (options) {
  describe('Adapter#findAll', function () {
    var adapter, User, Profile, Post, Comment

    beforeEach(function () {
      adapter = this.$$adapter
      User = this.$$User
      Profile = this.$$Profile
      Post = this.$$Post
      Comment = this.$$Comment
    })

    it('should exist', function () {
      assert.equal(typeof adapter.findAll, 'function', 'adapter should have a "findAll" method')
    })

    it('should filter users', async function () {
      const props = { name: 'John' }
      assert.debug('findAll', { age: 30 })
      const users = await adapter.findAll(User, { age: 30 })
      assert.debug('found', JSON.stringify(users, null, 2))
      assert.equal(users.length, 0)

      assert.debug('create', props)
      const user = await adapter.create(User, props)
      assert.debug('created', JSON.stringify(user, null, 2))
      const userId = user[User.idAttribute]

      assert.debug('findAll', { name: 'John' })
      const users2 = await adapter.findAll(User, { name: 'John' })
      assert.debug('found', JSON.stringify(users2, null, 2))
      assert.equal(users2.length, 1)
      assert.equal(users2[0][User.idAttribute], userId)
      assert.equal(users2[0].name, 'John')
    })

    if (options.features === 'all' || options.features.indexOf('inOp') !== -1) {
      it('should filter users using the "in" operator', async function () {
        var users = await adapter.findAll(User, {
          where: {
            age: {
              'in': [30]
            }
          }
        })
        assert.equal(users.length, 0)

        var user = await adapter.create(User, {name: 'John'})
        var id = user.id

        var users2 = await adapter.findAll(User, { name: 'John' })
        assert.equal(users2.length, 1)
        assert.equal(users2[0].id, id)
        assert.equal(users2[0].name, 'John')

        var destroyedUser = await adapter.destroy(User, id)
        assert.isFalse(!!destroyedUser)
      })
    }

    if (options.features === 'all' || options.features.indexOf('likeOp') !== -1) {
      it('should filter users using the "like" operator', async function () {
        var users = await adapter.findAll(User, {
          where: {
            name: {
              'like': '%J%'
            }
          }
        })
        assert.equal(users.length, 0)

        var user = await adapter.create(User, {name: 'John'})
        var id = user.id

        var users2 = await adapter.findAll(User, {
          where: {
            name: {
              'like': '%J%'
            }
          }
        })
        assert.equal(users2.length, 1)
        assert.equal(users2[0].id, id)
        assert.equal(users2[0].name, 'John')

        var destroyedUser = await adapter.destroy(User, id)
        assert.isFalse(!!destroyedUser)
      })
    }

    if (options.features === 'all' || options.features.indexOf('filterOpNotFound') !== -1) {
      it('should throw "Operator not found" error', async function () {
        assert.throw(function () {
          return adapter.findAll(User, {
            where: {
              name: {
                op: 'John'
              }
            }
          })
        }, Error, 'Operator not found')
      })
    }

    it('should load belongsTo relations', async function () {
      let props = { name: 'John' }
      assert.debug('create', props)
      const user = await adapter.create(User, props)
      assert.debug('created', JSON.stringify(user, null, 2))

      props = { email: 'foo@test.com', userId: user[User.idAttribute] }
      assert.debug('create', props)
      const profile = await adapter.create(Profile, props)
      assert.debug('created', JSON.stringify(profile, null, 2))

      props = { content: 'foo', userId: user[User.idAttribute] }
      assert.debug('create', props)
      const post = await adapter.create(Post, props)
      assert.debug('created', JSON.stringify(post, null, 2))

      props = { content: 'test2', postId: post[Post.idAttribute], userId: post.userId }
      assert.debug('create', props)
      const comment = await adapter.create(Comment, props)
      assert.debug('created', JSON.stringify(comment, null, 2))

      props = { name: 'Sally' }
      assert.debug('create', props)
      const user2 = await adapter.create(User, props)
      assert.debug('created', JSON.stringify(user2, null, 2))

      props = { content: 'bar', userId: user2[User.idAttribute] }
      assert.debug('create', props)
      const post2 = await adapter.create(Post, props)
      assert.debug('created', JSON.stringify(post2, null, 2))

      props = { content: 'test67', postId: post2[Post.idAttribute], userId: post2.userId }
      assert.debug('create', props)
      const comment2 = await adapter.create(Comment, props)
      assert.debug('created', JSON.stringify(comment2, null, 2))

      assert.debug('findAll')
      const comments = await adapter.findAll(Comment, {}, {'with': ['user', 'user.profile', 'post', 'post.user']})
      assert.debug('found', JSON.stringify(comments, null, 2))
      assert.isDefined(comments[0].post)
      assert.isDefined(comments[0].post.user)
      assert.isDefined(comments[0].user)
      assert.isDefined(comments[0].user.profile || comments[1].user.profile)
      assert.isDefined(comments[1].post)
      assert.isDefined(comments[1].post.user)
      assert.isDefined(comments[1].user)
    })

    it('should load hasMany and belongsTo relations', async function () {
      let props = { name: 'John' }
      assert.debug('create', props)
      const user = await adapter.create(User, props)
      assert.debug('created', JSON.stringify(user, null, 2))

      props = { email: 'foo@test.com', userId: user[User.idAttribute] }
      assert.debug('create', props)
      const profile = await adapter.create(Profile, props)
      assert.debug('created', JSON.stringify(profile, null, 2))

      props = { content: 'foo', userId: user[User.idAttribute] }
      assert.debug('create', props)
      const post = await adapter.create(Post, props)
      assert.debug('created', JSON.stringify(post, null, 2))

      props = { content: 'test2', postId: post[Post.idAttribute], userId: post.userId }
      assert.debug('create', props)
      const comment = await adapter.create(Comment, props)
      assert.debug('created', JSON.stringify(comment, null, 2))

      props = { name: 'Sally' }
      assert.debug('create', props)
      const user2 = await adapter.create(User, props)
      assert.debug('created', JSON.stringify(user2, null, 2))

      props = { content: 'bar', userId: user2[User.idAttribute] }
      assert.debug('create', props)
      const post2 = await adapter.create(Post, props)
      assert.debug('created', JSON.stringify(post2, null, 2))

      props = { content: 'test67', postId: post2[Post.idAttribute], userId: post2.userId }
      assert.debug('create', props)
      const comment2 = await adapter.create(Comment, props)
      assert.debug('created', JSON.stringify(comment2, null, 2))

      assert.debug('find')
      const posts = await adapter.findAll(Post, {}, {'with': ['user', 'comment', 'comment.user', 'comment.user.profile']})
      assert.debug('found', JSON.stringify(posts, null, 2))
      assert.isDefined(posts[0].comments)
      assert.isDefined(posts[0].comments[0].user)
      assert.isDefined(posts[0].comments[0].user.profile || posts[1].comments[0].user.profile)
      assert.isDefined(posts[0].user)
      assert.isDefined(posts[1].comments)
      assert.isDefined(posts[1].comments[0].user)
      assert.isDefined(posts[1].user)
    })

    if (options.features === 'all' || options.features.indexOf('filterOnRelations') !== -1) {
      it('should filter using belongsTo relation', async function () {
        var profile1 = await adapter.create(Profile, { email: 'foo@test.com' })
        var user1 = await adapter.create(User, {name: 'John', profileId: profile1.id})
        var post1 = await adapter.create(Post, {content: 'foo', userId: user1.id})
        await adapter.create(Comment, {content: 'test1', postId: post1.id, userId: post1.userId})

        var user2 = await adapter.create(User, {name: 'Sally'})
        var post2 = await adapter.create(Post, {content: 'bar', userId: user2.id})
        await adapter.create(Comment, {content: 'test2', postId: post2.id, userId: post2.userId})

        var users = await adapter.findAll(User, {'profile.email': 'foo@test.com'})
        assert.equal(users.length, 1)
        assert.equal(users[0].profileId, profile1.id)
        assert.equal(users[0].name, 'John')
      })

      it('should filter through multiple hasOne/belongsTo relations', async function () {
        var profile1 = await adapter.create(Profile, { email: 'foo@test.com' })
        var user1 = await adapter.create(User, {name: 'John', profileId: profile1.id})
        var post1 = await adapter.create(Post, {content: 'foo', userId: user1.id})
        await adapter.create(Comment, {content: 'test1', postId: post1.id, userId: post1.userId})

        var profile2 = await adapter.create(Profile, { email: 'bar@test.com' })
        var user2 = await adapter.create(User, {name: 'Sally', profileId: profile2.id})
        var post2 = await adapter.create(Post, {content: 'bar', userId: user2.id})
        await adapter.create(Comment, {content: 'test2', postId: post2.id, userId: post2.userId})

        var comments = await adapter.findAll(Comment, { 'user.profile.email': 'foo@test.com' })
        assert.equal(comments.length, 1)
        assert.equal(comments[0].userId, user1.id)
        assert.equal(comments[0].content, 'test1')
      })

      it('should filter using multiple hasOne/belongsTo relations', async function () {
        var profile1 = await adapter.create(Profile, { email: 'foo@test.com' })
        var user1 = await adapter.create(User, {name: 'John', profileId: profile1.id})
        var post1 = await adapter.create(Post, {content: 'foo', userId: user1.id})
        await adapter.create(Comment, {content: 'test1', postId: post1.id, userId: post1.userId})

        var profile2 = await adapter.create(Profile, { email: 'bar@test.com' })
        var user2 = await adapter.create(User, {name: 'Sally', profileId: profile2.id})
        var post2 = await adapter.create(Post, {content: 'bar', userId: user2.id})
        await adapter.create(Comment, {content: 'test2', postId: post2.id, userId: post2.userId})

        var comments = await adapter.findAll(Comment, { 'user.name': 'John', 'user.profile.email': 'foo@test.com' })
        assert.equal(comments.length, 1)
        assert.equal(comments[0].userId, user1.id)
        assert.equal(comments[0].content, 'test1')
      })
    }

    it('should allow passing limit and offset as strings', async function () {
      await adapter.findAll(User, { limit: '10', offset: '20' })
    })
  })
}

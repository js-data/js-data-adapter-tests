module.exports = function (options) {
  describe('Adapter#find', function () {
    var adapter, User, Profile, Post, Comment

    beforeEach(function () {
      adapter = this.$$adapter
      User = this.$$User
      Profile = this.$$Profile
      Post = this.$$Post
      Comment = this.$$Comment
    })

    it('should exist', function () {
      assert.equal(typeof adapter.find, 'function', 'adapter should have a "find" method')
    })

    it('should find a user', async function () {
      let props = { name: 'John' }
      assert.debug('create', props)
      const user = await adapter.create(User, props)
      assert.debug('created', JSON.stringify(user, null, 2))
      const userId = user[User.idAttribute]
      assert.equal(user.name, 'John', 'name of created user should be "John"')
      assert.isDefined(user[User.idAttribute])

      assert.debug('find', user[User.idAttribute])
      const foundUser = await adapter.find(User, user[User.idAttribute])
      assert.debug('found', JSON.stringify(foundUser, null, 2))
      assert.equal(foundUser.name, 'John')
      assert.isDefined(foundUser[User.idAttribute])
      assert.equal(foundUser[User.idAttribute], userId)
      assert.equal(foundUser.name, 'John')

      props = { content: 'test', userId: userId }
      assert.debug('create', props)
      const post = await adapter.create(Post, props)
      assert.debug('created', JSON.stringify(post, null, 2))
      const postId = post[Post.idAttribute]
      assert.equal(post.content, 'test')
      assert.isDefined(post[Post.idAttribute])
      assert.equal(post.userId, userId)

      props = [
        {
          content: 'test2',
          postId: post[Post.idAttribute],
          userId: user[User.idAttribute]
        },
        {
          content: 'test3',
          postId: post[Post.idAttribute],
          userId: user[User.idAttribute]
        }
      ]
      assert.debug('create', props)
      const comments = await Promise.all([
        adapter.create(Comment, props[0]),
        adapter.create(Comment, props[1])
      ])
      assert.debug('created', JSON.stringify(comments, null, 2))

      comments.sort(function (a, b) {
        return a.content > b.content
      })

      const findPost = await adapter.find(Post, postId, {with: ['user', 'comment']})
      findPost.comments.sort(function (a, b) {
        return a.content > b.content
      })
      assert.equalObjects(findPost.user, user)
      assert.equalObjects(findPost.comments, comments)
    })

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
      let comment = await adapter.create(Comment, props)
      assert.debug('created', JSON.stringify(comment, null, 2))

      assert.debug('find', comment[Comment.idAttribute])
      comment = await adapter.find(Comment, comment[Comment.idAttribute], {'with': ['user', 'user.profile', 'post', 'post.user']})
      assert.debug('found', JSON.stringify(comment, null, 2))
      assert.isDefined(comment)
      assert.isDefined(comment.post)
      assert.isDefined(comment.post.user)
      assert.isDefined(comment.user)
      assert.isDefined(comment.user.profile)
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
      let post = await adapter.create(Post, props)
      assert.debug('created', JSON.stringify(post, null, 2))

      props = { content: 'test2', postId: post[Post.idAttribute], userId: post.userId }
      assert.debug('create', props)
      const comment = await adapter.create(Comment, props)
      assert.debug('created', JSON.stringify(comment, null, 2))

      assert.debug('find', props, comment[Comment.idAttribute])
      post = await adapter.find(Post, post[Post.idAttribute], {'with': ['user', 'comment', 'comment.user', 'comment.user.profile']})
      assert.debug('found', JSON.stringify(post, null, 2))

      assert.isDefined(post.comments)
      assert.isDefined(post.comments[0].user)
      assert.isDefined(post.comments[0].user.profile)
      assert.isDefined(post.user)
    })
  })
}

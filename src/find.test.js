/* global assert:true */
module.exports = function (options) {
  describe('Adapter#find', function () {
    var adapter, User, Profile, Post, Comment, Tag

    beforeEach(function () {
      adapter = this.$$adapter
      User = this.$$User
      Profile = this.$$Profile
      Post = this.$$Post
      Comment = this.$$Comment
      Tag = this.$$Tag
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
      assert.isDefined(user[User.idAttribute], 'created user should have an id')

      // Test beforeFind and afterFind
      adapter.beforeFind = function (mapper, id, opts) {
        assert.isObject(mapper, 'beforeFind should have received mapper argument')
        assert.isDefined(id, 'beforeFind should have received id argument')
        assert.isObject(opts, 'beforeFind should have received opts argument')
        // Optionally return a promise for async
        return Promise.resolve()
      }
      adapter.afterFind = function (mapper, id, opts, record) {
        assert.isObject(mapper, 'afterFind should have received mapper argument')
        assert.isDefined(id, 'afterFind should have received id argument')
        assert.isObject(opts, 'afterFind should have received opts argument')
        assert.isObject(record, 'afterFind should have received record argument')
        // Optionally return a promise for async
        return Promise.resolve()
      }

      assert.debug('find', user[User.idAttribute])
      let foundUser = await adapter.find(User, user[User.idAttribute])
      assert.debug('found', JSON.stringify(foundUser, null, 2))
      assert.equal(foundUser.name, 'John', 'name of found user should be "John"')
      assert.equal(foundUser[User.idAttribute], userId, 'found user should have correct id')

      // should allow re-assignment
      adapter.afterFind = function (mapper, id, opts, record) {
        assert.isObject(mapper, 'afterFind should have received mapper argument')
        assert.isDefined(id, 'afterFind should have received id argument')
        assert.isObject(opts, 'afterFind should have received opts argument')
        assert.isObject(record, 'afterFind should have received record argument')
        // Test re-assignment
        return Promise.resolve({ name: 'Sally', [User.idAttribute]: user[User.idAttribute] })
      }

      assert.debug('find', user[User.idAttribute])
      foundUser = await adapter.find(User, user[User.idAttribute])
      assert.debug('found', JSON.stringify(foundUser, null, 2))
      assert.equal(foundUser.name, 'Sally', 'name of found user should be "Sally"')
      assert.equal(foundUser[User.idAttribute], userId, 'found user should have correct id')
      // clear hook
      delete adapter.afterFind

      props = { content: 'test', userId: userId }
      assert.debug('create', props)
      const post = await adapter.create(Post, props)
      assert.debug('created', JSON.stringify(post, null, 2))
      const postId = post[Post.idAttribute]

      assert.equal(post.content, 'test')
      assert.isDefined(post[Post.idAttribute], 'created post should have an id')
      assert.equal(post.userId, userId, 'created post should have user foreign key')

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

      assert.debug('find', postId)
      const findPost = await adapter.find(Post, postId, { with: ['user', 'comment'] })
      assert.debug('found', findPost)
      findPost.comments.sort(function (a, b) {
        return a.content > b.content
      })
      assert.equalObjects(findPost.user, user, 'found post should have attached user')
      assert.equalObjects(findPost.comments, comments, 'found post should have attached comments')
    })

    it('should return raw', async function () {
      let props = { name: 'John' }
      assert.debug('create', props)
      const user = await adapter.create(User, props)
      assert.debug('created', JSON.stringify(user, null, 2))
      const userId = user[User.idAttribute]
      assert.equal(user.name, 'John', 'name of created user should be "John"')
      assert.isDefined(user[User.idAttribute], 'created user should have an id')

      assert.debug('find', user[User.idAttribute])
      const result = await adapter.find(User, user[User.idAttribute], { raw: true })
      assert.debug('found', JSON.stringify(result, null, 2))
      assert.isDefined(result.data, 'result.data is defined')
      assert.isDefined(result.found, 'result.found is defined')
      assert.equal(result.data.name, 'John', 'result.data.name should be "John"')
      assert.equal(result.data[User.idAttribute], userId, `result.data.${User.idAttribute} should be ${userId}`)
      assert.equal(result.found, 1, 'result.found should be 1')
    })

    it('should return nothing', async function () {
      assert.debug('find', 'non-existent-id')
      const result = await adapter.find(User, 'non-existent-id')
      assert.debug('found', JSON.stringify(result, null, 2))
      assert.isUndefined(result, 'result should be undefined')
    })

    it('should return raw and nothing', async function () {
      assert.debug('find', 'non-existent-id')
      const result = await adapter.find(User, 'non-existent-id', { raw: true })
      assert.debug('found', JSON.stringify(result, null, 2))
      assert.isUndefined(result.data, 'result.data should be undefined')
      assert.isDefined(result.found, 'result.found is defined')
      assert.equal(result.found, 0, 'result.found should be 0')
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

    if (options.features === 'all' || options.features.indexOf('findHasManyLocalKeys') !== -1) {
      it('should load hasMany localKeys (array) relations', async function () {
        let props = { value: 'big data' }
        assert.debug('create', props)
        const tag = await adapter.create(Tag, props)
        assert.debug('created', JSON.stringify(tag, null, 2))

        props = { value: 'servers' }
        assert.debug('create', props)
        const tag2 = await adapter.create(Tag, props)
        assert.debug('created', JSON.stringify(tag2, null, 2))

        props = { content: 'test', tagIds: [tag[Tag.idAttribute], tag2[Tag.idAttribute]] }
        assert.debug('create', props)
        let post = await adapter.create(Post, props)
        assert.debug('created', JSON.stringify(post, null, 2))

        assert.debug('find', props, post[Post.idAttribute])
        post = await adapter.find(Post, post[Post.idAttribute], { 'with': ['tag'] })
        assert.debug('found', JSON.stringify(post, null, 2))

        assert.isDefined(post.tags)
        assert.equal(post.content, 'test')
        assert.isDefined(post.tags[0][Tag.idAttribute])
        assert.isDefined(post.tags[1][Tag.idAttribute])
      })
      it('should load hasMany localKeys (empty array) relations', async function () {
        let props = { content: 'test' }
        assert.debug('create', props)
        let post = await adapter.create(Post, props)
        assert.debug('created', JSON.stringify(post, null, 2))

        assert.debug('find', props, post[Post.idAttribute])
        post = await adapter.find(Post, post[Post.idAttribute], { 'with': ['tag'] })
        assert.debug('found', JSON.stringify(post, null, 2))

        assert.isDefined(post.tags)
        assert.equal(post.content, 'test')
        assert.deepEqual(post.tags, [])
      })
      it('should load hasMany localKeys (object) relations', async function () {
        let props = { value: 'big data' }
        assert.debug('create', props)
        const tag = await adapter.create(Tag, props)
        assert.debug('created', JSON.stringify(tag, null, 2))

        props = { value: 'servers' }
        assert.debug('create', props)
        const tag2 = await adapter.create(Tag, props)
        assert.debug('created', JSON.stringify(tag2, null, 2))

        props = { content: 'test', tagIds: { [tag[Tag.idAttribute]]: true, [tag2[Tag.idAttribute]]: true } }
        assert.debug('create', props)
        let post = await adapter.create(Post, props)
        assert.debug('created', JSON.stringify(post, null, 2))

        assert.debug('find', props, post[Post.idAttribute])
        post = await adapter.find(Post, post[Post.idAttribute], { 'with': ['tag'] })
        assert.debug('found', JSON.stringify(post, null, 2))

        assert.isDefined(post.tags)
        assert.equal(post.content, 'test')
        assert.isDefined(post.tags[0][Tag.idAttribute])
        assert.isDefined(post.tags[1][Tag.idAttribute])
      })
    }

    if (options.features === 'all' || options.features.indexOf('findHasManyForeignKeys') !== -1) {
      it('should load hasMany foreignKeys (array) relations', async function () {
        let props = { value: 'big data' }
        assert.debug('create', props)
        let tag = await adapter.create(Tag, props)
        assert.debug('created', JSON.stringify(tag, null, 2))

        props = { value: 'servers' }
        assert.debug('create', props)
        let tag2 = await adapter.create(Tag, props)
        assert.debug('created', JSON.stringify(tag2, null, 2))

        props = { content: 'test', tagIds: [tag[Tag.idAttribute]] }
        assert.debug('create', props)
        let post = await adapter.create(Post, props)
        assert.debug('created', JSON.stringify(post, null, 2))

        props = { content: 'test2', tagIds: [tag[Tag.idAttribute], tag2[Tag.idAttribute]] }
        assert.debug('create', props)
        let post2 = await adapter.create(Post, props)
        assert.debug('created', JSON.stringify(post2, null, 2))

        assert.debug('find', props, tag[Tag.idAttribute])
        tag = await adapter.find(Tag, tag[Tag.idAttribute], { 'with': ['post'] })
        assert.debug('found', JSON.stringify(tag, null, 2))

        assert.isDefined(tag.posts)
        assert.equal(tag.value, 'big data')
        assert.equal(tag.posts.length, 2, 'tag should have two posts')

        assert.debug('find', props, tag2[Tag.idAttribute])
        tag2 = await adapter.find(Tag, tag2[Tag.idAttribute], { 'with': ['post'] })
        assert.debug('found', JSON.stringify(tag2, null, 2))

        assert.isDefined(tag2.posts)
        assert.equal(tag2.value, 'servers')
        assert.equal(tag2.posts.length, 1, 'tag2 should have one post')
        assert.objectsEqual(tag2.posts, [post2])
      })
    }
  })
}

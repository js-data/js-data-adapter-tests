(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["TestRunner"] = factory();
	else
		root["TestRunner"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }
	
	assert.equalObjects = function (a, b, m) {
	  assert.deepEqual(JSON.parse(JSON.stringify(a)), JSON.parse(JSON.stringify(b)), m || JSON.stringify(a) + ' should be equal to ' + JSON.stringify(b));
	};
	
	assert.objectsEqual = function (a, b, m) {
	  assert.deepEqual(JSON.parse(JSON.stringify(a)), JSON.parse(JSON.stringify(b)), m || JSON.stringify(a) + ' should be equal to ' + JSON.stringify(b));
	};
	
	var debug = false;
	
	assert.debug = function () {
	  if (debug) {
	    var _console;
	
	    (_console = console).log.apply(_console, arguments);
	  }
	};
	
	var prefix = 'TestRunner.init(options): options';
	
	module.exports = {
	  init: function init(options) {
	    options = options || {};
	    debug = !!options.debug;
	    options.methods = options.methods || 'all';
	    options.features = options.features || 'all';
	    if (!options.Adapter || typeof options.Adapter !== 'function') {
	      throw new Error(prefix + '.Adapter: Expected function, Actual: ' + _typeof(options.Adapter));
	    }
	    beforeEach(function () {
	      this.$$adapter = new options.Adapter(options.adapterConfig);
	      this.$$container = new options.JSData.Container(options.containerConfig || {
	        mapperDefaults: {
	          debug: false
	        }
	      });
	      this.$$store = new options.JSData.DataStore(options.storeConfig || {
	        mapperDefaults: {
	          debug: false
	        }
	      });
	      this.$$container.registerAdapter('adapter', this.$$adapter, { 'default': true });
	      this.$$store.registerAdapter('adapter', this.$$adapter, { 'default': true });
	      var userOptions = {
	        name: 'user',
	        relations: {
	          hasMany: {
	            post: {
	              localField: 'posts',
	              foreignKey: 'userId'
	            }
	          },
	          hasOne: {
	            profile: {
	              localField: 'profile',
	              foreignKey: 'userId'
	            },
	            address: {
	              localField: 'address',
	              foreignKey: 'userId'
	            }
	          },
	          belongsTo: {
	            organization: {
	              localField: 'organization',
	              foreignKey: 'organizationId'
	            }
	          }
	        }
	      };
	      var organizationOptions = {
	        name: 'organization',
	        relations: {
	          hasMany: {
	            user: {
	              localField: 'users',
	              foreignKey: 'organizationId'
	            }
	          }
	        }
	      };
	      var postOptions = {
	        name: 'post',
	        relations: {
	          belongsTo: {
	            user: {
	              localField: 'user',
	              foreignKey: 'userId'
	            }
	          },
	          hasMany: {
	            comment: {
	              localField: 'comments',
	              foreignKey: 'postId'
	            }
	          }
	        }
	      };
	      var commentOptions = {
	        name: 'comment',
	        relations: {
	          belongsTo: {
	            post: {
	              localField: 'post',
	              foreignKey: 'postId'
	            },
	            user: {
	              localField: 'user',
	              foreignKey: 'userId'
	            }
	          }
	        }
	      };
	      this.$$User = this.$$container.defineMapper('user', options.userConfig || options.JSData.utils.copy(userOptions));
	      this.$$store.defineMapper('user', options.userConfig || options.JSData.utils.copy(userOptions));
	      this.$$Organization = this.$$container.defineMapper('organization', options.organizationConfig || options.JSData.utils.copy(organizationOptions));
	      this.$$store.defineMapper('organization', options.organizationConfig || options.JSData.utils.copy(organizationOptions));
	      this.$$Profile = this.$$container.defineMapper('profile', options.profileConfig || {});
	      this.$$store.defineMapper('profile', options.profileConfig || {});
	      this.$$Address = this.$$container.defineMapper('address', options.addressConfig || {});
	      this.$$store.defineMapper('address', options.addressConfig || {});
	      this.$$Post = this.$$container.defineMapper('post', options.postConfig || options.JSData.utils.copy(postOptions));
	      this.$$store.defineMapper('post', options.postConfig || options.JSData.utils.copy(postOptions));
	      this.$$Comment = this.$$container.defineMapper('comment', options.commentConfig || options.JSData.utils.copy(commentOptions));
	      this.$$store.defineMapper('comment', options.commentConfig || options.JSData.utils.copy(commentOptions));
	    });
	
	    describe('js-data-adapter-tests', function () {
	      if (options.methods === 'all' || options.methods.indexOf('create') !== -1) {
	        __webpack_require__(1)(options);
	      }
	      if (options.methods === 'all' || options.methods.indexOf('createMany') !== -1) {
	        __webpack_require__(2)(options);
	      }
	      if (options.methods === 'all' || options.methods.indexOf('find') !== -1) {
	        __webpack_require__(3)(options);
	      }
	      if (options.methods === 'all' || options.methods.indexOf('findAll') !== -1) {
	        __webpack_require__(4)(options);
	      }
	      if (options.methods === 'all' || options.methods.indexOf('destroy') !== -1) {
	        __webpack_require__(5)(options);
	      }
	      if (options.methods === 'all' || options.methods.indexOf('destroyAll') !== -1) {
	        __webpack_require__(6)(options);
	      }
	      if (options.methods === 'all' || options.methods.indexOf('update') !== -1) {
	        __webpack_require__(7)(options);
	      }
	      if (options.methods === 'all' || options.methods.indexOf('updateAll') !== -1) {
	        __webpack_require__(8)(options);
	      }
	      if (options.methods === 'all' || options.methods.indexOf('updateMany') !== -1) {
	        __webpack_require__(9)(options);
	      }
	    });
	
	    afterEach(_asyncToGenerator(regeneratorRuntime.mark(function _callee() {
	      return regeneratorRuntime.wrap(function _callee$(_context) {
	        while (1) {
	          switch (_context.prev = _context.next) {
	            case 0:
	              _context.next = 2;
	              return this.$$adapter.destroyAll(this.$$Comment);
	
	            case 2:
	              _context.next = 4;
	              return this.$$adapter.destroyAll(this.$$Post);
	
	            case 4:
	              _context.next = 6;
	              return this.$$adapter.destroyAll(this.$$User);
	
	            case 6:
	              _context.next = 8;
	              return this.$$adapter.destroyAll(this.$$Profile);
	
	            case 8:
	              _context.next = 10;
	              return this.$$adapter.destroyAll(this.$$Address);
	
	            case 10:
	              _context.next = 12;
	              return this.$$adapter.destroyAll(this.$$Organization);
	
	            case 12:
	            case 'end':
	              return _context.stop();
	          }
	        }
	      }, _callee, this);
	    })));
	  },
	  assert: assert,
	  fail: function fail(msg) {
	    assert.equal('should not reach this!: ' + msg, 'failure');
	  },
	  TYPES_EXCEPT_STRING: [123, 123.123, null, undefined, {}, [], true, false, function () {}],
	  TYPES_EXCEPT_STRING_OR_ARRAY: [123, 123.123, null, undefined, {}, true, false, function () {}],
	  TYPES_EXCEPT_STRING_OR_NUMBER: [null, undefined, {}, [], true, false, function () {}],
	  TYPES_EXCEPT_STRING_OR_OBJECT: [123, 123.123, null, undefined, [], true, false, function () {}],
	  TYPES_EXCEPT_STRING_OR_NUMBER_OBJECT: [null, undefined, [], true, false, function () {}],
	  TYPES_EXCEPT_STRING_OR_ARRAY_OR_NUMBER: [null, undefined, {}, true, false, function () {}],
	  TYPES_EXCEPT_NUMBER: ['string', null, undefined, {}, [], true, false, function () {}],
	  TYPES_EXCEPT_OBJECT: ['string', 123, 123.123, null, undefined, true, false, function () {}],
	  TYPES_EXCEPT_BOOLEAN: ['string', 123, 123.123, null, undefined, {}, [], function () {}],
	  TYPES_EXCEPT_FUNCTION: ['string', 123, 123.123, null, undefined, {}, [], true, false]
	};

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }
	
	/* global assert:true */
	module.exports = function (options) {
	  describe('Adapter#create', function () {
	    it('should exist', function () {
	      assert.equal(_typeof(this.$$adapter.create), 'function', 'adapter should have a "create" method');
	    });
	    it('should create a user', _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
	      var adapter, User, props, user, foundUser;
	      return regeneratorRuntime.wrap(function _callee$(_context) {
	        while (1) {
	          switch (_context.prev = _context.next) {
	            case 0:
	              adapter = this.$$adapter;
	              User = this.$$User;
	              props = { name: 'John' };
	
	
	              assert.debug('create', props);
	              _context.next = 6;
	              return adapter.create(User, props);
	
	            case 6:
	              user = _context.sent;
	
	              assert.debug('created', JSON.stringify(user, null, 2));
	
	              assert.equal(user.name, props.name, 'name of user should be "' + props.name + '"');
	              assert.isDefined(user[User.idAttribute], 'new user should have an id');
	
	              assert.debug('find', user[User.idAttribute]);
	              _context.next = 13;
	              return adapter.find(User, user[User.idAttribute]);
	
	            case 13:
	              foundUser = _context.sent;
	
	              assert.debug('found', JSON.stringify(foundUser, null, 2));
	
	              assert.equal(foundUser.name, props.name, 'name of user should be "' + props.name + '"');
	              assert.isDefined(foundUser[User.idAttribute], 'new user should have an id');
	              assert.equal(foundUser[User.idAttribute], user[User.idAttribute]);
	
	            case 18:
	            case 'end':
	              return _context.stop();
	          }
	        }
	      }, _callee, this);
	    })));
	  });
	};

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }
	
	/* global assert:true */
	module.exports = function (options) {
	  describe('Adapter#createMany', function () {
	    it('should exist', function () {
	      assert.equal(_typeof(this.$$adapter.createMany), 'function', 'adapter should have a "createMany" method');
	    });
	    it('should create multiple users', _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
	      var adapter, User, user1, user2, users, users3;
	      return regeneratorRuntime.wrap(function _callee$(_context) {
	        while (1) {
	          switch (_context.prev = _context.next) {
	            case 0:
	              adapter = this.$$adapter;
	              User = this.$$User;
	              user1 = { name: 'John', age: 20 };
	              user2 = { name: 'John', age: 30 };
	              _context.next = 6;
	              return adapter.createMany(User, [user1, user2]);
	
	            case 6:
	              users = _context.sent;
	
	              users.sort(function (a, b) {
	                return a.age - b.age;
	              });
	              assert.isDefined(users[0].id);
	              assert.isDefined(users[1].id);
	              assert.equal(users.filter(function (x) {
	                return x.age === 20;
	              }).length, 1);
	              assert.equal(users.filter(function (x) {
	                return x.age === 30;
	              }).length, 1);
	
	              _context.next = 14;
	              return adapter.findAll(User, { age: 20 });
	
	            case 14:
	              users3 = _context.sent;
	
	              assert.equal(users3.length, 1);
	
	            case 16:
	            case 'end':
	              return _context.stop();
	          }
	        }
	      }, _callee, this);
	    })));
	  });
	};

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }
	
	/* global assert:true */
	module.exports = function (options) {
	      describe('Adapter#find', function () {
	            var adapter, User, Profile, Post, Comment;
	
	            beforeEach(function () {
	                  adapter = this.$$adapter;
	                  User = this.$$User;
	                  Profile = this.$$Profile;
	                  Post = this.$$Post;
	                  Comment = this.$$Comment;
	            });
	
	            it('should exist', function () {
	                  assert.equal(_typeof(adapter.find), 'function', 'adapter should have a "find" method');
	            });
	
	            it('should find a user', _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
	                  var props, user, userId, foundUser, post, postId, comments, findPost;
	                  return regeneratorRuntime.wrap(function _callee$(_context) {
	                        while (1) {
	                              switch (_context.prev = _context.next) {
	                                    case 0:
	                                          props = { name: 'John' };
	
	                                          assert.debug('create', props);
	                                          _context.next = 4;
	                                          return adapter.create(User, props);
	
	                                    case 4:
	                                          user = _context.sent;
	
	                                          assert.debug('created', JSON.stringify(user, null, 2));
	                                          userId = user[User.idAttribute];
	
	                                          assert.equal(user.name, 'John', 'name of created user should be "John"');
	                                          assert.isDefined(user[User.idAttribute]);
	
	                                          assert.debug('find', user[User.idAttribute]);
	                                          _context.next = 12;
	                                          return adapter.find(User, user[User.idAttribute]);
	
	                                    case 12:
	                                          foundUser = _context.sent;
	
	                                          assert.debug('found', JSON.stringify(foundUser, null, 2));
	                                          assert.equal(foundUser.name, 'John');
	                                          assert.isDefined(foundUser[User.idAttribute]);
	                                          assert.equal(foundUser[User.idAttribute], userId);
	                                          assert.equal(foundUser.name, 'John');
	
	                                          props = { content: 'test', userId: userId };
	                                          assert.debug('create', props);
	                                          _context.next = 22;
	                                          return adapter.create(Post, props);
	
	                                    case 22:
	                                          post = _context.sent;
	
	                                          assert.debug('created', JSON.stringify(post, null, 2));
	                                          postId = post[Post.idAttribute];
	
	
	                                          assert.equal(post.content, 'test');
	                                          assert.isDefined(post[Post.idAttribute]);
	                                          assert.equal(post.userId, userId);
	
	                                          props = [{
	                                                content: 'test2',
	                                                postId: post[Post.idAttribute],
	                                                userId: user[User.idAttribute]
	                                          }, {
	                                                content: 'test3',
	                                                postId: post[Post.idAttribute],
	                                                userId: user[User.idAttribute]
	                                          }];
	                                          assert.debug('create', props);
	                                          _context.next = 32;
	                                          return Promise.all([adapter.create(Comment, props[0]), adapter.create(Comment, props[1])]);
	
	                                    case 32:
	                                          comments = _context.sent;
	
	                                          assert.debug('created', JSON.stringify(comments, null, 2));
	
	                                          comments.sort(function (a, b) {
	                                                return a.content > b.content;
	                                          });
	
	                                          _context.next = 37;
	                                          return adapter.find(Post, postId, { with: ['user', 'comment'] });
	
	                                    case 37:
	                                          findPost = _context.sent;
	
	                                          findPost.comments.sort(function (a, b) {
	                                                return a.content > b.content;
	                                          });
	                                          assert.equalObjects(findPost.user, user);
	                                          assert.equalObjects(findPost.comments, comments);
	
	                                    case 41:
	                                    case 'end':
	                                          return _context.stop();
	                              }
	                        }
	                  }, _callee, this);
	            })));
	
	            it('should load belongsTo relations', _asyncToGenerator(regeneratorRuntime.mark(function _callee2() {
	                  var props, user, profile, post, comment;
	                  return regeneratorRuntime.wrap(function _callee2$(_context2) {
	                        while (1) {
	                              switch (_context2.prev = _context2.next) {
	                                    case 0:
	                                          props = { name: 'John' };
	
	                                          assert.debug('create', props);
	                                          _context2.next = 4;
	                                          return adapter.create(User, props);
	
	                                    case 4:
	                                          user = _context2.sent;
	
	                                          assert.debug('created', JSON.stringify(user, null, 2));
	
	                                          props = { email: 'foo@test.com', userId: user[User.idAttribute] };
	                                          assert.debug('create', props);
	                                          _context2.next = 10;
	                                          return adapter.create(Profile, props);
	
	                                    case 10:
	                                          profile = _context2.sent;
	
	                                          assert.debug('created', JSON.stringify(profile, null, 2));
	
	                                          props = { content: 'foo', userId: user[User.idAttribute] };
	                                          assert.debug('create', props);
	                                          _context2.next = 16;
	                                          return adapter.create(Post, props);
	
	                                    case 16:
	                                          post = _context2.sent;
	
	                                          assert.debug('created', JSON.stringify(post, null, 2));
	
	                                          props = { content: 'test2', postId: post[Post.idAttribute], userId: post.userId };
	                                          assert.debug('create', props);
	                                          _context2.next = 22;
	                                          return adapter.create(Comment, props);
	
	                                    case 22:
	                                          comment = _context2.sent;
	
	                                          assert.debug('created', JSON.stringify(comment, null, 2));
	
	                                          assert.debug('find', comment[Comment.idAttribute]);
	                                          _context2.next = 27;
	                                          return adapter.find(Comment, comment[Comment.idAttribute], { 'with': ['user', 'user.profile', 'post', 'post.user'] });
	
	                                    case 27:
	                                          comment = _context2.sent;
	
	                                          assert.debug('found', JSON.stringify(comment, null, 2));
	
	                                          assert.isDefined(comment);
	                                          assert.isDefined(comment.post);
	                                          assert.isDefined(comment.post.user);
	                                          assert.isDefined(comment.user);
	                                          assert.isDefined(comment.user.profile);
	
	                                    case 34:
	                                    case 'end':
	                                          return _context2.stop();
	                              }
	                        }
	                  }, _callee2, this);
	            })));
	
	            it('should load hasMany and belongsTo relations', _asyncToGenerator(regeneratorRuntime.mark(function _callee3() {
	                  var props, user, profile, post, comment;
	                  return regeneratorRuntime.wrap(function _callee3$(_context3) {
	                        while (1) {
	                              switch (_context3.prev = _context3.next) {
	                                    case 0:
	                                          props = { name: 'John' };
	
	                                          assert.debug('create', props);
	                                          _context3.next = 4;
	                                          return adapter.create(User, props);
	
	                                    case 4:
	                                          user = _context3.sent;
	
	                                          assert.debug('created', JSON.stringify(user, null, 2));
	
	                                          props = { email: 'foo@test.com', userId: user[User.idAttribute] };
	                                          assert.debug('create', props);
	                                          _context3.next = 10;
	                                          return adapter.create(Profile, props);
	
	                                    case 10:
	                                          profile = _context3.sent;
	
	                                          assert.debug('created', JSON.stringify(profile, null, 2));
	
	                                          props = { content: 'foo', userId: user[User.idAttribute] };
	                                          assert.debug('create', props);
	                                          _context3.next = 16;
	                                          return adapter.create(Post, props);
	
	                                    case 16:
	                                          post = _context3.sent;
	
	                                          assert.debug('created', JSON.stringify(post, null, 2));
	
	                                          props = { content: 'test2', postId: post[Post.idAttribute], userId: post.userId };
	                                          assert.debug('create', props);
	                                          _context3.next = 22;
	                                          return adapter.create(Comment, props);
	
	                                    case 22:
	                                          comment = _context3.sent;
	
	                                          assert.debug('created', JSON.stringify(comment, null, 2));
	
	                                          assert.debug('find', props, comment[Comment.idAttribute]);
	                                          _context3.next = 27;
	                                          return adapter.find(Post, post[Post.idAttribute], { 'with': ['user', 'comment', 'comment.user', 'comment.user.profile'] });
	
	                                    case 27:
	                                          post = _context3.sent;
	
	                                          assert.debug('found', JSON.stringify(post, null, 2));
	
	                                          assert.isDefined(post.comments);
	                                          assert.isDefined(post.comments[0].user);
	                                          assert.isDefined(post.comments[0].user.profile);
	                                          assert.isDefined(post.user);
	
	                                    case 33:
	                                    case 'end':
	                                          return _context3.stop();
	                              }
	                        }
	                  }, _callee3, this);
	            })));
	      });
	};

/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }
	
	/* global assert:true */
	module.exports = function (options) {
	  describe('Adapter#findAll', function () {
	    var adapter, User, Profile, Post, Comment;
	
	    beforeEach(function () {
	      adapter = this.$$adapter;
	      User = this.$$User;
	      Profile = this.$$Profile;
	      Post = this.$$Post;
	      Comment = this.$$Comment;
	    });
	
	    it('should exist', function () {
	      assert.equal(_typeof(adapter.findAll), 'function', 'adapter should have a "findAll" method');
	    });
	
	    it('should filter users', _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
	      var props, users, user, userId, users2;
	      return regeneratorRuntime.wrap(function _callee$(_context) {
	        while (1) {
	          switch (_context.prev = _context.next) {
	            case 0:
	              props = { name: 'John' };
	
	              assert.debug('findAll', { age: 30 });
	              _context.next = 4;
	              return adapter.findAll(User, { age: 30 });
	
	            case 4:
	              users = _context.sent;
	
	              assert.debug('found', JSON.stringify(users, null, 2));
	              assert.equal(users.length, 0);
	
	              assert.debug('create', props);
	              _context.next = 10;
	              return adapter.create(User, props);
	
	            case 10:
	              user = _context.sent;
	
	              assert.debug('created', JSON.stringify(user, null, 2));
	              userId = user[User.idAttribute];
	
	
	              assert.debug('findAll', { name: 'John' });
	              _context.next = 16;
	              return adapter.findAll(User, { name: 'John' });
	
	            case 16:
	              users2 = _context.sent;
	
	              assert.debug('found', JSON.stringify(users2, null, 2));
	
	              assert.equal(users2.length, 1);
	              assert.equal(users2[0][User.idAttribute], userId);
	              assert.equal(users2[0].name, 'John');
	
	            case 21:
	            case 'end':
	              return _context.stop();
	          }
	        }
	      }, _callee, this);
	    })));
	
	    if (options.features === 'all' || options.features.indexOf('inOp') !== -1) {
	      it('should filter users using the "in" operator', _asyncToGenerator(regeneratorRuntime.mark(function _callee2() {
	        var users, user, id, users2, destroyedUser;
	        return regeneratorRuntime.wrap(function _callee2$(_context2) {
	          while (1) {
	            switch (_context2.prev = _context2.next) {
	              case 0:
	                _context2.next = 2;
	                return adapter.findAll(User, {
	                  where: {
	                    age: {
	                      'in': [30]
	                    }
	                  }
	                });
	
	              case 2:
	                users = _context2.sent;
	
	                assert.equal(users.length, 0);
	
	                _context2.next = 6;
	                return adapter.create(User, { name: 'John' });
	
	              case 6:
	                user = _context2.sent;
	                id = user.id;
	                _context2.next = 10;
	                return adapter.findAll(User, { name: 'John' });
	
	              case 10:
	                users2 = _context2.sent;
	
	                assert.equal(users2.length, 1);
	                assert.equal(users2[0].id, id);
	                assert.equal(users2[0].name, 'John');
	
	                _context2.next = 16;
	                return adapter.destroy(User, id);
	
	              case 16:
	                destroyedUser = _context2.sent;
	
	                assert.isFalse(!!destroyedUser);
	
	              case 18:
	              case 'end':
	                return _context2.stop();
	            }
	          }
	        }, _callee2, this);
	      })));
	    }
	
	    if (options.features === 'all' || options.features.indexOf('likeOp') !== -1) {
	      it('should filter users using the "like" operator', _asyncToGenerator(regeneratorRuntime.mark(function _callee3() {
	        var users, user, id, users2, destroyedUser;
	        return regeneratorRuntime.wrap(function _callee3$(_context3) {
	          while (1) {
	            switch (_context3.prev = _context3.next) {
	              case 0:
	                _context3.next = 2;
	                return adapter.findAll(User, {
	                  where: {
	                    name: {
	                      'like': '%J%'
	                    }
	                  }
	                });
	
	              case 2:
	                users = _context3.sent;
	
	                assert.equal(users.length, 0);
	
	                _context3.next = 6;
	                return adapter.create(User, { name: 'John' });
	
	              case 6:
	                user = _context3.sent;
	                id = user.id;
	                _context3.next = 10;
	                return adapter.findAll(User, {
	                  where: {
	                    name: {
	                      'like': '%J%'
	                    }
	                  }
	                });
	
	              case 10:
	                users2 = _context3.sent;
	
	                assert.equal(users2.length, 1);
	                assert.equal(users2[0].id, id);
	                assert.equal(users2[0].name, 'John');
	
	                _context3.next = 16;
	                return adapter.destroy(User, id);
	
	              case 16:
	                destroyedUser = _context3.sent;
	
	                assert.isFalse(!!destroyedUser);
	
	              case 18:
	              case 'end':
	                return _context3.stop();
	            }
	          }
	        }, _callee3, this);
	      })));
	    }
	
	    if (options.features === 'all' || options.features.indexOf('filterOpNotFound') !== -1) {
	      it('should throw "Operator not found" error', _asyncToGenerator(regeneratorRuntime.mark(function _callee4() {
	        return regeneratorRuntime.wrap(function _callee4$(_context4) {
	          while (1) {
	            switch (_context4.prev = _context4.next) {
	              case 0:
	                assert.throw(function () {
	                  return adapter.findAll(User, {
	                    where: {
	                      name: {
	                        op: 'John'
	                      }
	                    }
	                  });
	                }, Error, 'Operator not found');
	
	              case 1:
	              case 'end':
	                return _context4.stop();
	            }
	          }
	        }, _callee4, this);
	      })));
	    }
	
	    it('should load belongsTo relations', _asyncToGenerator(regeneratorRuntime.mark(function _callee5() {
	      var props, user, profile, post, comment, user2, post2, comment2, comments;
	      return regeneratorRuntime.wrap(function _callee5$(_context5) {
	        while (1) {
	          switch (_context5.prev = _context5.next) {
	            case 0:
	              props = { name: 'John' };
	
	              assert.debug('create', props);
	              _context5.next = 4;
	              return adapter.create(User, props);
	
	            case 4:
	              user = _context5.sent;
	
	              assert.debug('created', JSON.stringify(user, null, 2));
	
	              props = { email: 'foo@test.com', userId: user[User.idAttribute] };
	              assert.debug('create', props);
	              _context5.next = 10;
	              return adapter.create(Profile, props);
	
	            case 10:
	              profile = _context5.sent;
	
	              assert.debug('created', JSON.stringify(profile, null, 2));
	
	              props = { content: 'foo', userId: user[User.idAttribute] };
	              assert.debug('create', props);
	              _context5.next = 16;
	              return adapter.create(Post, props);
	
	            case 16:
	              post = _context5.sent;
	
	              assert.debug('created', JSON.stringify(post, null, 2));
	
	              props = { content: 'test2', postId: post[Post.idAttribute], userId: post.userId };
	              assert.debug('create', props);
	              _context5.next = 22;
	              return adapter.create(Comment, props);
	
	            case 22:
	              comment = _context5.sent;
	
	              assert.debug('created', JSON.stringify(comment, null, 2));
	
	              props = { name: 'Sally' };
	              assert.debug('create', props);
	              _context5.next = 28;
	              return adapter.create(User, props);
	
	            case 28:
	              user2 = _context5.sent;
	
	              assert.debug('created', JSON.stringify(user2, null, 2));
	
	              props = { content: 'bar', userId: user2[User.idAttribute] };
	              assert.debug('create', props);
	              _context5.next = 34;
	              return adapter.create(Post, props);
	
	            case 34:
	              post2 = _context5.sent;
	
	              assert.debug('created', JSON.stringify(post2, null, 2));
	
	              props = { content: 'test67', postId: post2[Post.idAttribute], userId: post2.userId };
	              assert.debug('create', props);
	              _context5.next = 40;
	              return adapter.create(Comment, props);
	
	            case 40:
	              comment2 = _context5.sent;
	
	              assert.debug('created', JSON.stringify(comment2, null, 2));
	
	              assert.debug('findAll');
	              _context5.next = 45;
	              return adapter.findAll(Comment, {}, { 'with': ['user', 'user.profile', 'post', 'post.user'] });
	
	            case 45:
	              comments = _context5.sent;
	
	              assert.debug('found', JSON.stringify(comments, null, 2));
	
	              assert.isDefined(comments[0].post);
	              assert.isDefined(comments[0].post.user);
	              assert.isDefined(comments[0].user);
	              assert.isDefined(comments[0].user.profile || comments[1].user.profile);
	              assert.isDefined(comments[1].post);
	              assert.isDefined(comments[1].post.user);
	              assert.isDefined(comments[1].user);
	
	            case 54:
	            case 'end':
	              return _context5.stop();
	          }
	        }
	      }, _callee5, this);
	    })));
	
	    it('should load hasMany and belongsTo relations', _asyncToGenerator(regeneratorRuntime.mark(function _callee6() {
	      var props, user, profile, post, comment, user2, post2, comment2, posts;
	      return regeneratorRuntime.wrap(function _callee6$(_context6) {
	        while (1) {
	          switch (_context6.prev = _context6.next) {
	            case 0:
	              props = { name: 'John' };
	
	              assert.debug('create', props);
	              _context6.next = 4;
	              return adapter.create(User, props);
	
	            case 4:
	              user = _context6.sent;
	
	              assert.debug('created', JSON.stringify(user, null, 2));
	
	              props = { email: 'foo@test.com', userId: user[User.idAttribute] };
	              assert.debug('create', props);
	              _context6.next = 10;
	              return adapter.create(Profile, props);
	
	            case 10:
	              profile = _context6.sent;
	
	              assert.debug('created', JSON.stringify(profile, null, 2));
	
	              props = { content: 'foo', userId: user[User.idAttribute] };
	              assert.debug('create', props);
	              _context6.next = 16;
	              return adapter.create(Post, props);
	
	            case 16:
	              post = _context6.sent;
	
	              assert.debug('created', JSON.stringify(post, null, 2));
	
	              props = { content: 'test2', postId: post[Post.idAttribute], userId: post.userId };
	              assert.debug('create', props);
	              _context6.next = 22;
	              return adapter.create(Comment, props);
	
	            case 22:
	              comment = _context6.sent;
	
	              assert.debug('created', JSON.stringify(comment, null, 2));
	
	              props = { name: 'Sally' };
	              assert.debug('create', props);
	              _context6.next = 28;
	              return adapter.create(User, props);
	
	            case 28:
	              user2 = _context6.sent;
	
	              assert.debug('created', JSON.stringify(user2, null, 2));
	
	              props = { content: 'bar', userId: user2[User.idAttribute] };
	              assert.debug('create', props);
	              _context6.next = 34;
	              return adapter.create(Post, props);
	
	            case 34:
	              post2 = _context6.sent;
	
	              assert.debug('created', JSON.stringify(post2, null, 2));
	
	              props = { content: 'test67', postId: post2[Post.idAttribute], userId: post2.userId };
	              assert.debug('create', props);
	              _context6.next = 40;
	              return adapter.create(Comment, props);
	
	            case 40:
	              comment2 = _context6.sent;
	
	              assert.debug('created', JSON.stringify(comment2, null, 2));
	
	              assert.debug('find');
	              _context6.next = 45;
	              return adapter.findAll(Post, {}, { 'with': ['user', 'comment', 'comment.user', 'comment.user.profile'] });
	
	            case 45:
	              posts = _context6.sent;
	
	              assert.debug('found', JSON.stringify(posts, null, 2));
	
	              assert.isDefined(posts[0].comments);
	              assert.isDefined(posts[0].comments[0].user);
	              assert.isDefined(posts[0].comments[0].user.profile || posts[1].comments[0].user.profile);
	              assert.isDefined(posts[0].user);
	              assert.isDefined(posts[1].comments);
	              assert.isDefined(posts[1].comments[0].user);
	              assert.isDefined(posts[1].user);
	
	            case 54:
	            case 'end':
	              return _context6.stop();
	          }
	        }
	      }, _callee6, this);
	    })));
	
	    if (options.features === 'all' || options.features.indexOf('filterOnRelations') !== -1) {
	      it('should filter using belongsTo relation', _asyncToGenerator(regeneratorRuntime.mark(function _callee7() {
	        var profile1, user1, post1, user2, post2, users;
	        return regeneratorRuntime.wrap(function _callee7$(_context7) {
	          while (1) {
	            switch (_context7.prev = _context7.next) {
	              case 0:
	                _context7.next = 2;
	                return adapter.create(Profile, { email: 'foo@test.com' });
	
	              case 2:
	                profile1 = _context7.sent;
	                _context7.next = 5;
	                return adapter.create(User, { name: 'John', profileId: profile1.id });
	
	              case 5:
	                user1 = _context7.sent;
	                _context7.next = 8;
	                return adapter.create(Post, { content: 'foo', userId: user1.id });
	
	              case 8:
	                post1 = _context7.sent;
	                _context7.next = 11;
	                return adapter.create(Comment, { content: 'test1', postId: post1.id, userId: post1.userId });
	
	              case 11:
	                _context7.next = 13;
	                return adapter.create(User, { name: 'Sally' });
	
	              case 13:
	                user2 = _context7.sent;
	                _context7.next = 16;
	                return adapter.create(Post, { content: 'bar', userId: user2.id });
	
	              case 16:
	                post2 = _context7.sent;
	                _context7.next = 19;
	                return adapter.create(Comment, { content: 'test2', postId: post2.id, userId: post2.userId });
	
	              case 19:
	                _context7.next = 21;
	                return adapter.findAll(User, { 'profile.email': 'foo@test.com' });
	
	              case 21:
	                users = _context7.sent;
	
	                assert.equal(users.length, 1);
	                assert.equal(users[0].profileId, profile1.id);
	                assert.equal(users[0].name, 'John');
	
	              case 25:
	              case 'end':
	                return _context7.stop();
	            }
	          }
	        }, _callee7, this);
	      })));
	
	      it('should filter through multiple hasOne/belongsTo relations', _asyncToGenerator(regeneratorRuntime.mark(function _callee8() {
	        var profile1, user1, post1, profile2, user2, post2, comments;
	        return regeneratorRuntime.wrap(function _callee8$(_context8) {
	          while (1) {
	            switch (_context8.prev = _context8.next) {
	              case 0:
	                _context8.next = 2;
	                return adapter.create(Profile, { email: 'foo@test.com' });
	
	              case 2:
	                profile1 = _context8.sent;
	                _context8.next = 5;
	                return adapter.create(User, { name: 'John', profileId: profile1.id });
	
	              case 5:
	                user1 = _context8.sent;
	                _context8.next = 8;
	                return adapter.create(Post, { content: 'foo', userId: user1.id });
	
	              case 8:
	                post1 = _context8.sent;
	                _context8.next = 11;
	                return adapter.create(Comment, { content: 'test1', postId: post1.id, userId: post1.userId });
	
	              case 11:
	                _context8.next = 13;
	                return adapter.create(Profile, { email: 'bar@test.com' });
	
	              case 13:
	                profile2 = _context8.sent;
	                _context8.next = 16;
	                return adapter.create(User, { name: 'Sally', profileId: profile2.id });
	
	              case 16:
	                user2 = _context8.sent;
	                _context8.next = 19;
	                return adapter.create(Post, { content: 'bar', userId: user2.id });
	
	              case 19:
	                post2 = _context8.sent;
	                _context8.next = 22;
	                return adapter.create(Comment, { content: 'test2', postId: post2.id, userId: post2.userId });
	
	              case 22:
	                _context8.next = 24;
	                return adapter.findAll(Comment, { 'user.profile.email': 'foo@test.com' });
	
	              case 24:
	                comments = _context8.sent;
	
	                assert.equal(comments.length, 1);
	                assert.equal(comments[0].userId, user1.id);
	                assert.equal(comments[0].content, 'test1');
	
	              case 28:
	              case 'end':
	                return _context8.stop();
	            }
	          }
	        }, _callee8, this);
	      })));
	
	      it('should filter using multiple hasOne/belongsTo relations', _asyncToGenerator(regeneratorRuntime.mark(function _callee9() {
	        var profile1, user1, post1, profile2, user2, post2, comments;
	        return regeneratorRuntime.wrap(function _callee9$(_context9) {
	          while (1) {
	            switch (_context9.prev = _context9.next) {
	              case 0:
	                _context9.next = 2;
	                return adapter.create(Profile, { email: 'foo@test.com' });
	
	              case 2:
	                profile1 = _context9.sent;
	                _context9.next = 5;
	                return adapter.create(User, { name: 'John', profileId: profile1.id });
	
	              case 5:
	                user1 = _context9.sent;
	                _context9.next = 8;
	                return adapter.create(Post, { content: 'foo', userId: user1.id });
	
	              case 8:
	                post1 = _context9.sent;
	                _context9.next = 11;
	                return adapter.create(Comment, { content: 'test1', postId: post1.id, userId: post1.userId });
	
	              case 11:
	                _context9.next = 13;
	                return adapter.create(Profile, { email: 'bar@test.com' });
	
	              case 13:
	                profile2 = _context9.sent;
	                _context9.next = 16;
	                return adapter.create(User, { name: 'Sally', profileId: profile2.id });
	
	              case 16:
	                user2 = _context9.sent;
	                _context9.next = 19;
	                return adapter.create(Post, { content: 'bar', userId: user2.id });
	
	              case 19:
	                post2 = _context9.sent;
	                _context9.next = 22;
	                return adapter.create(Comment, { content: 'test2', postId: post2.id, userId: post2.userId });
	
	              case 22:
	                _context9.next = 24;
	                return adapter.findAll(Comment, { 'user.name': 'John', 'user.profile.email': 'foo@test.com' });
	
	              case 24:
	                comments = _context9.sent;
	
	                assert.equal(comments.length, 1);
	                assert.equal(comments[0].userId, user1.id);
	                assert.equal(comments[0].content, 'test1');
	
	              case 28:
	              case 'end':
	                return _context9.stop();
	            }
	          }
	        }, _callee9, this);
	      })));
	    }
	
	    it('should allow passing limit and offset as strings', _asyncToGenerator(regeneratorRuntime.mark(function _callee10() {
	      return regeneratorRuntime.wrap(function _callee10$(_context10) {
	        while (1) {
	          switch (_context10.prev = _context10.next) {
	            case 0:
	              _context10.next = 2;
	              return adapter.findAll(User, { limit: '10', offset: '20' });
	
	            case 2:
	            case 'end':
	              return _context10.stop();
	          }
	        }
	      }, _callee10, this);
	    })));
	  });
	};

/***/ },
/* 5 */
/***/ function(module, exports) {

	'use strict';
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }
	
	/* global assert:true */
	module.exports = function (options) {
	  describe('Adapter#destroy', function () {
	    it('should exist', function () {
	      assert.equal(_typeof(this.$$adapter.destroy), 'function', 'adapter should have a "destroy" method');
	    });
	    it('should destroy a user', _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
	      var adapter, User, props, user, destroyedUser;
	      return regeneratorRuntime.wrap(function _callee$(_context) {
	        while (1) {
	          switch (_context.prev = _context.next) {
	            case 0:
	              adapter = this.$$adapter;
	              User = this.$$User;
	              props = { name: 'John' };
	
	
	              assert.debug('create', props);
	              _context.next = 6;
	              return adapter.create(User, props);
	
	            case 6:
	              user = _context.sent;
	
	              assert.debug('created', JSON.stringify(user, null, 2));
	
	              assert.debug('destroy', user[User.idAttribute]);
	              _context.next = 11;
	              return adapter.destroy(User, user[User.idAttribute]);
	
	            case 11:
	              destroyedUser = _context.sent;
	
	              assert.debug('destroyed', JSON.stringify(destroyedUser, null, 2));
	              assert.equal(destroyedUser, createUser.id);
	
	              _context.next = 16;
	              return adapter.find(User, user[User.idAttribute]);
	
	            case 16:
	              user = _context.sent;
	
	              assert.isTrue(!user);
	
	            case 18:
	            case 'end':
	              return _context.stop();
	          }
	        }
	      }, _callee, this);
	    })));
	  });
	};

/***/ },
/* 6 */
/***/ function(module, exports) {

	'use strict';
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }
	
	/* global assert:true */
	module.exports = function (options) {
	  describe('Adapter#destroyAll', function () {
	    it('should exist', function () {
	      assert.equal(_typeof(this.$$adapter.destroyAll), 'function', 'adapter should have a "destroyAll" method');
	    });
	    it('should destroy all users', _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
	      var adapter, User, props, user, foundUsers, destroyedUsers;
	      return regeneratorRuntime.wrap(function _callee$(_context) {
	        while (1) {
	          switch (_context.prev = _context.next) {
	            case 0:
	              adapter = this.$$adapter;
	              User = this.$$User;
	              props = { name: 'John' };
	
	
	              assert.debug('create', props);
	              _context.next = 6;
	              return adapter.create(User, props);
	
	            case 6:
	              user = _context.sent;
	
	              assert.debug('created', JSON.stringify(user, null, 2));
	
	              assert.debug('findAll', props);
	              _context.next = 11;
	              return adapter.findAll(User, props);
	
	            case 11:
	              foundUsers = _context.sent;
	
	              assert.debug('found', JSON.stringify(foundUsers, null, 2));
	              assert.equal(foundUsers.length, 1);
	              assert.equal(foundUsers[0][User.idAttribute], user[User.idAttribute]);
	              assert.equal(foundUsers[0].name, 'John');
	
	              assert.debug('destroyAll', props);
	              _context.next = 19;
	              return adapter.destroyAll(User, props);
	
	            case 19:
	              destroyedUsers = _context.sent;
	
	              assert.equal(destroyedUsers.length, 2);
	              assert.debug('destroyed', JSON.stringify(destroyedUsers, null, 2));
	
	              assert.debug('findAll', props);
	              _context.next = 25;
	              return adapter.findAll(User, props);
	
	            case 25:
	              foundUsers = _context.sent;
	
	              assert.debug('found', JSON.stringify(foundUsers, null, 2));
	              assert.equal(foundUsers.length, 0);
	
	            case 28:
	            case 'end':
	              return _context.stop();
	          }
	        }
	      }, _callee, this);
	    })));
	  });
	};

/***/ },
/* 7 */
/***/ function(module, exports) {

	'use strict';
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }
	
	/* global assert:true */
	module.exports = function (options) {
	      describe('Adapter#update', function () {
	            it('should exist', function () {
	                  assert.equal(_typeof(this.$$adapter.update), 'function', 'adapter should have a "update" method');
	            });
	            it('should update a user', _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
	                  var adapter, User, props, user, foundUser, updatedUser;
	                  return regeneratorRuntime.wrap(function _callee$(_context) {
	                        while (1) {
	                              switch (_context.prev = _context.next) {
	                                    case 0:
	                                          adapter = this.$$adapter;
	                                          User = this.$$User;
	                                          props = { name: 'John' };
	
	
	                                          assert.debug('create', props);
	                                          _context.next = 6;
	                                          return adapter.create(User, props);
	
	                                    case 6:
	                                          user = _context.sent;
	
	                                          assert.debug('created', JSON.stringify(user, null, 2));
	
	                                          assert.equal(user.name, props.name, 'name of user should be "' + props.name + '"');
	                                          assert.isDefined(user[User.idAttribute], 'new user should have an id');
	
	                                          assert.debug('find', user[User.idAttribute]);
	                                          _context.next = 13;
	                                          return adapter.find(User, user[User.idAttribute]);
	
	                                    case 13:
	                                          foundUser = _context.sent;
	
	                                          assert.debug('found', JSON.stringify(foundUser, null, 2));
	
	                                          assert.equal(foundUser.name, props.name, 'name of user should be "' + props.name + '"');
	                                          assert.isDefined(foundUser[User.idAttribute], 'new user should have an id');
	                                          assert.equal(foundUser[User.idAttribute], user[User.idAttribute]);
	
	                                          assert.debug('update', user[User.idAttribute], { name: 'Johnny' });
	                                          _context.next = 21;
	                                          return adapter.update(User, user[User.idAttribute], { name: 'Johnny' });
	
	                                    case 21:
	                                          updatedUser = _context.sent;
	
	                                          assert.debug('found', JSON.stringify(updatedUser, null, 2));
	                                          assert.equal(updatedUser.name, 'Johnny');
	                                          assert.equal(updatedUser[User.idAttribute], user[User.idAttribute]);
	
	                                          assert.debug('find', user[User.idAttribute]);
	                                          _context.next = 28;
	                                          return adapter.find(User, user[User.idAttribute]);
	
	                                    case 28:
	                                          foundUser = _context.sent;
	
	                                          assert.debug('found', JSON.stringify(foundUser, null, 2));
	                                          assert.equal(foundUser.name, 'Johnny');
	                                          assert.equal(foundUser[User.idAttribute], user[User.idAttribute]);
	
	                                    case 32:
	                                    case 'end':
	                                          return _context.stop();
	                              }
	                        }
	                  }, _callee, this);
	            })));
	      });
	};

/***/ },
/* 8 */
/***/ function(module, exports) {

	'use strict';
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }
	
	/* global assert:true */
	module.exports = function (options) {
	      describe('Adapter#updateAll', function () {
	            it('should exist', function () {
	                  assert.equal(_typeof(this.$$adapter.updateAll), 'function', 'adapter should have a "updateAll" method');
	            });
	            it('should update multiple users', _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
	                  var adapter, User, props, user1, userId1, user2, userId2, users, users2, users3, users4;
	                  return regeneratorRuntime.wrap(function _callee$(_context) {
	                        while (1) {
	                              switch (_context.prev = _context.next) {
	                                    case 0:
	                                          adapter = this.$$adapter;
	                                          User = this.$$User;
	                                          props = { name: 'John', age: 20 };
	
	
	                                          assert.debug('create', props);
	                                          _context.next = 6;
	                                          return adapter.create(User, props);
	
	                                    case 6:
	                                          user1 = _context.sent;
	
	                                          assert.debug('created', JSON.stringify(user1, null, 2));
	                                          userId1 = user1[User.idAttribute];
	
	
	                                          props = { name: 'John', age: 30 };
	
	                                          assert.debug('create', props);
	                                          _context.next = 13;
	                                          return adapter.create(User, props);
	
	                                    case 13:
	                                          user2 = _context.sent;
	
	                                          assert.debug('created', JSON.stringify(user2, null, 2));
	                                          userId2 = user2[User.idAttribute];
	
	
	                                          assert.debug('findAll', { name: 'John' });
	                                          _context.next = 19;
	                                          return adapter.findAll(User, { name: 'John' });
	
	                                    case 19:
	                                          users = _context.sent;
	
	                                          assert.debug('found', JSON.stringify(users, null, 2));
	                                          users.sort(function (a, b) {
	                                                return a.age - b.age;
	                                          });
	                                          assert.equal(users[0].name, 'John');
	                                          assert.equal(users[0].name, 'John');
	                                          assert.equal(users.filter(function (x) {
	                                                return x[User.idAttribute] === userId1;
	                                          }).length, 1);
	                                          assert.equal(users.filter(function (x) {
	                                                return x[User.idAttribute] === userId2;
	                                          }).length, 1);
	                                          assert.equal(users.filter(function (x) {
	                                                return x.age === 20;
	                                          }).length, 1);
	                                          assert.equal(users.filter(function (x) {
	                                                return x.age === 30;
	                                          }).length, 1);
	
	                                          assert.debug('updateAll', { name: 'Johnny' }, { name: 'John' });
	                                          _context.next = 31;
	                                          return adapter.updateAll(User, { name: 'Johnny' }, { name: 'John' });
	
	                                    case 31:
	                                          users2 = _context.sent;
	
	                                          assert.debug('updated', JSON.stringify(users2, null, 2));
	                                          users2.sort(function (a, b) {
	                                                return a.age - b.age;
	                                          });
	                                          assert.equal(users2[0].name, 'Johnny');
	                                          assert.equal(users2[0].name, 'Johnny');
	                                          assert.equal(users2.filter(function (x) {
	                                                return x[User.idAttribute] === userId1;
	                                          }).length, 1);
	                                          assert.equal(users2.filter(function (x) {
	                                                return x[User.idAttribute] === userId2;
	                                          }).length, 1);
	                                          assert.equal(users2.filter(function (x) {
	                                                return x.age === 20;
	                                          }).length, 1);
	                                          assert.equal(users2.filter(function (x) {
	                                                return x.age === 30;
	                                          }).length, 1);
	
	                                          assert.debug('findAll', { name: 'John' });
	                                          _context.next = 43;
	                                          return adapter.findAll(User, { name: 'John' });
	
	                                    case 43:
	                                          users3 = _context.sent;
	
	                                          assert.debug('found', JSON.stringify(users3, null, 2));
	                                          assert.equalObjects(users3, []);
	                                          assert.equal(users3.length, 0);
	
	                                          assert.debug('findAll', { name: 'Johnny' });
	                                          _context.next = 50;
	                                          return adapter.findAll(User, { name: 'Johnny' });
	
	                                    case 50:
	                                          users4 = _context.sent;
	
	                                          assert.debug('found', JSON.stringify(users4, null, 2));
	
	                                          users4.sort(function (a, b) {
	                                                return a.age - b.age;
	                                          });
	                                          assert.equal(users4[0].name, 'Johnny');
	                                          assert.equal(users4[0].name, 'Johnny');
	                                          assert.equal(users4.filter(function (x) {
	                                                return x[User.idAttribute] === userId1;
	                                          }).length, 1);
	                                          assert.equal(users4.filter(function (x) {
	                                                return x[User.idAttribute] === userId2;
	                                          }).length, 1);
	                                          assert.equal(users4.filter(function (x) {
	                                                return x.age === 20;
	                                          }).length, 1);
	                                          assert.equal(users4.filter(function (x) {
	                                                return x.age === 30;
	                                          }).length, 1);
	
	                                    case 59:
	                                    case 'end':
	                                          return _context.stop();
	                              }
	                        }
	                  }, _callee, this);
	            })));
	      });
	};

/***/ },
/* 9 */
/***/ function(module, exports) {

	'use strict';
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }
	
	/* global assert:true */
	module.exports = function (options) {
	  describe('Adapter#updateMany', function () {
	    it('should exist', function () {
	      assert.equal(_typeof(this.$$adapter.updateMany), 'function', 'adapter should have a "updateMany" method');
	    });
	    it('should update multiple users', _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
	      var adapter, User, user1, userId1, user2, userId2, users, users2, users3, users4;
	      return regeneratorRuntime.wrap(function _callee$(_context) {
	        while (1) {
	          switch (_context.prev = _context.next) {
	            case 0:
	              adapter = this.$$adapter;
	              User = this.$$User;
	              _context.next = 4;
	              return adapter.create(User, { name: 'John', age: 20 });
	
	            case 4:
	              user1 = _context.sent;
	              userId1 = user1.id;
	              _context.next = 8;
	              return adapter.create(User, { name: 'John', age: 30 });
	
	            case 8:
	              user2 = _context.sent;
	              userId2 = user2.id;
	              _context.next = 12;
	              return adapter.findAll(User, { name: 'John' });
	
	            case 12:
	              users = _context.sent;
	
	              users.sort(function (a, b) {
	                return a.age - b.age;
	              });
	              assert.equal(users[0].name, 'John');
	              assert.equal(users[0].name, 'John');
	              assert.equal(users.filter(function (x) {
	                return x.id === userId1;
	              }).length, 1);
	              assert.equal(users.filter(function (x) {
	                return x.id === userId2;
	              }).length, 1);
	              assert.equal(users.filter(function (x) {
	                return x.age === 20;
	              }).length, 1);
	              assert.equal(users.filter(function (x) {
	                return x.age === 30;
	              }).length, 1);
	
	              user1.age = 101;
	              user2.age = 202;
	              _context.next = 24;
	              return adapter.updateMany(User, [user1, user2]);
	
	            case 24:
	              users2 = _context.sent;
	
	              users2.sort(function (a, b) {
	                return a.age - b.age;
	              });
	              assert.equal(users2.filter(function (x) {
	                return x.id === userId1;
	              }).length, 1);
	              assert.equal(users2.filter(function (x) {
	                return x.id === userId2;
	              }).length, 1);
	              assert.equal(users2.filter(function (x) {
	                return x.age === 101;
	              }).length, 1);
	              assert.equal(users2.filter(function (x) {
	                return x.age === 202;
	              }).length, 1);
	
	              _context.next = 32;
	              return adapter.findAll(User, { age: 20 });
	
	            case 32:
	              users3 = _context.sent;
	
	              assert.objectsEqual(users3, []);
	              assert.equal(users3.length, 0);
	
	              _context.next = 37;
	              return adapter.findAll(User, { age: 101 });
	
	            case 37:
	              users4 = _context.sent;
	
	              users4.sort(function (a, b) {
	                return a.age - b.age;
	              });
	              assert.equal(users4.filter(function (x) {
	                return x.id === userId1;
	              }).length, 1);
	              assert.equal(users4.filter(function (x) {
	                return x.id === userId2;
	              }).length, 0);
	              assert.equal(users4.filter(function (x) {
	                return x.age === 101;
	              }).length, 1);
	              assert.equal(users4.filter(function (x) {
	                return x.age === 202;
	              }).length, 0);
	
	            case 43:
	            case 'end':
	              return _context.stop();
	          }
	        }
	      }, _callee, this);
	    })));
	  });
	};

/***/ }
/******/ ])
});
;
//# sourceMappingURL=js-data-adapter-tests.js.map
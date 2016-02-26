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
	  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	    args[_key] = arguments[_key];
	  }
	
	  if (debug) {
	    var _console;
	
	    args.forEach(function (arg, i) {
	      args[i] = JSON.stringify(arg, null, 2);
	    });
	    (_console = console).log.apply(_console, ['DEBUG (TEST):'].concat(args));
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
	            },
	            tag: {
	              localField: 'tags',
	              localKeys: 'tagIds'
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
	      var tagOptions = {
	        name: 'tag',
	        relations: {
	          hasMany: {
	            post: {
	              localField: 'posts',
	              foreignKeys: 'tagIds'
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
	      this.$$Tag = this.$$container.defineMapper('tag', options.tagConfig || options.JSData.utils.copy(tagOptions));
	      this.$$store.defineMapper('tag', options.tagConfig || options.JSData.utils.copy(tagOptions));
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
	              _context.next = 14;
	              return this.$$adapter.destroyAll(this.$$Tag);
	
	            case 14:
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
	      var adapter, User, props, user, userId, foundUser;
	      return regeneratorRuntime.wrap(function _callee$(_context) {
	        while (1) {
	          switch (_context.prev = _context.next) {
	            case 0:
	              adapter = this.$$adapter;
	              User = this.$$User;
	              props = { name: 'John' };
	
	
	              assert.debug('create', User.name, props);
	              _context.next = 6;
	              return adapter.create(User, props);
	
	            case 6:
	              user = _context.sent;
	              userId = user[User.idAttribute];
	
	              assert.debug('created', User.name, user);
	
	              assert.equal(user.name, props.name, 'user.name');
	              assert.isDefined(user[User.idAttribute], 'user[User.idAttribute]');
	
	              assert.debug('find', User.name, userId);
	              _context.next = 14;
	              return adapter.find(User, userId);
	
	            case 14:
	              foundUser = _context.sent;
	
	              assert.debug('found', User.name, foundUser);
	
	              assert.equal(foundUser.name, props.name, 'foundUser.name');
	              assert.isDefined(foundUser[User.idAttribute], 'foundUser[User.idAttribute]');
	              assert.equal(foundUser[User.idAttribute], userId, 'foundUser[User.idAttribute]');
	
	            case 19:
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
	
	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
	
	function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }
	
	/* global assert:true */
	module.exports = function (options) {
	  describe('Adapter#find', function () {
	    var adapter, User, Profile, Post, Comment, Tag;
	
	    beforeEach(function () {
	      adapter = this.$$adapter;
	      User = this.$$User;
	      Profile = this.$$Profile;
	      Post = this.$$Post;
	      Comment = this.$$Comment;
	      Tag = this.$$Tag;
	    });
	
	    it('should exist', function () {
	      assert.equal(_typeof(adapter.find), 'function', 'adapter should have a "find" method');
	    });
	
	    it('should find a user', _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
	      var props, user, userId, beforeFindCalled, afterFindCalled, foundUser, post, postId, comments, foundPost;
	      return regeneratorRuntime.wrap(function _callee$(_context) {
	        while (1) {
	          switch (_context.prev = _context.next) {
	            case 0:
	              props = { name: 'John' };
	
	              assert.debug('create', User.name, props);
	              _context.next = 4;
	              return adapter.create(User, props);
	
	            case 4:
	              user = _context.sent;
	
	              assert.debug('created', User.name, user);
	              userId = user[User.idAttribute];
	
	              assert.equal(user.name, 'John', 'user.name');
	              assert.isDefined(user[User.idAttribute], 'user[User.idAttribute]');
	
	              // Test beforeFind and afterFind
	              beforeFindCalled = false;
	              afterFindCalled = false;
	
	              adapter.beforeFind = function (mapper, id, opts) {
	                beforeFindCalled = true;
	                assert.isObject(mapper, 'beforeFind should have received mapper argument');
	                assert.isDefined(id, 'beforeFind should have received id argument');
	                assert.equal(id, userId, 'beforeFind should have received correct id argument');
	                assert.isObject(opts, 'beforeFind should have received opts argument');
	                // Optionally return a promise for async
	                return Promise.resolve();
	              };
	              adapter.afterFind = function (mapper, id, opts, record) {
	                afterFindCalled = true;
	                assert.isObject(mapper, 'afterFind should have received mapper argument');
	                assert.isDefined(id, 'afterFind should have received id argument');
	                assert.equal(id, userId, 'afterFind should have received correct id argument');
	                assert.isObject(opts, 'afterFind should have received opts argument');
	                assert.isObject(record, 'afterFind should have received record argument');
	                // Optionally return a promise for async
	                return Promise.resolve();
	              };
	
	              assert.debug('find', User.name, userId);
	              _context.next = 16;
	              return adapter.find(User, userId);
	
	            case 16:
	              foundUser = _context.sent;
	
	              assert.debug('found', User.name, foundUser);
	              assert.equal(foundUser.name, 'John', 'name of found user should be "John"');
	              assert.equal(foundUser[User.idAttribute], userId, 'found user should have correct id');
	              assert.isTrue(beforeFindCalled, 'beforeFind should have been called');
	              assert.isTrue(afterFindCalled, 'afterFind should have been called');
	
	              // should allow re-assignment
	              beforeFindCalled = false;
	              afterFindCalled = false;
	              adapter.afterFind = function (mapper, id, opts, record) {
	                afterFindCalled = true;
	                assert.isObject(mapper, 'afterFind should have received mapper argument');
	                assert.isDefined(id, 'afterFind should have received id argument');
	                assert.equal(id, userId, 'afterFind should have received correct id argument');
	                assert.isObject(opts, 'afterFind should have received opts argument');
	                assert.isObject(record, 'afterFind should have received record argument');
	                // Test re-assignment
	                return Promise.resolve(_defineProperty({ name: 'Sally' }, User.idAttribute, userId));
	              };
	
	              assert.debug('find', User.name, userId);
	              _context.next = 28;
	              return adapter.find(User, userId);
	
	            case 28:
	              foundUser = _context.sent;
	
	              assert.debug('found', User.name, foundUser);
	              assert.equal(foundUser.name, 'Sally', 'foundUser.name');
	              assert.equal(foundUser[User.idAttribute], userId, 'foundUser[User.idAttribute]');
	              assert.isTrue(beforeFindCalled, 'beforeFind should have been called');
	              assert.isTrue(afterFindCalled, 'afterFind should have been called');
	              // clear hooks
	              delete adapter.beforeFind;
	              delete adapter.afterFind;
	
	              props = { content: 'test', userId: userId };
	              assert.debug('create', Post.name, props);
	              _context.next = 40;
	              return adapter.create(Post, props);
	
	            case 40:
	              post = _context.sent;
	
	              assert.debug('created', Post.name, post);
	              postId = post[Post.idAttribute];
	
	
	              assert.equal(post.content, 'test', 'post.content');
	              assert.isDefined(post[Post.idAttribute], 'post[Post.idAttribute]');
	              assert.equal(post.userId, userId, 'post.userId');
	
	              props = [{
	                content: 'test2',
	                postId: postId,
	                userId: userId
	              }, {
	                content: 'test3',
	                postId: postId,
	                userId: userId
	              }];
	              assert.debug('create', Comment.name, props);
	              _context.next = 50;
	              return Promise.all([adapter.create(Comment, props[0]), adapter.create(Comment, props[1])]);
	
	            case 50:
	              comments = _context.sent;
	
	              assert.debug('created', Comment.name, comments);
	
	              comments.sort(function (a, b) {
	                return a.content > b.content;
	              });
	
	              assert.debug('find', Post.name, postId);
	              _context.next = 56;
	              return adapter.find(Post, postId, { with: ['user', 'comment'] });
	
	            case 56:
	              foundPost = _context.sent;
	
	              assert.debug('found', Post.name, foundPost);
	              foundPost.comments.sort(function (a, b) {
	                return a.content > b.content;
	              });
	              assert.equalObjects(foundPost.user, user, 'foundPost.user');
	              assert.equalObjects(foundPost.comments, comments, 'foundPost.comments');
	
	            case 61:
	            case 'end':
	              return _context.stop();
	          }
	        }
	      }, _callee, this);
	    })));
	
	    it('should return raw', _asyncToGenerator(regeneratorRuntime.mark(function _callee2() {
	      var props, user, userId, result;
	      return regeneratorRuntime.wrap(function _callee2$(_context2) {
	        while (1) {
	          switch (_context2.prev = _context2.next) {
	            case 0:
	              props = { name: 'John' };
	
	              assert.debug('create', User.name, props);
	              _context2.next = 4;
	              return adapter.create(User, props);
	
	            case 4:
	              user = _context2.sent;
	
	              assert.debug('created', User.name, user);
	              userId = user[User.idAttribute];
	
	              assert.equal(user.name, 'John', 'user.name');
	              assert.isDefined(user[User.idAttribute], 'user[User.idAttribute]');
	
	              assert.debug('find', User.name, userId);
	              _context2.next = 12;
	              return adapter.find(User, userId, { raw: true });
	
	            case 12:
	              result = _context2.sent;
	
	              assert.debug('found', User.name, result);
	              assert.isDefined(result.data, 'result.data');
	              assert.isDefined(result.found, 'result.found');
	              assert.equal(result.data.name, 'John', 'result.data.name');
	              assert.equal(result.data[User.idAttribute], userId, 'result.data.' + User.idAttribute);
	              assert.equal(result.found, 1, 'result.found');
	
	            case 19:
	            case 'end':
	              return _context2.stop();
	          }
	        }
	      }, _callee2, this);
	    })));
	
	    it('should return nothing', _asyncToGenerator(regeneratorRuntime.mark(function _callee3() {
	      var result;
	      return regeneratorRuntime.wrap(function _callee3$(_context3) {
	        while (1) {
	          switch (_context3.prev = _context3.next) {
	            case 0:
	              assert.debug('find', User.name, 'non-existent-id');
	              _context3.next = 3;
	              return adapter.find(User, 'non-existent-id');
	
	            case 3:
	              result = _context3.sent;
	
	              assert.debug('found', User.name, result);
	              assert.isUndefined(result, 'result');
	
	            case 6:
	            case 'end':
	              return _context3.stop();
	          }
	        }
	      }, _callee3, this);
	    })));
	
	    it('should return raw and nothing', _asyncToGenerator(regeneratorRuntime.mark(function _callee4() {
	      var result;
	      return regeneratorRuntime.wrap(function _callee4$(_context4) {
	        while (1) {
	          switch (_context4.prev = _context4.next) {
	            case 0:
	              assert.debug('find', User.name, 'non-existent-id');
	              _context4.next = 3;
	              return adapter.find(User, 'non-existent-id', { raw: true });
	
	            case 3:
	              result = _context4.sent;
	
	              assert.debug('found', User.name, result);
	              assert.isUndefined(result.data, 'result.data');
	              assert.isDefined(result.found, 'result.found');
	              assert.equal(result.found, 0, 'result.found');
	
	            case 8:
	            case 'end':
	              return _context4.stop();
	          }
	        }
	      }, _callee4, this);
	    })));
	
	    it('should load belongsTo relations', _asyncToGenerator(regeneratorRuntime.mark(function _callee5() {
	      var props, user, profile, post, comment;
	      return regeneratorRuntime.wrap(function _callee5$(_context5) {
	        while (1) {
	          switch (_context5.prev = _context5.next) {
	            case 0:
	              props = { name: 'John' };
	
	              assert.debug('create', User.name, props);
	              _context5.next = 4;
	              return adapter.create(User, props);
	
	            case 4:
	              user = _context5.sent;
	
	              assert.debug('created', User.name, user);
	
	              props = { email: 'foo@test.com', userId: user[User.idAttribute] };
	              assert.debug('create', Profile.name, props);
	              _context5.next = 10;
	              return adapter.create(Profile, props);
	
	            case 10:
	              profile = _context5.sent;
	
	              assert.debug('created', Profile.name, profile);
	
	              props = { content: 'foo', userId: user[User.idAttribute] };
	              assert.debug('create', Post.name, props);
	              _context5.next = 16;
	              return adapter.create(Post, props);
	
	            case 16:
	              post = _context5.sent;
	
	              assert.debug('created', Post.name, post);
	
	              props = { content: 'test2', postId: post[Post.idAttribute], userId: post.userId };
	              assert.debug('create', Comment.name, props);
	              _context5.next = 22;
	              return adapter.create(Comment, props);
	
	            case 22:
	              comment = _context5.sent;
	
	              assert.debug('created', Comment.name, comment);
	
	              assert.debug('find', Comment.name, comment[Comment.idAttribute]);
	              _context5.next = 27;
	              return adapter.find(Comment, comment[Comment.idAttribute], { 'with': ['user', 'user.profile', 'post', 'post.user'] });
	
	            case 27:
	              comment = _context5.sent;
	
	              assert.debug('found', Comment.name, comment);
	
	              assert.isDefined(comment, 'comment');
	              assert.isDefined(comment.post, 'comment.post');
	              assert.isDefined(comment.post.user, 'comment.post.user');
	              assert.isDefined(comment.user, 'comment.user');
	              assert.isDefined(comment.user.profile, 'comment.user.profile');
	
	            case 34:
	            case 'end':
	              return _context5.stop();
	          }
	        }
	      }, _callee5, this);
	    })));
	
	    it('should load hasMany and belongsTo relations', _asyncToGenerator(regeneratorRuntime.mark(function _callee6() {
	      var props, user, profile, post, postId, comment;
	      return regeneratorRuntime.wrap(function _callee6$(_context6) {
	        while (1) {
	          switch (_context6.prev = _context6.next) {
	            case 0:
	              props = { name: 'John' };
	
	              assert.debug('create', User.name, props);
	              _context6.next = 4;
	              return adapter.create(User, props);
	
	            case 4:
	              user = _context6.sent;
	
	              assert.debug('created', User.name, user);
	
	              props = { email: 'foo@test.com', userId: user[User.idAttribute] };
	              assert.debug('create', Profile.name, props);
	              _context6.next = 10;
	              return adapter.create(Profile, props);
	
	            case 10:
	              profile = _context6.sent;
	
	              assert.debug('created', Profile.name, profile);
	
	              props = { content: 'foo', userId: user[User.idAttribute] };
	              assert.debug('create', Post.name, props);
	              _context6.next = 16;
	              return adapter.create(Post, props);
	
	            case 16:
	              post = _context6.sent;
	              postId = post[Post.idAttribute];
	
	              assert.debug('created', Post.name, post);
	
	              props = { content: 'test2', postId: postId, userId: post.userId };
	              assert.debug('create', Comment.name, props);
	              _context6.next = 23;
	              return adapter.create(Comment, props);
	
	            case 23:
	              comment = _context6.sent;
	
	              assert.debug('created', Comment.name, comment);
	
	              assert.debug('find', Post.name, postId);
	              _context6.next = 28;
	              return adapter.find(Post, postId, { 'with': ['user', 'comment', 'comment.user', 'comment.user.profile'] });
	
	            case 28:
	              post = _context6.sent;
	
	              assert.debug('found', Post.name, post);
	
	              assert.isDefined(post.comments, 'post.comments');
	              assert.isDefined(post.comments[0].user, 'post.comments[0].user');
	              assert.isDefined(post.comments[0].user.profile, 'post.comments[0].user.profile');
	              assert.isDefined(post.user, 'post.user');
	
	            case 34:
	            case 'end':
	              return _context6.stop();
	          }
	        }
	      }, _callee6, this);
	    })));
	
	    if (options.features === 'all' || options.features.indexOf('findHasManyLocalKeys') !== -1) {
	      var _tagIds;
	
	      it('should load hasMany localKeys (array) relations', _asyncToGenerator(regeneratorRuntime.mark(function _callee7() {
	        var props, tag, tag2, post, postId;
	        return regeneratorRuntime.wrap(function _callee7$(_context7) {
	          while (1) {
	            switch (_context7.prev = _context7.next) {
	              case 0:
	                props = { value: 'big data' };
	
	                assert.debug('create', Tag.name, props);
	                _context7.next = 4;
	                return adapter.create(Tag, props);
	
	              case 4:
	                tag = _context7.sent;
	
	                assert.debug('created', Tag.name, tag);
	
	                props = { value: 'servers' };
	                assert.debug('create', Tag.name, props);
	                _context7.next = 10;
	                return adapter.create(Tag, props);
	
	              case 10:
	                tag2 = _context7.sent;
	
	                assert.debug('created', Tag.name, tag2);
	
	                props = { content: 'test', tagIds: [tag[Tag.idAttribute], tag2[Tag.idAttribute]] };
	                assert.debug('create', Post.name, props);
	                _context7.next = 16;
	                return adapter.create(Post, props);
	
	              case 16:
	                post = _context7.sent;
	                postId = post[Post.idAttribute];
	
	                assert.debug('created', Post.name, post);
	
	                assert.debug('find', Post.name, postId);
	                _context7.next = 22;
	                return adapter.find(Post, postId, { 'with': ['tag'] });
	
	              case 22:
	                post = _context7.sent;
	
	                assert.debug('found', Post.name, post);
	
	                assert.isDefined(post.tags, 'post.tags');
	                assert.equal(post.content, 'test', 'post.content');
	                assert.isDefined(post.tags[0][Tag.idAttribute], 'post.tags[0][Tag.idAttribute]');
	                assert.isDefined(post.tags[1][Tag.idAttribute], 'post.tags[1][Tag.idAttribute]');
	
	              case 28:
	              case 'end':
	                return _context7.stop();
	            }
	          }
	        }, _callee7, this);
	      })));
	      it('should load hasMany localKeys (empty array) relations', _asyncToGenerator(regeneratorRuntime.mark(function _callee8() {
	        var props, post, postId;
	        return regeneratorRuntime.wrap(function _callee8$(_context8) {
	          while (1) {
	            switch (_context8.prev = _context8.next) {
	              case 0:
	                props = { content: 'test' };
	
	                assert.debug('create', Post.name, props);
	                _context8.next = 4;
	                return adapter.create(Post, props);
	
	              case 4:
	                post = _context8.sent;
	                postId = post[Post.idAttribute];
	
	                assert.debug('created', Post.name, post);
	
	                assert.debug('find', Post.name, postId);
	                _context8.next = 10;
	                return adapter.find(Post, postId, { 'with': ['tag'] });
	
	              case 10:
	                post = _context8.sent;
	
	                assert.debug('found', Post.name, post);
	
	                assert.isDefined(post.tags, 'post.tags');
	                assert.equal(post.content, 'test', 'post.content');
	                assert.deepEqual(post.tags, [], 'post.tags');
	
	              case 15:
	              case 'end':
	                return _context8.stop();
	            }
	          }
	        }, _callee8, this);
	      })));
	      it('should load hasMany localKeys (object) relations', _asyncToGenerator(regeneratorRuntime.mark(function _callee9() {
	        var props, tag, tag2, post, postId;
	        return regeneratorRuntime.wrap(function _callee9$(_context9) {
	          while (1) {
	            switch (_context9.prev = _context9.next) {
	              case 0:
	                props = { value: 'big data' };
	
	                assert.debug('create', Tag.name, props);
	                _context9.next = 4;
	                return adapter.create(Tag, props);
	
	              case 4:
	                tag = _context9.sent;
	
	                assert.debug('created', Tag.name, tag);
	
	                props = { value: 'servers' };
	                assert.debug('create', Tag.name, props);
	                _context9.next = 10;
	                return adapter.create(Tag, props);
	
	              case 10:
	                tag2 = _context9.sent;
	
	                assert.debug('created', Tag.name, tag2);
	
	                props = { content: 'test', tagIds: (_tagIds = {}, _defineProperty(_tagIds, tag[Tag.idAttribute], true), _defineProperty(_tagIds, tag2[Tag.idAttribute], true), _tagIds) };
	                assert.debug('create', Post.name, props);
	                _context9.next = 16;
	                return adapter.create(Post, props);
	
	              case 16:
	                post = _context9.sent;
	                postId = post[Post.idAttribute];
	
	                assert.debug('created', Post.name, post);
	
	                assert.debug('find', Post.name, postId);
	                _context9.next = 22;
	                return adapter.find(Post, postId, { 'with': ['tag'] });
	
	              case 22:
	                post = _context9.sent;
	
	                assert.debug('found', Post.name);
	
	                assert.isDefined(post.tags, 'post.tags');
	                assert.equal(post.content, 'test', 'post.content');
	                assert.isDefined(post.tags[0][Tag.idAttribute], 'post.tags[0][Tag.idAttribute]');
	                assert.isDefined(post.tags[1][Tag.idAttribute], 'post.tags[1][Tag.idAttribute]');
	
	              case 28:
	              case 'end':
	                return _context9.stop();
	            }
	          }
	        }, _callee9, this);
	      })));
	    }
	
	    if (options.features === 'all' || options.features.indexOf('findHasManyForeignKeys') !== -1) {
	      it('should load hasMany foreignKeys (array) relations', _asyncToGenerator(regeneratorRuntime.mark(function _callee10() {
	        var props, tag, tagId, tag2, tag2Id, post, post2;
	        return regeneratorRuntime.wrap(function _callee10$(_context10) {
	          while (1) {
	            switch (_context10.prev = _context10.next) {
	              case 0:
	                props = { value: 'big data' };
	
	                assert.debug('create', Tag.name, props);
	                _context10.next = 4;
	                return adapter.create(Tag, props);
	
	              case 4:
	                tag = _context10.sent;
	                tagId = tag[Tag.idAttribute];
	
	                assert.debug('created', Tag.name, tag);
	
	                props = { value: 'servers' };
	                assert.debug('create', Tag.name, props);
	                _context10.next = 11;
	                return adapter.create(Tag, props);
	
	              case 11:
	                tag2 = _context10.sent;
	                tag2Id = tag2[Tag.idAttribute];
	
	                assert.debug('created', Tag.name, tag2);
	
	                props = { content: 'test', tagIds: [tagId] };
	                assert.debug('create', Post.name, props);
	                _context10.next = 18;
	                return adapter.create(Post, props);
	
	              case 18:
	                post = _context10.sent;
	
	                assert.debug('created', Post.name, post);
	
	                props = { content: 'test2', tagIds: [tagId, tag2Id] };
	                assert.debug('create', Post.name, props);
	                _context10.next = 24;
	                return adapter.create(Post, props);
	
	              case 24:
	                post2 = _context10.sent;
	
	                assert.debug('created', Post.name, post2);
	
	                assert.debug('find', Tag.name, tagId);
	                _context10.next = 29;
	                return adapter.find(Tag, tagId, { 'with': ['post'] });
	
	              case 29:
	                tag = _context10.sent;
	
	                assert.debug('found', Tag.name, tag);
	
	                assert.isDefined(tag.posts, 'tag.posts');
	                assert.equal(tag.value, 'big data', 'tag.value');
	                assert.equal(tag.posts.length, 2, 'tag.posts.length');
	
	                assert.debug('find', Tag.name, tag2Id);
	                _context10.next = 37;
	                return adapter.find(Tag, tag2Id, { 'with': ['post'] });
	
	              case 37:
	                tag2 = _context10.sent;
	
	                assert.debug('found', Tag.name, tag2);
	
	                assert.isDefined(tag2.posts, 'tag2.posts');
	                assert.equal(tag2.value, 'servers', 'tag2.value');
	                assert.equal(tag2.posts.length, 1, 'tag2.posts.length');
	                assert.objectsEqual(tag2.posts, [post2], 'tag2.posts');
	
	              case 43:
	              case 'end':
	                return _context10.stop();
	            }
	          }
	        }, _callee10, this);
	      })));
	    }
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
	
	              assert.debug('findAll', User.name, { age: 30 });
	              _context.next = 4;
	              return adapter.findAll(User, { age: 30 });
	
	            case 4:
	              users = _context.sent;
	
	              assert.debug('found', User.name, users);
	              assert.equal(users.length, 0, 'users.length');
	
	              assert.debug('create', User.name, props);
	              _context.next = 10;
	              return adapter.create(User, props);
	
	            case 10:
	              user = _context.sent;
	
	              assert.debug('created', User.name, user);
	              userId = user[User.idAttribute];
	
	
	              assert.debug('findAll', User.name, { name: 'John' });
	              _context.next = 16;
	              return adapter.findAll(User, { name: 'John' });
	
	            case 16:
	              users2 = _context.sent;
	
	              assert.debug('found', User.name, users2);
	
	              assert.equal(users2.length, 1, 'users2.length');
	              assert.equal(users2[0][User.idAttribute], userId, 'users2[0][User.idAttribute]');
	              assert.equal(users2[0].name, 'John', users2[0].name);
	
	            case 21:
	            case 'end':
	              return _context.stop();
	          }
	        }
	      }, _callee, this);
	    })));
	
	    if (options.features === 'all' || options.features.indexOf('inOp') !== -1) {
	      it('should filter users using the "in" operator', _asyncToGenerator(regeneratorRuntime.mark(function _callee2() {
	        var users, user, id, users2;
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
	
	                assert.equal(users.length, 0, 'users.length');
	
	                _context2.next = 6;
	                return adapter.create(User, { name: 'John' });
	
	              case 6:
	                user = _context2.sent;
	                id = user[User.idAttribute];
	                _context2.next = 10;
	                return adapter.findAll(User, { name: 'John' });
	
	              case 10:
	                users2 = _context2.sent;
	
	                assert.equal(users2.length, 1, 'users2.length');
	                assert.equal(users2[0][User.idAttribute], id, 'users2[0][User.idAttribute]');
	                assert.equal(users2[0].name, 'John', 'users2[0].name');
	
	              case 14:
	              case 'end':
	                return _context2.stop();
	            }
	          }
	        }, _callee2, this);
	      })));
	    }
	
	    if (options.features === 'all' || options.features.indexOf('likeOp') !== -1) {
	      it('should filter users using the "like" operator', _asyncToGenerator(regeneratorRuntime.mark(function _callee3() {
	        var users, user, id, users2;
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
	
	              case 14:
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
	
	              assert.debug('create', User.name, props);
	              _context5.next = 4;
	              return adapter.create(User, props);
	
	            case 4:
	              user = _context5.sent;
	
	              assert.debug('created', User.name, user);
	
	              props = { email: 'foo@test.com', userId: user[User.idAttribute] };
	              assert.debug('create', Profile.name, props);
	              _context5.next = 10;
	              return adapter.create(Profile, props);
	
	            case 10:
	              profile = _context5.sent;
	
	              assert.debug('created', Profile.name, profile);
	
	              props = { content: 'foo', userId: user[User.idAttribute] };
	              assert.debug('create', Post.name, props);
	              _context5.next = 16;
	              return adapter.create(Post, props);
	
	            case 16:
	              post = _context5.sent;
	
	              assert.debug('created', Post.name, post);
	
	              props = { content: 'test2', postId: post[Post.idAttribute], userId: post.userId };
	              assert.debug('create', Comment.name, props);
	              _context5.next = 22;
	              return adapter.create(Comment, props);
	
	            case 22:
	              comment = _context5.sent;
	
	              assert.debug('created', Comment.name, comment);
	
	              props = { name: 'Sally' };
	              assert.debug('create', User.name, props);
	              _context5.next = 28;
	              return adapter.create(User, props);
	
	            case 28:
	              user2 = _context5.sent;
	
	              assert.debug('created', User.name, user2);
	
	              props = { content: 'bar', userId: user2[User.idAttribute] };
	              assert.debug('create', Post.name, props);
	              _context5.next = 34;
	              return adapter.create(Post, props);
	
	            case 34:
	              post2 = _context5.sent;
	
	              assert.debug('created', Post.name, post2);
	
	              props = { content: 'test67', postId: post2[Post.idAttribute], userId: post2.userId };
	              assert.debug('create', Comment.name, props);
	              _context5.next = 40;
	              return adapter.create(Comment, props);
	
	            case 40:
	              comment2 = _context5.sent;
	
	              assert.debug('created', Comment.name, comment2);
	
	              assert.debug('findAll', Comment.name, {});
	              _context5.next = 45;
	              return adapter.findAll(Comment, {}, { 'with': ['user', 'user.profile', 'post', 'post.user'] });
	
	            case 45:
	              comments = _context5.sent;
	
	              assert.debug('found', Comment.name, comments);
	
	              assert.isDefined(comments[0].post, 'comments[0].post');
	              assert.isDefined(comments[0].post.user, 'comments[0].post.user');
	              assert.isDefined(comments[0].user, 'comments[0].user');
	              assert.isDefined(comments[0].user.profile || comments[1].user.profile, 'comments[0].user.profile || comments[1].user.profile');
	              assert.isDefined(comments[1].post, 'comments[1].post');
	              assert.isDefined(comments[1].post.user, 'comments[1].post.user');
	              assert.isDefined(comments[1].user, 'comments[1].user');
	
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
	
	              assert.debug('create', User.name, props);
	              _context6.next = 4;
	              return adapter.create(User, props);
	
	            case 4:
	              user = _context6.sent;
	
	              assert.debug('created', User.name, user);
	
	              props = { email: 'foo@test.com', userId: user[User.idAttribute] };
	              assert.debug('create', Profile.name, props);
	              _context6.next = 10;
	              return adapter.create(Profile, props);
	
	            case 10:
	              profile = _context6.sent;
	
	              assert.debug('created', Profile.name, profile);
	
	              props = { content: 'foo', userId: user[User.idAttribute] };
	              assert.debug('create', Post.name, props);
	              _context6.next = 16;
	              return adapter.create(Post, props);
	
	            case 16:
	              post = _context6.sent;
	
	              assert.debug('created', Post.name, post);
	
	              props = { content: 'test2', postId: post[Post.idAttribute], userId: post.userId };
	              assert.debug('create', Comment.name, props);
	              _context6.next = 22;
	              return adapter.create(Comment, props);
	
	            case 22:
	              comment = _context6.sent;
	
	              assert.debug('created', Comment.name, comment);
	
	              props = { name: 'Sally' };
	              assert.debug('create', User.name, props);
	              _context6.next = 28;
	              return adapter.create(User, props);
	
	            case 28:
	              user2 = _context6.sent;
	
	              assert.debug('created', User.name, user2);
	
	              props = { content: 'bar', userId: user2[User.idAttribute] };
	              assert.debug('create', Post.name, props);
	              _context6.next = 34;
	              return adapter.create(Post, props);
	
	            case 34:
	              post2 = _context6.sent;
	
	              assert.debug('created', Post.name, post2);
	
	              props = { content: 'test67', postId: post2[Post.idAttribute], userId: post2.userId };
	              assert.debug('create', Comment.name, props);
	              _context6.next = 40;
	              return adapter.create(Comment, props);
	
	            case 40:
	              comment2 = _context6.sent;
	
	              assert.debug('created', Comment.name, comment2);
	
	              assert.debug('find', Post.name, {});
	              _context6.next = 45;
	              return adapter.findAll(Post, {}, { 'with': ['user', 'comment', 'comment.user', 'comment.user.profile'] });
	
	            case 45:
	              posts = _context6.sent;
	
	              assert.debug('found', Post.name, posts);
	
	              assert.isDefined(posts[0].comments, 'posts[0].comments');
	              assert.isDefined(posts[0].comments[0].user, 'posts[0].comments[0].user');
	              assert.isDefined(posts[0].comments[0].user.profile || posts[1].comments[0].user.profile, 'posts[0].comments[0].user.profile || posts[1].comments[0].user.profile');
	              assert.isDefined(posts[0].user, 'posts[0].user');
	              assert.isDefined(posts[1].comments, 'posts[1].comments');
	              assert.isDefined(posts[1].comments[0].user, 'posts[1].comments[0].user');
	              assert.isDefined(posts[1].user, 'posts[1].user');
	
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
	      var adapter, User, props, user, userId, beforeDestroyCalled, afterDestroyCalled, destroyedUser;
	      return regeneratorRuntime.wrap(function _callee$(_context) {
	        while (1) {
	          switch (_context.prev = _context.next) {
	            case 0:
	              adapter = this.$$adapter;
	              User = this.$$User;
	              props = { name: 'John' };
	
	
	              assert.debug('create', User.name, props);
	              _context.next = 6;
	              return adapter.create(User, props);
	
	            case 6:
	              user = _context.sent;
	              userId = user[User.idAttribute];
	
	              assert.debug('created', User.name, user);
	
	              beforeDestroyCalled = false;
	              afterDestroyCalled = false;
	
	              // Test beforeDestroy and afterDestroy
	
	              adapter.beforeDestroy = function (mapper, id, opts) {
	                beforeDestroyCalled = true;
	                assert.isObject(mapper, 'beforeDestroy should have received mapper argument');
	                assert.isDefined(id, 'beforeDestroy should have received id argument');
	                assert.isObject(opts, 'beforeDestroy should have received opts argument');
	                // Test re-assignment
	                return Promise.resolve();
	              };
	              adapter.afterDestroy = function (mapper, id, opts) {
	                afterDestroyCalled = true;
	                assert.isObject(mapper, 'afterDestroy should have received mapper argument');
	                assert.isDefined(id, 'afterDestroy should have received id argument');
	                assert.isObject(opts, 'afterDestroy should have received opts argument');
	                // Test re-assignment
	                return Promise.resolve();
	              };
	
	              assert.debug('destroy', User.name, userId);
	              _context.next = 16;
	              return adapter.destroy(User, userId);
	
	            case 16:
	              destroyedUser = _context.sent;
	
	              assert.debug('destroyed', User.name, destroyedUser);
	              assert.isUndefined(destroyedUser, 'destroyedUser');
	              assert.isTrue(beforeDestroyCalled, 'beforeDestroy should have been called');
	              assert.isTrue(afterDestroyCalled, 'afterDestroy should have been called');
	
	            case 21:
	            case 'end':
	              return _context.stop();
	          }
	        }
	      }, _callee, this);
	    })));
	    it('should destroy a user and allow afterDestroy re-assignment', _asyncToGenerator(regeneratorRuntime.mark(function _callee2() {
	      var adapter, User, props, user, userId, beforeDestroyCalled, afterDestroyCalled, destroyedUser;
	      return regeneratorRuntime.wrap(function _callee2$(_context2) {
	        while (1) {
	          switch (_context2.prev = _context2.next) {
	            case 0:
	              adapter = this.$$adapter;
	              User = this.$$User;
	              props = { name: 'John' };
	
	
	              assert.debug('create', User.name, props);
	              _context2.next = 6;
	              return adapter.create(User, props);
	
	            case 6:
	              user = _context2.sent;
	              userId = user[User.idAttribute];
	
	              assert.debug('created', User.name, user);
	
	              beforeDestroyCalled = false;
	              afterDestroyCalled = false;
	
	              // Test beforeDestroy and afterDestroy
	
	              adapter.beforeDestroy = function (mapper, id, opts) {
	                beforeDestroyCalled = true;
	                assert.isObject(mapper, 'beforeDestroy should have received mapper argument');
	                assert.isDefined(id, 'beforeDestroy should have received id argument');
	                assert.isObject(opts, 'beforeDestroy should have received opts argument');
	                // Test re-assignment
	                return Promise.resolve();
	              };
	              adapter.afterDestroy = function (mapper, id, opts) {
	                afterDestroyCalled = true;
	                assert.isObject(mapper, 'afterDestroy should have received mapper argument');
	                assert.isDefined(id, 'afterDestroy should have received id argument');
	                assert.isObject(opts, 'afterDestroy should have received opts argument');
	                // Test re-assignment
	                return Promise.resolve(1234);
	              };
	
	              assert.debug('destroy', User.name, userId);
	              _context2.next = 16;
	              return adapter.destroy(User, userId);
	
	            case 16:
	              destroyedUser = _context2.sent;
	
	              assert.debug('destroyed', User.name, destroyedUser);
	              assert.equal(destroyedUser, 1234, 'destroyedUser');
	              assert.isTrue(beforeDestroyCalled, 'beforeDestroy should have been called');
	              assert.isTrue(afterDestroyCalled, 'afterDestroy should have been called');
	
	            case 21:
	            case 'end':
	              return _context2.stop();
	          }
	        }
	      }, _callee2, this);
	    })));
	    it('should destroy a user and return raw', _asyncToGenerator(regeneratorRuntime.mark(function _callee3() {
	      var adapter, User, props, user, userId, result;
	      return regeneratorRuntime.wrap(function _callee3$(_context3) {
	        while (1) {
	          switch (_context3.prev = _context3.next) {
	            case 0:
	              adapter = this.$$adapter;
	              User = this.$$User;
	              props = { name: 'John' };
	
	
	              assert.debug('create', User.name, props);
	              _context3.next = 6;
	              return adapter.create(User, props);
	
	            case 6:
	              user = _context3.sent;
	              userId = user[User.idAttribute];
	
	              assert.debug('created', User.name, user);
	
	              assert.debug('destroy', User.name, userId);
	              _context3.next = 12;
	              return adapter.destroy(User, userId, { raw: true });
	
	            case 12:
	              result = _context3.sent;
	
	              assert.debug('destroyed', User.name, result);
	              assert.isUndefined(result.data, 'result.data');
	              assert.isDefined(result.deleted, 'result.deleted');
	              assert.equal(result.deleted, 1, 'result.deleted');
	
	            case 17:
	            case 'end':
	              return _context3.stop();
	          }
	        }
	      }, _callee3, this);
	    })));
	    it('should destroy nothing', _asyncToGenerator(regeneratorRuntime.mark(function _callee4() {
	      var adapter, User, result;
	      return regeneratorRuntime.wrap(function _callee4$(_context4) {
	        while (1) {
	          switch (_context4.prev = _context4.next) {
	            case 0:
	              adapter = this.$$adapter;
	              User = this.$$User;
	
	
	              assert.debug('destroy', User.name, 'non-existent-id');
	              _context4.next = 5;
	              return adapter.destroy(User, 'non-existent-id');
	
	            case 5:
	              result = _context4.sent;
	
	              assert.debug('destroyed', User.name, result);
	              assert.isUndefined(result, 'result');
	
	            case 8:
	            case 'end':
	              return _context4.stop();
	          }
	        }
	      }, _callee4, this);
	    })));
	    it('should destroy nothing and return raw', _asyncToGenerator(regeneratorRuntime.mark(function _callee5() {
	      var adapter, User, result;
	      return regeneratorRuntime.wrap(function _callee5$(_context5) {
	        while (1) {
	          switch (_context5.prev = _context5.next) {
	            case 0:
	              adapter = this.$$adapter;
	              User = this.$$User;
	
	
	              assert.debug('destroy', User.name, 'non-existent-id');
	              _context5.next = 5;
	              return adapter.destroy(User, 'non-existent-id', { raw: true });
	
	            case 5:
	              result = _context5.sent;
	
	              assert.debug('destroyed', User.name, result);
	              assert.isUndefined(result.data, 'result.data');
	              assert.isDefined(result.deleted, 'result.deleted');
	              assert.equal(result.deleted, 0, 'result.deleted');
	
	            case 10:
	            case 'end':
	              return _context5.stop();
	          }
	        }
	      }, _callee5, this);
	    })));
	    it('should destroy a user and return deleted id', _asyncToGenerator(regeneratorRuntime.mark(function _callee6() {
	      var adapter, User, props, user, userId, destroyedUser;
	      return regeneratorRuntime.wrap(function _callee6$(_context6) {
	        while (1) {
	          switch (_context6.prev = _context6.next) {
	            case 0:
	              adapter = this.$$adapter;
	              User = this.$$User;
	              props = { name: 'John' };
	
	
	              assert.debug('create', User.name, props);
	              _context6.next = 6;
	              return adapter.create(User, props);
	
	            case 6:
	              user = _context6.sent;
	              userId = user[User.idAttribute];
	
	              assert.debug('created', User.name, user);
	
	              assert.debug('destroy', User.name, userId);
	              _context6.next = 12;
	              return adapter.destroy(User, userId, { returnDeletedIds: true });
	
	            case 12:
	              destroyedUser = _context6.sent;
	
	              assert.debug('destroyed', User.name, destroyedUser);
	              assert.equal(destroyedUser, userId, 'destroyedUser');
	
	            case 15:
	            case 'end':
	              return _context6.stop();
	          }
	        }
	      }, _callee6, this);
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
	      var adapter, User, props, user, userId, user2, foundUsers, destroyedUsers;
	      return regeneratorRuntime.wrap(function _callee$(_context) {
	        while (1) {
	          switch (_context.prev = _context.next) {
	            case 0:
	              adapter = this.$$adapter;
	              User = this.$$User;
	              props = { name: 'John' };
	
	
	              assert.debug('create', User.name, props);
	              _context.next = 6;
	              return adapter.create(User, props);
	
	            case 6:
	              user = _context.sent;
	              userId = user[User.idAttribute];
	
	              assert.debug('created', User.name, user);
	
	              assert.debug('create', User.name, { name: 'Sally' });
	              _context.next = 12;
	              return adapter.create(User, { name: 'Sally' });
	
	            case 12:
	              user2 = _context.sent;
	
	              assert.debug('created', User.name, user2);
	
	              assert.debug('findAll', User.name, props);
	              _context.next = 17;
	              return adapter.findAll(User, props);
	
	            case 17:
	              foundUsers = _context.sent;
	
	              assert.debug('found', User.name, foundUsers);
	              assert.equal(foundUsers.length, 1, 'foundUsers.length');
	              assert.equal(foundUsers[0][User.idAttribute], userId, 'foundUsers[0][User.idAttribute]');
	              assert.equal(foundUsers[0].name, 'John', 'foundUsers[0].name');
	
	              assert.debug('destroyAll', User.name, props);
	              _context.next = 25;
	              return adapter.destroyAll(User, props);
	
	            case 25:
	              destroyedUsers = _context.sent;
	
	              assert.debug('destroyed', User.name, destroyedUsers);
	              assert.isUndefined(destroyedUsers, 'destroyedUsers');
	
	              assert.debug('findAll', User.name, props);
	              _context.next = 31;
	              return adapter.findAll(User, props);
	
	            case 31:
	              foundUsers = _context.sent;
	
	              assert.debug('found', User.name, foundUsers);
	              assert.equal(foundUsers.length, 0);
	
	              assert.debug('findAll', User.name, {});
	              _context.next = 37;
	              return adapter.findAll(User, {});
	
	            case 37:
	              foundUsers = _context.sent;
	
	              assert.debug('found', User.name, foundUsers);
	              assert.equal(foundUsers.length, 1);
	
	            case 40:
	            case 'end':
	              return _context.stop();
	          }
	        }
	      }, _callee, this);
	    })));
	    it('should destroy users and return raw', _asyncToGenerator(regeneratorRuntime.mark(function _callee2() {
	      var adapter, User, props, user, result;
	      return regeneratorRuntime.wrap(function _callee2$(_context2) {
	        while (1) {
	          switch (_context2.prev = _context2.next) {
	            case 0:
	              adapter = this.$$adapter;
	              User = this.$$User;
	              props = { name: 'John' };
	
	
	              assert.debug('create', User.name, props);
	              _context2.next = 6;
	              return adapter.create(User, props);
	
	            case 6:
	              user = _context2.sent;
	
	              assert.debug('created', User.name, user);
	
	              assert.debug('destroyAll', User.name, props);
	              _context2.next = 11;
	              return adapter.destroyAll(User, props, { raw: true });
	
	            case 11:
	              result = _context2.sent;
	
	              assert.debug('destroyed', User.name, result);
	              assert.isUndefined(result.data, 'result.data');
	              assert.isDefined(result.deleted, 'result.deleted');
	              assert.equal(result.deleted, 1, 'result.deleted');
	
	            case 16:
	            case 'end':
	              return _context2.stop();
	          }
	        }
	      }, _callee2, this);
	    })));
	    it('should destroy nothing', _asyncToGenerator(regeneratorRuntime.mark(function _callee3() {
	      var adapter, User, result;
	      return regeneratorRuntime.wrap(function _callee3$(_context3) {
	        while (1) {
	          switch (_context3.prev = _context3.next) {
	            case 0:
	              adapter = this.$$adapter;
	              User = this.$$User;
	
	
	              assert.debug('destroyAll', User.name, {});
	              _context3.next = 5;
	              return adapter.destroyAll(User, {});
	
	            case 5:
	              result = _context3.sent;
	
	              assert.debug('destroyed', User.name, result);
	              assert.isUndefined(result, 'result');
	
	            case 8:
	            case 'end':
	              return _context3.stop();
	          }
	        }
	      }, _callee3, this);
	    })));
	    it('should destroy nothing and return raw', _asyncToGenerator(regeneratorRuntime.mark(function _callee4() {
	      var adapter, User, result;
	      return regeneratorRuntime.wrap(function _callee4$(_context4) {
	        while (1) {
	          switch (_context4.prev = _context4.next) {
	            case 0:
	              adapter = this.$$adapter;
	              User = this.$$User;
	
	
	              assert.debug('destroyAll', User.name, {});
	              _context4.next = 5;
	              return adapter.destroyAll(User, {}, { raw: true });
	
	            case 5:
	              result = _context4.sent;
	
	              assert.debug('destroyed', User.name, result);
	              assert.isUndefined(result.data, 'result.data');
	              assert.isDefined(result.deleted, 'result.deleted');
	              assert.equal(result.deleted, 0, 'result.deleted');
	
	            case 10:
	            case 'end':
	              return _context4.stop();
	          }
	        }
	      }, _callee4, this);
	    })));
	    it('should optionally return ids', _asyncToGenerator(regeneratorRuntime.mark(function _callee5() {
	      var adapter, User, props, user, userId, user2, foundUsers, destroyedUsers;
	      return regeneratorRuntime.wrap(function _callee5$(_context5) {
	        while (1) {
	          switch (_context5.prev = _context5.next) {
	            case 0:
	              adapter = this.$$adapter;
	              User = this.$$User;
	              props = { name: 'John' };
	
	
	              assert.debug('create', User.name, props);
	              _context5.next = 6;
	              return adapter.create(User, props);
	
	            case 6:
	              user = _context5.sent;
	              userId = user[User.idAttribute];
	
	              assert.debug('created', User.name, user);
	
	              assert.debug('create', User.name, { name: 'Sally' });
	              _context5.next = 12;
	              return adapter.create(User, { name: 'Sally' });
	
	            case 12:
	              user2 = _context5.sent;
	
	              assert.debug('created', User.name, user2);
	
	              assert.debug('findAll', User.name, props);
	              _context5.next = 17;
	              return adapter.findAll(User, props);
	
	            case 17:
	              foundUsers = _context5.sent;
	
	              assert.debug('found', User.name, foundUsers);
	              assert.equal(foundUsers.length, 1, 'foundUsers.length');
	              assert.equal(foundUsers[0][User.idAttribute], userId, 'foundUsers[0][User.idAttribute]');
	              assert.equal(foundUsers[0].name, 'John', 'foundUsers[0].name');
	
	              assert.debug('destroyAll', User.name, props);
	              _context5.next = 25;
	              return adapter.destroyAll(User, props, { returnDeletedIds: true });
	
	            case 25:
	              destroyedUsers = _context5.sent;
	
	              assert.debug('destroyed', User.name, destroyedUsers);
	              assert.equal(destroyedUsers.length, 1, 'destroyedUsers.length');
	              assert.deepEqual(destroyedUsers, [userId], 'destroyedUsers');
	
	              assert.debug('findAll', User.name, props);
	              _context5.next = 32;
	              return adapter.findAll(User, props);
	
	            case 32:
	              foundUsers = _context5.sent;
	
	              assert.debug('found', User.name, foundUsers);
	              assert.equal(foundUsers.length, 0);
	
	              assert.debug('findAll', User.name, {});
	              _context5.next = 38;
	              return adapter.findAll(User, {});
	
	            case 38:
	              foundUsers = _context5.sent;
	
	              assert.debug('found', User.name, foundUsers);
	              assert.equal(foundUsers.length, 1);
	
	            case 41:
	            case 'end':
	              return _context5.stop();
	          }
	        }
	      }, _callee5, this);
	    })));
	  });
	};

/***/ },
/* 7 */
/***/ function(module, exports) {

	'use strict';
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
	
	function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }
	
	/* global assert:true */
	module.exports = function (options) {
	  describe('Adapter#update', function () {
	    it('should exist', function () {
	      assert.equal(_typeof(this.$$adapter.update), 'function', 'adapter should have a "update" method');
	    });
	    it('should update a user', _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
	      var adapter, User, props, user, foundUser, updatedUser, beforeUpdateCalled, afterUpdateCalled;
	      return regeneratorRuntime.wrap(function _callee$(_context) {
	        while (1) {
	          switch (_context.prev = _context.next) {
	            case 0:
	              adapter = this.$$adapter;
	              User = this.$$User;
	              props = { name: 'John' };
	
	
	              assert.debug('create', User.name, props);
	              _context.next = 6;
	              return adapter.create(User, props);
	
	            case 6:
	              user = _context.sent;
	
	              assert.debug('created', User.name, user);
	
	              assert.equal(user.name, props.name, 'name of user should be "' + props.name + '"');
	              assert.isDefined(user[User.idAttribute], 'new user should have an id');
	
	              assert.debug('find', User.name, user[User.idAttribute]);
	              _context.next = 13;
	              return adapter.find(User, user[User.idAttribute]);
	
	            case 13:
	              foundUser = _context.sent;
	
	              assert.debug('found', User.name, foundUser);
	
	              assert.equal(foundUser.name, props.name, 'name of user should be "' + props.name + '"');
	              assert.isDefined(foundUser[User.idAttribute], 'new user should have an id');
	              assert.equal(foundUser[User.idAttribute], user[User.idAttribute]);
	
	              assert.debug('update', User.name, user[User.idAttribute], { name: 'Johnny' });
	              _context.next = 21;
	              return adapter.update(User, user[User.idAttribute], { name: 'Johnny' });
	
	            case 21:
	              updatedUser = _context.sent;
	
	              assert.debug('updated', User.name, updatedUser);
	              assert.equal(updatedUser.name, 'Johnny');
	              assert.equal(updatedUser[User.idAttribute], user[User.idAttribute]);
	
	              beforeUpdateCalled = false;
	              afterUpdateCalled = false;
	
	              // Test beforeUpdate and afterUpdate
	
	              adapter.beforeUpdate = function (mapper, id, props, opts) {
	                var _Promise$resolve;
	
	                beforeUpdateCalled = true;
	                assert.isObject(mapper, 'beforeUpdate should have received mapper argument');
	                assert.isDefined(id, 'beforeUpdate should have received id argument');
	                assert.isObject(props, 'beforeUpdate should have received props argument');
	                assert.isObject(opts, 'beforeUpdate should have received opts argument');
	                // Test re-assignment
	                return Promise.resolve((_Promise$resolve = {}, _defineProperty(_Promise$resolve, User.idAttribute, user[User.idAttribute]), _defineProperty(_Promise$resolve, 'name', 'bar'), _Promise$resolve));
	              };
	              adapter.afterUpdate = function (mapper, id, props, opts, record) {
	                var _Promise$resolve2;
	
	                afterUpdateCalled = true;
	                assert.isObject(mapper, 'afterUpdate should have received mapper argument');
	                assert.isDefined(id, 'afterUpdate should have received id argument');
	                assert.isObject(props, 'afterUpdate should have received props argument');
	                assert.isObject(opts, 'afterUpdate should have received opts argument');
	                assert.isObject(record, 'afterUpdate should have received record argument');
	                // Test re-assignment
	                return Promise.resolve((_Promise$resolve2 = {}, _defineProperty(_Promise$resolve2, User.idAttribute, user[User.idAttribute]), _defineProperty(_Promise$resolve2, 'name', record.name + 'baz'), _Promise$resolve2));
	              };
	              assert.debug('update', User.name, user[User.idAttribute], { name: 'foo' });
	              _context.next = 32;
	              return adapter.update(User, user[User.idAttribute], { name: 'foo' });
	
	            case 32:
	              updatedUser = _context.sent;
	
	              assert.debug('updated', User.name, updatedUser);
	              assert.equal(updatedUser.name, 'barbaz');
	              assert.equal(updatedUser[User.idAttribute], user[User.idAttribute]);
	              assert.isTrue(beforeUpdateCalled, 'beforeUpdate should have been called');
	              assert.isTrue(afterUpdateCalled, 'afterUpdate should have been called');
	
	              assert.debug('find', User.name, user[User.idAttribute]);
	              _context.next = 41;
	              return adapter.find(User, user[User.idAttribute]);
	
	            case 41:
	              foundUser = _context.sent;
	
	              assert.debug('found', User.name, foundUser);
	              assert.equal(foundUser.name, 'bar');
	              assert.equal(foundUser[User.idAttribute], user[User.idAttribute]);
	
	            case 45:
	            case 'end':
	              return _context.stop();
	          }
	        }
	      }, _callee, this);
	    })));
	    it('should update a user and return raw', _asyncToGenerator(regeneratorRuntime.mark(function _callee2() {
	      var adapter, User, props, user, result;
	      return regeneratorRuntime.wrap(function _callee2$(_context2) {
	        while (1) {
	          switch (_context2.prev = _context2.next) {
	            case 0:
	              adapter = this.$$adapter;
	              User = this.$$User;
	              props = { name: 'John' };
	
	
	              assert.debug('create', props);
	              _context2.next = 6;
	              return adapter.create(User, props);
	
	            case 6:
	              user = _context2.sent;
	
	              assert.debug('created', JSON.stringify(user, null, 2));
	
	              assert.equal(user.name, props.name, 'name of user should be "' + props.name + '"');
	              assert.isDefined(user[User.idAttribute], 'new user should have an id');
	
	              assert.debug('update', user[User.idAttribute], { name: 'Johnny' });
	              _context2.next = 13;
	              return adapter.update(User, user[User.idAttribute], { name: 'Johnny' }, { raw: true });
	
	            case 13:
	              result = _context2.sent;
	
	              assert.debug('updated', JSON.stringify(result, null, 2));
	              assert.isDefined(result.data, 'result.data is defined');
	              assert.isDefined(result.updated, 'result.updated is defined');
	              assert.equal(result.data.name, 'Johnny', 'result.data.name should be "Johnny"');
	              assert.equal(result.data[User.idAttribute], user[User.idAttribute], 'result.data.' + User.idAttribute + ' should be ' + user[User.idAttribute]);
	              assert.equal(result.updated, 1, 'result.updated should be 1');
	
	            case 20:
	            case 'end':
	              return _context2.stop();
	          }
	        }
	      }, _callee2, this);
	    })));
	    it('should throw when updating non-existent row', _asyncToGenerator(regeneratorRuntime.mark(function _callee3() {
	      var adapter, User;
	      return regeneratorRuntime.wrap(function _callee3$(_context3) {
	        while (1) {
	          switch (_context3.prev = _context3.next) {
	            case 0:
	              adapter = this.$$adapter;
	              User = this.$$User;
	
	
	              assert.debug('update', 'non-existent-id', { name: 'Johnny' });
	              _context3.prev = 3;
	              _context3.next = 6;
	              return adapter.update(User, 'non-existent-id', { name: 'Johnny' });
	
	            case 6:
	              throw new Error('update should have failed!');
	
	            case 9:
	              _context3.prev = 9;
	              _context3.t0 = _context3['catch'](3);
	
	              assert.debug('correctly threw error', _context3.t0.message);
	              assert.isDefined(_context3.t0.message, 'err.message is defined');
	              assert.equal(_context3.t0.message, 'Not Found', 'err.message should be "Not Found"');
	
	            case 14:
	            case 'end':
	              return _context3.stop();
	          }
	        }
	      }, _callee3, this, [[3, 9]]);
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
	
	
	              assert.debug('create', User.name, props);
	              _context.next = 6;
	              return adapter.create(User, props);
	
	            case 6:
	              user1 = _context.sent;
	
	              assert.debug('created', User.name, user1);
	              userId1 = user1[User.idAttribute];
	
	
	              props = { name: 'John', age: 30 };
	
	              assert.debug('create', User.name, props);
	              _context.next = 13;
	              return adapter.create(User, props);
	
	            case 13:
	              user2 = _context.sent;
	
	              assert.debug('created', User.name, user2);
	              userId2 = user2[User.idAttribute];
	
	
	              assert.debug('findAll', User.name, { name: 'John' });
	              _context.next = 19;
	              return adapter.findAll(User, { name: 'John' });
	
	            case 19:
	              users = _context.sent;
	
	              assert.debug('found', User.name, users);
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
	
	              assert.debug('updateAll', User.name, { name: 'Johnny' }, { name: 'John' });
	              _context.next = 31;
	              return adapter.updateAll(User, { name: 'Johnny' }, { name: 'John' });
	
	            case 31:
	              users2 = _context.sent;
	
	              assert.debug('updated', User.name, users2);
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
	
	              assert.debug('findAll', User.name, { name: 'John' });
	              _context.next = 43;
	              return adapter.findAll(User, { name: 'John' });
	
	            case 43:
	              users3 = _context.sent;
	
	              assert.debug('found', User.name, users3);
	              assert.equalObjects(users3, []);
	              assert.equal(users3.length, 0);
	
	              assert.debug('findAll', User.name, { name: 'Johnny' });
	              _context.next = 50;
	              return adapter.findAll(User, { name: 'Johnny' });
	
	            case 50:
	              users4 = _context.sent;
	
	              assert.debug('found', User.name, users4);
	
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
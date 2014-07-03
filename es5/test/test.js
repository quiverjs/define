"use strict";
require('traceur');
var textToStreamable = $traceurRuntime.assertObject(require('quiver-stream-util')).textToStreamable;
var loadSimpleHandler = $traceurRuntime.assertObject(require('quiver-component')).loadSimpleHandler;
var $__0 = $traceurRuntime.assertObject(require('../lib/define.js')),
    simpleHandler = $__0.simpleHandler,
    argsFilter = $__0.argsFilter,
    errorFilter = $__0.errorFilter,
    router = $__0.router;
var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
var should = chai.should();
describe('define dsl test', (function() {
  it('basic test', (function() {
    var fooHandler = simpleHandler('foo', (function(args) {
      args.path.should.equal('/foo');
      return 'foo';
    }), 'void', 'text').done();
    var barHandler = simpleHandler('bar', (function(args) {
      args.path.should.equal('/subpath');
      args.id.should.equal('baz');
      args.bazInjected.should.equal('baz');
      return 'bar';
    }), 'void', 'text').argsFilter((function(args) {
      args.id.should.equal('baz');
      args.bazInjected = 'baz';
      return args;
    })).done();
    var mainRouter = router('main').staticRoute(fooHandler, '/foo').paramRoute(barHandler, '/bar/:id/:restpath').errorFilter((function(err) {
      return textToStreamable('error page');
    })).done();
    return loadSimpleHandler({}, mainRouter, 'void', 'text').then((function(handler) {
      var p1 = handler({path: '/foo'}).should.eventually.equal('foo');
      var p2 = handler({path: '/bar/baz/subpath'}).should.eventually.equal('bar');
      var p3 = handler({path: '/baz'}).should.eventually.equal('error page');
      return Promise.all([p1, p2, p3]);
    }));
  }));
}));

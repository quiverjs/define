import 'traceur'

import { textToStreamable } from 'quiver-stream-util'
import { loadSimpleHandler } from 'quiver-component'

import { 
  simpleHandler, argsFilter, errorFilter, router 
} from '../lib/define.js'

var chai = require('chai')
var chaiAsPromised = require('chai-as-promised')

chai.use(chaiAsPromised)
var should = chai.should()

describe('define dsl test', () => {
  it('basic test', () => {
    var fooHandler = simpleHandler('my foo handler',
      args => {
        args.path.should.equal('/foo')

        return 'foo'
      }, 'void', 'text')
      .done()

    var barHandler = simpleHandler(
      'my bar handler',
      args => {
        args.path.should.equal('/subpath')
        args.id.should.equal('baz')
        args.bazInjected.should.equal('baz')

        return 'bar'
      }, 'void', 'text')
      .argsFilter(args => {
        args.id.should.equal('baz')
        args.bazInjected = 'baz'

        return args
      })
      .done()

    var mainRouter = router('my main router')
      .staticRoute(fooHandler, '/foo')
      .paramRoute(barHandler, '/bar/:id/:restpath')
      .errorFilter(err => textToStreamable('error page'))
      .done()

    return loadSimpleHandler({}, mainRouter, 'void', 'text')
    .then(handler => {
      var p1 = handler({ path: '/foo' })
        .should.eventually.equal('foo')

      var p2 = handler({ path: '/bar/baz/subpath' })
        .should.eventually.equal('bar')

      var p3 = handler({ path: '/baz' })
        .should.eventually.equal('error page')

      return Promise.all([p1, p2, p3])
    })
  })
})
"use strict";
Object.defineProperties(exports, {
  handleableBuilder: {get: function() {
      return handleableBuilder;
    }},
  handleable: {get: function() {
      return handleable;
    }},
  streamHandlerBuilder: {get: function() {
      return streamHandlerBuilder;
    }},
  streamHandler: {get: function() {
      return streamHandler;
    }},
  httpHandlerBuilder: {get: function() {
      return httpHandlerBuilder;
    }},
  httpHandler: {get: function() {
      return httpHandler;
    }},
  simpleHandlerBuilder: {get: function() {
      return simpleHandlerBuilder;
    }},
  simpleHandler: {get: function() {
      return simpleHandler;
    }},
  __esModule: {value: true}
});
var middlewareDefiner = $traceurRuntime.assertObject(require('./middleware.js')).middlewareDefiner;
var $__0 = $traceurRuntime.assertObject(require('quiver-component')),
    HandleableBuilder = $__0.HandleableBuilder,
    Handleable = $__0.Handleable,
    StreamHandlerBuilder = $__0.StreamHandlerBuilder,
    StreamHandler = $__0.StreamHandler,
    HttpHandlerBuilder = $__0.HttpHandlerBuilder,
    HttpHandler = $__0.HttpHandler,
    SimpleHandlerBuilder = $__0.SimpleHandlerBuilder,
    SimpleHandler = $__0.SimpleHandler;
var handleableBuilder = (function(name, builder) {
  return middlewareDefiner(new HandleableBuilder(builder, {name: name}));
});
var handleable = (function(name, handleable) {
  return middlewareDefiner(new Handleable(handleable, {name: name}));
});
var streamHandlerBuilder = (function(name, builder) {
  return middlewareDefiner(new StreamHandlerBuilder(builder, {name: name}));
});
var streamHandler = (function(name, handler) {
  return middlewareDefiner(new StreamHandler(handler, {name: name}));
});
var httpHandlerBuilder = (function(name, builder) {
  return middlewareDefiner(new HttpHandlerBuilder(builder, {name: name}));
});
var httpHandler = (function(name, handler) {
  return middlewareDefiner(new HttpHandler(handler, {name: name}));
});
var simpleHandlerBuilder = (function(name, builder, inType, outType) {
  return middlewareDefiner(new SimpleHandlerBuilder(builder, inType, outType, {name: name}));
});
var simpleHandler = (function(name, handler, inType, outType) {
  return middlewareDefiner(new SimpleHandler(handler, inType, outType, {name: name}));
});

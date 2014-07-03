"use strict";
Object.defineProperties(exports, {
  middlewareDefiner: {get: function() {
      return middlewareDefiner;
    }},
  handleableMiddleware: {get: function() {
      return handleableMiddleware;
    }},
  handleableFilter: {get: function() {
      return handleableFilter;
    }},
  streamFilter: {get: function() {
      return streamFilter;
    }},
  httpFilter: {get: function() {
      return httpFilter;
    }},
  argsFilter: {get: function() {
      return argsFilter;
    }},
  errorFilter: {get: function() {
      return errorFilter;
    }},
  inputHandlerMiddleware: {get: function() {
      return inputHandlerMiddleware;
    }},
  transformFilter: {get: function() {
      return transformFilter;
    }},
  configOverrideMiddleware: {get: function() {
      return configOverrideMiddleware;
    }},
  configMiddleware: {get: function() {
      return configMiddleware;
    }},
  __esModule: {value: true}
});
var $__0 = $traceurRuntime.assertObject(require('quiver-component')),
    HandleableFilter = $__0.HandleableFilter,
    StreamFilter = $__0.StreamFilter,
    HttpFilter = $__0.HttpFilter,
    ArgsFilter = $__0.ArgsFilter,
    ArgsBuilderFilter = $__0.ArgsBuilderFilter,
    ErrorFilter = $__0.ErrorFilter,
    ErrorBuilderFilter = $__0.ErrorBuilderFilter,
    ErrorHttpFilter = $__0.ErrorHttpFilter,
    ErrorBuilderHttpFilter = $__0.ErrorBuilderHttpFilter,
    HandleableMiddleware = $__0.HandleableMiddleware,
    TransformFilter = $__0.TransformFilter,
    InputHandlerMiddleware = $__0.InputHandlerMiddleware,
    ConfigMiddleware = $__0.ConfigMiddleware,
    ConfigOverrideMiddleware = $__0.ConfigOverrideMiddleware;
var basicDefiner = $traceurRuntime.assertObject(require('./basic.js')).basicDefiner;
var middlewareDefiner = (function(component, definer) {
  if (!definer)
    definer = basicDefiner(component);
  var addMiddleware = (function(middleware) {
    component.addMiddleware(middleware);
    return definer;
  });
  definer.middleware = addMiddleware;
  var inputHandler = (function(inputComponent, toConfig) {
    return addMiddleware(new InputHandlerMiddleware(inputComponent, toConfig));
  });
  definer.inputHandler = inputHandler;
  definer.inputSimpleHandler = (function(simpleHandler, inType, outType, toConfig) {
    var handlerComponent = new SimpleHandler(simpleHandler, inType, outType);
    return inputHandler(handlerComponent, toConfig);
  });
  definer.transformFilter = (function(handlerComponent, transformMode) {
    var middleware = new TransformFilter(handlerComponent, transformMode);
    return addMiddleware(middleware);
  });
  definer.argsFilter = (function(argsHandler) {
    return addMiddleware(new ArgsFilter(argsHandler));
  });
  definer.errorFilter = (function(errorHandler) {
    return addMiddleware(new ErrorFilter(errorHandler));
  });
  definer.configOverride = (function(overrideConfig) {
    return addMiddleware(new ConfigOverrideMiddleware(overrideConfig));
  });
  definer.configMiddleware = (function(configHandler) {
    return addMiddleware(new ConfigMiddleware(configHandler));
  });
  definer.streamFilter = (function(filter) {
    return addMiddleware(new StreamFilter(filter));
  });
  return definer;
});
var handleableMiddleware = (function(name, middleware) {
  return middlewareDefiner(new HandleableMiddleware(middleware, {name: name}));
});
var handleableFilter = (function(name, filter) {
  return middlewareDefiner(new HandleableFilter(filter, {name: name}));
});
var streamFilter = (function(name, filter) {
  return middlewareDefiner(new StreamFilter(filter, {name: name}));
});
var httpFilter = (function(name, filter) {
  return middlewareDefiner(new HttpFilter(filter, {name: name}));
});
var argsFilter = (function(name, filter) {
  return middlewareDefiner(new ArgsFilter(filter, {name: name}));
});
var errorFilter = (function(name, filter) {
  return middlewareDefiner(new ErrorFilter(filter, {name: name}));
});
var inputHandlerMiddleware = (function(name, handler, toConfig) {
  return middlewareDefiner(new InputHandlerMiddleware(handler, toConfig, {name: name}));
});
var transformFilter = (function(name, handler, mode) {
  return middlewareDefiner(new TransformFilter(handler, mode, {name: name}));
});
var configOverrideMiddleware = (function(name, overrideConfig) {
  return middlewareDefiner(new ConfigOverrideMiddleware(overrideConfig, {name: name}));
});
var configMiddleware = (function(name, configHandler) {
  return middlewareDefiner(new ConfigMiddleware(configHandler, {name: name}));
});

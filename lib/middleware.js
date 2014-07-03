import {
  HandleableFilter, StreamFilter, HttpFilter,
  ArgsFilter, ArgsBuilderFilter, ErrorFilter, 
  ErrorBuilderFilter, ErrorHttpFilter, 
  ErrorBuilderHttpFilter, HandleableMiddleware, 
  TransformFilter, InputHandlerMiddleware,
  ConfigMiddleware, ConfigOverrideMiddleware,
} from 'quiver-component'

import { basicDefiner } from './basic.js'

export var middlewareDefiner = (component, definer) => {
  if(!definer) definer = basicDefiner(component)

  var addMiddleware = middleware => {
    component.addMiddleware(middleware)
    return definer
  }

  definer.middleware = addMiddleware

  var inputHandler = (inputComponent, toConfig) => 
    addMiddleware(new InputHandlerMiddleware(inputComponent, toConfig))

  definer.inputHandler = inputHandler

  definer.inputSimpleHandler = (simpleHandler, inType, outType, toConfig) => {
    var handlerComponent = new SimpleHandler(simpleHandler, inType, outType)
    return inputHandler(handlerComponent, toConfig)
  }

  definer.transformFilter = (handlerComponent, transformMode) => {
    var middleware = new TransformFilter(handlerComponent, transformMode)
    return addMiddleware(middleware)
  }

  definer.argsFilter = argsHandler =>
    addMiddleware(new ArgsFilter(argsHandler))

  definer.errorFilter = errorHandler =>
    addMiddleware(new ErrorFilter(errorHandler))

  definer.configOverride = overrideConfig =>
    addMiddleware(new ConfigOverrideMiddleware(overrideConfig))

  definer.configMiddleware = configHandler =>
    addMiddleware(new ConfigMiddleware(configHandler))

  definer.streamFilter = filter =>
    addMiddleware(new StreamFilter(filter))

  return definer
}

export var handleableMiddleware = (name, middleware) =>
  middlewareDefiner(new HandleableMiddleware(middleware, { name }))

export var handleableFilter = (name, filter) =>
  middlewareDefiner(new HandleableFilter(filter, { name }))

export var streamFilter = (name, filter) =>
  middlewareDefiner(new StreamFilter(filter, { name }))

export var httpFilter = (name, filter) =>
  middlewareDefiner(new HttpFilter(filter, { name }))

export var argsFilter = (name, filter) =>
  middlewareDefiner(new ArgsFilter(filter, { name }))

export var errorFilter = (name, filter) =>
  middlewareDefiner(new ErrorFilter(filter, { name }))

export var inputHandlerMiddleware = (name, handler, toConfig) =>
  middlewareDefiner(new InputHandlerMiddleware(handler, toConfig, { name }))

export var transformFilter = (name, handler, mode) =>
  middlewareDefiner(new TransformFilter(handler, mode, { name }))

export var configOverrideMiddleware = (name, overrideConfig) =>
  middlewareDefiner(new ConfigOverrideMiddleware(overrideConfig, { name }))

export var configMiddleware = (name, configHandler) =>
  middlewareDefiner(new ConfigMiddleware(configHandler, { name }))
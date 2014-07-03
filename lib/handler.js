import { middlewareDefiner } from './middleware.js'

import {
  HandleableBuilder, Handleable,
  StreamHandlerBuilder, StreamHandler,
  HttpHandlerBuilder, HttpHandler,
  SimpleHandlerBuilder, SimpleHandler,
} from 'quiver-component'

export var handleableBuilder = (name, builder) => 
  middlewareDefiner(new HandleableBuilder(builder, { name }))

export var handleable = (name, handleable) =>
  middlewareDefiner(new Handleable(handleable, { name }))

export var streamHandlerBuilder = (name, builder) =>
  middlewareDefiner(new StreamHandlerBuilder(builder, { name }))

export var streamHandler = (name, handler) =>
  middlewareDefiner(new StreamHandler(handler, { name }))

export var httpHandlerBuilder = (name, builder) =>
  middlewareDefiner(new HttpHandlerBuilder(builder, { name }))

export var httpHandler = (name, handler) =>
  middlewareDefiner(new HttpHandler(handler, { name }))

export var simpleHandlerBuilder = (name, builder, inType, outType) =>
  middlewareDefiner(new SimpleHandlerBuilder(builder, inType, outType, { name }))

export var simpleHandler = (name, handler, inType, outType) =>
  middlewareDefiner(new SimpleHandler(handler, inType, outType, { name }))

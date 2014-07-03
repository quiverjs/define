import {
  RouteList, Router, Route, StaticRoute, 
  DynamicRoute, RegexRoute, ParamRoute,
} from 'quiver-component'

import { handlerDefiner } from './handler.js'
import { middlewareDefiner } from './middleware.js'

var routeListDefiner = (routeList, definer={}) => {
  definer.staticRoute = (handler, path) => {
    routeList.addRoute(new StaticRoute(handler, path))
    return definer
  }

  definer.paramRoute = (handler, path) => {
    routeList.addRoute(new ParamRoute(handler, path))
    return definer
  }

  definer.regexRoute = (handler, regex, matchFields) => {
    routeList.addRoute(new RegexRoute(handler, regex, matchFields))
    return definer
  }

  definer.dynamicRoute = (handler, matcher) => {
    routeList.addRoute(new DynamicRoute(handler, matcher))
    return definer
  }

  return definer
}

var routerDefiner = (router, definer={}) => {
  definer.routeList = (routeList) => {
    router.addRouteList(routeList)
    return definer
  }

  return definer
}

export var router = name => {
  var routerComponent = new Router([], { name })

  var definer = middlewareDefiner(routerComponent)
  definer = routeListDefiner(routerComponent, definer)
  definer = routerDefiner(routerComponent, definer)

  return definer
}

export var routeList = name => {
  var routeListComponent = new RouteList([], { name })
  var definer = middlewareDefiner(routeListComponent)
  return routeListDefiner(routeListComponent)
}
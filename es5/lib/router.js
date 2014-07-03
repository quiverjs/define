"use strict";
Object.defineProperties(exports, {
  router: {get: function() {
      return router;
    }},
  routeList: {get: function() {
      return routeList;
    }},
  __esModule: {value: true}
});
var $__0 = $traceurRuntime.assertObject(require('quiver-component')),
    RouteList = $__0.RouteList,
    Router = $__0.Router,
    Route = $__0.Route,
    StaticRoute = $__0.StaticRoute,
    DynamicRoute = $__0.DynamicRoute,
    RegexRoute = $__0.RegexRoute,
    ParamRoute = $__0.ParamRoute;
var handlerDefiner = $traceurRuntime.assertObject(require('./handler.js')).handlerDefiner;
var middlewareDefiner = $traceurRuntime.assertObject(require('./middleware.js')).middlewareDefiner;
var routeListDefiner = (function(routeList) {
  var definer = arguments[1] !== (void 0) ? arguments[1] : {};
  definer.staticRoute = (function(handler, path) {
    routeList.addRoute(new StaticRoute(handler, path));
    return definer;
  });
  definer.paramRoute = (function(handler, path) {
    routeList.addRoute(new ParamRoute(handler, path));
    return definer;
  });
  definer.regexRoute = (function(handler, regex, matchFields) {
    routeList.addRoute(new RegexRoute(handler, regex, matchFields));
    return definer;
  });
  definer.dynamicRoute = (function(handler, matcher) {
    routeList.addRoute(new DynamicRoute(handler, matcher));
    return definer;
  });
  return definer;
});
var routerDefiner = (function(router) {
  var definer = arguments[1] !== (void 0) ? arguments[1] : {};
  definer.routeList = (function(routeList) {
    router.addRouteList(routeList);
    return definer;
  });
  return definer;
});
var router = (function(name) {
  var routerComponent = new Router([], {name: name});
  var definer = middlewareDefiner(routerComponent);
  definer = routeListDefiner(routerComponent, definer);
  definer = routerDefiner(routerComponent, definer);
  return definer;
});
var routeList = (function(name) {
  var routeListComponent = new RouteList([], {name: name});
  var definer = middlewareDefiner(routeListComponent);
  return routeListDefiner(routeListComponent);
});

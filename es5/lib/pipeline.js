"use strict";
Object.defineProperties(exports, {
  pipeline: {get: function() {
      return pipeline;
    }},
  __esModule: {value: true}
});
var Pipeline = $traceurRuntime.assertObject(require('quiver-component')).Pipeline;
var middlewareDefiner = $traceurRuntime.assertObject(require('./middleware.js')).middlewareDefiner;
var pipelineDefiner = (function(pipeline, definer) {
  definer.pipe = (function(component) {
    pipeline.addPipe(component);
    return definer;
  });
  return definer;
});
var pipeline = (function(name) {
  var component = new Pipeline([], {name: name});
  var definer = middlewareDefiner(component);
  definer = pipelineDefiner(component, definer);
  return definer;
});

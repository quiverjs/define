import { Pipeline } from 'quiver-component'
import { middlewareDefiner } from './middleware.js'

var pipelineDefiner = (pipeline, definer) => {
  definer.pipe = component => {
    pipeline.addPipe(component)
    return definer
  }

  return definer
}

export var pipeline = name => {
  var component = new Pipeline([], { name })
  var definer = middlewareDefiner(component)
  definer = pipelineDefiner(component, definer)

  return definer
}
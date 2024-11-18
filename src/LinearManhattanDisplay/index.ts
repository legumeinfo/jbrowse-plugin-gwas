import type PluginManager from '@jbrowse/core/PluginManager'
export { configSchemaFactory } from './configSchemaFactory'
import type WigglePlugin from '@jbrowse/plugin-wiggle'

export function stateModelFactory(
  pluginManager: PluginManager,
  configSchema: any,
) {
  const { types } = pluginManager.lib['mobx-state-tree']
  const WigglePlugin = pluginManager.getPlugin('WigglePlugin') as WigglePlugin
  const { linearWiggleDisplayModelFactory } = WigglePlugin.exports
  return types.compose(
    'LinearManhattanDisplay',
    linearWiggleDisplayModelFactory(pluginManager, configSchema),
    types
      .model({
        type: types.literal('LinearManhattanDisplay'),
      })
      .views(() => ({
        get rendererTypeName() {
          return 'LinearManhattanRenderer'
        },
        get needsScalebar() {
          return true
        },
        get regionTooLarge() {
          return false
        },
      })),
  )
}

export type LinearManhattanDisplayModel = ReturnType<typeof stateModelFactory>

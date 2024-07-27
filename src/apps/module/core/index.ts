

import basebuild from '@bebasebuild/basebuild'
import debug from 'debug'
import './types.js'
import createBasebuildAngularLegacyViteConfig from './vite.config.js'
import { UserConfigFnObject } from 'vite'
const log = debug('basebuild-angular-legacy:module:core')

export const angularify = (hosterViteConfigFunction?: UserConfigFnObject) => {
  log('Hoster config param', hosterViteConfigFunction)

  return basebuild<UserConfigFnObject>({
    configSystem: 'vite',
    configs: [
      createBasebuildAngularLegacyViteConfig,
      hosterViteConfigFunction
    ]
  })
}

export default angularify
import debug from 'debug'
import { resolve } from 'node:path'
import { UserConfig, loadEnv } from 'vite'
import { UserConfigFnObject } from 'vite'
import { coffeeScritPlugin } from '../plugins/coffeeScript'

const log = debug('basebuild-angular-legacy:vite-config')

export const createBasebuildAngularLegacyViteConfig: UserConfigFnObject = ({ mode }) => {
  const isDevMode = process.env.NODE_ENV !== 'production'
  const env = loadEnv(mode, process.cwd())
  const { VITE_SCOPE } = env

  log('[CHECK ENV] NODE_ENV', process.env.NODE_ENV)
  log('[CHECK ENV] isDevMode', isDevMode)
  log('[CHECK ENV] VITE_SCOPE', VITE_SCOPE)

  const viteConfig: UserConfig = {
    plugins: [
      coffeeScritPlugin()
    ],

    resolve: {
      alias: {
        '@': resolve(process.cwd(), './src')
      }
    },

    server: {
      port: 8080,
      warmup: {
        clientFiles: ['./src/**/*'],
      },
    },

    build: {
      outDir: VITE_SCOPE ? `./build/${VITE_SCOPE}` : './dist',
      minify: 'esbuild',
      rollupOptions: {
        output: {
          entryFileNames: VITE_SCOPE ? `js/[name].${VITE_SCOPE}-[hash].js` : 'js/[name]-[hash].js',
        }
      }
    }
  }

  log('defaults', viteConfig)
  return viteConfig
}


export default createBasebuildAngularLegacyViteConfig
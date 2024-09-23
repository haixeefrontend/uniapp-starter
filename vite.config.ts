import { readFileSync } from 'node:fs'

import uniModule from '@dcloudio/vite-plugin-uni'
import Components from '@uni-helper/vite-plugin-uni-components'
import { UniUIResolver } from '@uni-helper/vite-plugin-uni-components/resolvers'
import json5 from 'json5'
import unocss from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import { defineConfig, loadEnv } from 'vite'
import uniPolyfill from 'vite-plugin-uni-polyfill'

// @ts-expect-error
const uni = uniModule.default || uniModule

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
    plugins: [
      uni(),
      // See https://github.com/dcloudio/uni-app/issues/4604
      uniPolyfill(),
      unocss(),
      // https://unplugin.unjs.io/showcase/unplugin-auto-import.html#configuration
      AutoImport({
        imports: [
          'vue',

          // Auto-Import Custom Packages
          {
            '@dcloudio/uniapp': [
              // lifecycle hooks
              'onLoad',
              'onUnload',
              'onShow',
              'onHide',
              'onReady',
              // page event hooks
              'onPageShow',
              'onPageHide',
              'onReachBottom',
              'onPullDownRefresh',
              'onPageScroll',
              'onBackPress',
              'onNavigatorButtonTap',
              'onTabItemTap',
              'onThemeChange',
              'onResize',
              // app event hooks
              'onLaunch',
              'onError',
              'onPageNotFound',
              'onUnhandledRejection',
              'onSaveExitState',
              // share hooks
              'onShareAppMessage',
              'onShareTimeline',
              // miscellaneous hooks
              'getCurrentSubNVue',
            ],

            // Project Custom APIs
            '@/api': [
              'useApi',
            ],
          },
        ],
        dts: true,
        eslintrc: {
          enabled: true,
        },
      }),
      Components({
        dirs: ['src/components'],
        dts: true,
        resolvers: [
          UniUIResolver(),
        ],
      }),
    ],
    define: {
      __UNIAPP_TAB_PAGES__: json5.parse(readFileSync('./src/pages.json', 'utf-8'))
        ?.tabBar
        ?.list
        ?.map((item: any) => `/${item.pagePath}`) ?? [],
    },
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern',
          silenceDeprecations: ['legacy-js-api'],
        },
      },
    },
    // 用于本地开发时跨域请求 API，可以添加 `.env.development.local` 文件并添加 `VITE_API_ROOT=/api` 以启用代理
    server: {
      proxy: {
        '/api': {
          target: env.VITE_API_ENDPOINT,
          ws: true,
          autoRewrite: true,
          changeOrigin: true,
          cookiePathRewrite: '/',
          cookieDomainRewrite: 'localhost',
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
      watch: {
        ignored: [
          '**/unpackage/resources/**',
        ],
      },
    },
  }
})

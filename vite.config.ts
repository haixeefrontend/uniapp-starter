import { defineConfig } from 'vite'
import uniModule from '@dcloudio/vite-plugin-uni'
import unocss from 'unocss/vite'

// @ts-expect-error
const uni = uniModule.default || uniModule

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [uni(), unocss()],
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler',
      },
    },
  },
})

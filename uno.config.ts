import { presetHaixee } from '@haixee/unocss-preset'
import { variantMatcher } from '@unocss/preset-mini/utils'
import { defineConfig, transformerVariantGroup, transformerDirectives, presetUno } from 'unocss'
import { presetApplet, presetRemRpx } from 'unocss-applet'

import type { Theme } from '@unocss/preset-uno'
import type { Preset, SourceCodeTransformer } from 'unocss'

// uni-app
const isApplet = process.env?.UNI_PLATFORM !== 'h5'
// taro
// const isApplet = process.env.TARO_ENV !== 'h5' ?? false
const presets: Preset[] = []
const transformers: SourceCodeTransformer[] = []

function transformDarkMode(preset: Preset<Theme>): Preset<Theme> {
  for (const k in preset.variants ?? []) {
    const v = preset.variants![k]
    if (typeof v === 'function') continue
    if (typeof v === 'object') {
      // Hack unocss's dark mode, originally the `dark:foo` would be transform as `.dark .foo`,
      // but we also need to support the same level selector, like `.dark.foo`. So we need to
      // override the `selector` property by ourself.
      if (v.name === 'dark' || v.name === 'light') {
        preset.variants![k] = variantMatcher(v.name, (input) => ({
          selector: `.${v.name} $$ ${input.selector}, .${v.name}${input.selector}`,
        }))
      }
    }
  }
  return preset
}

if (isApplet) {
  presets.push(transformDarkMode(presetApplet()))
  presets.push(presetRemRpx())
} else {
  presets.push(transformDarkMode(presetApplet()))
  presets.push(presetRemRpx({ mode: 'rpx2rem' }))
}

export default defineConfig({
  presets: [...presets, presetHaixee()],
  transformers: [transformerVariantGroup(), transformerDirectives(), ...transformers],
})

import path from 'path'
import transformCode from './transform'
import type { ImportOptions } from './types'

export default function dynamicImportPlugin(options: ImportOptions) {
  return {
    name: 'vite-plugin-importus',
    async transform(code, id) {
      let importOptions: ImportOptions = []
      if (Array.isArray(options)) {
        importOptions = options
      } else {
        throw new Error('Options must be array.')
      }

      const ext = path.extname(id).slice(1)

      if (['js', 'jsx', 'ts', 'tsx'].indexOf(ext) > -1) {
        code = await transformCode(code, importOptions)
      }
      return code
    }
  }
}

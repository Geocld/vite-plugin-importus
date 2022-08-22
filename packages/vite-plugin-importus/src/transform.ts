import { init, parse as parseImport } from 'es-module-lexer'
import { Parser } from 'acorn'
import MagicString from 'magic-string'
import { formatedComponentName, formatedStyleName } from './format'
import { getusedDefaultComponents } from './ast'
import type { ImportOptions, Components, JsxAndTsxComponents } from './types'

const transformCode = async (code: string, importOptions: ImportOptions) => {

  let s
  await init
  const [imports] = parseImport(code)

  s = new MagicString(code)

  imports.forEach(({
    d: dynamic,
    n: dependence,
    ss: statementStart,
    se: statementEnd,
  }) => {
    // dynamic import
    if (dynamic !== -1) {
      return
    }

    const raw = code.substring(statementStart, statementEnd)

    // AST transform
    const ast = Parser.parse(raw, {
      ecmaVersion: 'latest',
      sourceType: 'module',
    }) as any

    const specifiers = ast.body[0]?.specifiers
    const source = ast.body[0]?.source
    if (!specifiers) {
      return
    }

    const libraryName = source.value

    const option = importOptions.find(
      importOption => importOption.libraryName === libraryName,
    )

    if (!option) {
      return
    }

    const importSpecifierComponent = (specifier) => {
      const { local } = specifier
      const componentName = local.name
      const finalComponentPath = formatedComponentName(libraryName, componentName, option)
      const finalCssPath = formatedStyleName(libraryName, componentName, option)
      
      if (!!finalCssPath) {
        return `import ${local.name} from "${finalComponentPath}";\nimport "${finalCssPath}"; \n`
      } else {
        return `import ${local.name} from "${finalComponentPath}";\n`
      }
      
    }

    let usedDefaultComponents: Components = []
    let usedJsxComponents: JsxAndTsxComponents = []
    let registryImport= new Set<string|undefined|null> () // registry resolved import avoid import again

    const newImportStr = specifiers.reduce((s, specifier) => {
      if (specifier.type === 'ImportDefaultSpecifier') {
        const localLibName = specifier.local.name
        /**
         * source code: 
         * import Antd from 'antd' // need delete
         * const Button = Antd.Button;
         * const { Select } = Antd;
         * 
         * transformed: 
         * import Button from "antd/lib/button";
         * import Select from "antd/lib/select";
         */
        const {
          components,
          jsxAndTsxComponents,
          registryImport: defaultRegistryImport
        } = getusedDefaultComponents(code, localLibName, libraryName, option, registryImport)

        usedDefaultComponents = components
        usedJsxComponents = jsxAndTsxComponents
        registryImport = defaultRegistryImport
      } else if (specifier.type === 'ImportSpecifier') {
        /**
         * source code:
         * import { Button, Select } from 'antd'
         * 
         * transformed:
         * import Button from 'antd/lib/button'
         * import Select from 'antd/lib/select'
         */
        s += importSpecifierComponent(specifier)
      }

      return s
    }, '')

    if (!newImportStr) {
      const isQuoteAfter = s.slice(statementEnd, statementEnd + 1) === ';'
      const stateEnd = isQuoteAfter ? statementEnd + 1 : statementEnd
      s.remove(statementStart, stateEnd) // remove: import Antd from 'antd'
    } else {
      s.overwrite(statementStart, statementEnd + 1, newImportStr)
    }

    // resolve ImportDefaultSpecifier case
    for (const component of usedDefaultComponents) {
      const { transformExpress, start, end } = component
      s.overwrite(start, end, transformExpress)
    }


    // resolve ImportDefaultSpecifier jsx case
    let jsxNewImport = ''
    for (const jsxComponent of usedJsxComponents) {
      const { componentName, start, end, libraryName } = jsxComponent
      s.overwrite(start, end, componentName)

      const jsxCssPath = formatedStyleName(libraryName, componentName, option)

      let newImportExpression = ''
      if (!!jsxCssPath) {
        newImportExpression = `import ${componentName} from "${formatedComponentName(libraryName, componentName, option)}";\nimport "${jsxCssPath}";\n`
      } else {
        newImportExpression = `import ${componentName} from "${formatedComponentName(libraryName, componentName, option)}";\n`
      }
      
      if (!registryImport.has(componentName)) {
        registryImport.add(componentName)
        jsxNewImport += newImportExpression
      }
    }
    if (jsxNewImport) {
      s.overwrite(statementStart, statementEnd, jsxNewImport)
    }
  })

  if (!s) {
    return code
  }
  return s.toString()
}

export default transformCode

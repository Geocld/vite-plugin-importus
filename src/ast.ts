import { Parser, Node } from 'acorn'
import { formatedComponentName, formatedStyleName } from './format'
import type { ImportOption, Components, JsxAndTsxComponents, DefaultComponents } from './types'

function isObjectNode(node: any): boolean {
  return typeof node === 'object' && node !== null
}

// Traversal AST get node of [MemberExpression]
function visitMemberExpression(
  ast: any, 
  components: JsxAndTsxComponents, 
  localLibName: string, 
  option: ImportOption
) {
  if (ast.type === 'MemberExpression') {
    if (ast.object && ast.object.name === localLibName) {
      components.push({
        start: ast.start,
        end: ast.end,
        componentName: ast.property.name,
        ...option
      })
    }
  }

  const keys = Object.keys(ast);
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i]
    const child = ast[key]
    if (Array.isArray(child)) {
      for (let j = 0; j < child.length; j++) {
        visitMemberExpression(child[j], components, localLibName, option)
      }
    } else if (isObjectNode(child)) {
      visitMemberExpression(child, components, localLibName, option)
    }
  }
}

// Parse ImportDefaultSpecifier components
export function getusedDefaultComponents(
  code: string, 
  localLibName: string, 
  libraryName: string, 
  option: ImportOption
): DefaultComponents {
  const { libraryDirectory } = option

  // parse all the code to ast and find 'const xx = localLibName | let xx = localLibName \ var xx = localLibName '
  const ast = Parser.parse(code, {
    ecmaVersion: 'latest',
    sourceType: 'module',
  }) as any

  let components: Components = []
  let jsxAndTsxComponents: JsxAndTsxComponents = []

  if (!ast.body || !ast.body.length) {
    return {
      components,
      jsxAndTsxComponents
    }
  }

  for (const node of ast.body) {
    if (node.type === 'VariableDeclaration') {

      // Get full declarations, you must delete origin declarations after replace new import.
      // console.log(code.substring(node.start, node.end))
      // console.log(node.declarations)
      
      let transformExpress = ''
      for (const dec of node.declarations) {
        
        const decInitType = dec.init.type
        if (decInitType === 'Literal') { // eg. const test = 'foo' 
          continue
        } else if (decInitType === 'MemberExpression') { // eg. const Button = Antd.Button          
          if (dec.init.object.name === localLibName) {
            const finalComponentPath = formatedComponentName(libraryName, dec.id.name, option)
            const finalCssPath = formatedStyleName(libraryName, dec.id.name, option)

            if (!!finalCssPath) {
              transformExpress += `import ${dec.id.name} from "${finalComponentPath}"; \nimport "${finalCssPath}"; \n`
            } else {
              transformExpress += `import ${dec.id.name} from "${finalComponentPath}"; \n`
            }
          }
        } else if (decInitType === 'Identifier' && dec.id.type === 'ObjectPattern') { // eg. const { Button } = Antd & const { Button: MyButton } = Antd
          for (const prop of dec.id.properties) {
            const finalComponentPath = formatedComponentName(libraryName, prop.key.name, option)
            const finalCssPath = formatedStyleName(libraryName, prop.key.name, option)

            if (!!finalCssPath) {
              transformExpress += `import ${prop.value.name} from "${finalComponentPath}"; \nimport "${finalCssPath}"; \n`
            } else {
              transformExpress += `import ${prop.value.name} from "${finalComponentPath}"; \n`
            }
          }
        }
      }
      if (transformExpress) {
        components.push({
          transformExpress,
          start: node.start,
          end: node.end
        })
      }

    } else if (node.type === 'ExpressionStatement') {
      // eg. <Antd.Button/> this case happen in .jsx and .tsx
      visitMemberExpression(node, jsxAndTsxComponents, localLibName, option)
    }
  }

  return {
    components,
    jsxAndTsxComponents
  }
}

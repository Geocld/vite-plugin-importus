import { init, parse as parseImport } from 'es-module-lexer'
import MagicString from 'magic-string'
import kebabCase from 'lodash/kebabCase'
import type { ImportOption } from './types'

// Format source of import x from xxxx after 'from'
export function formatedComponentName(
  libraryName: string, 
  componentName: string, 
  option: ImportOption
): string {
  const {
    style,
    libraryDirectory = 'lib',
    camel2DashComponentName = true,
    styleLibraryDirectory,
    customStyleName,
    customName, 
  } = option

  let finalComponentPath = ''

  const formated = camel2DashComponentName
    ? kebabCase(componentName)
    : componentName

  if (customName && typeof customName === 'function') {
    finalComponentPath = customName(formated)
    if (!finalComponentPath) {
      return ''
    }
  } else {
    finalComponentPath = `${libraryName}/${libraryDirectory }/${formated}/index`
  }

  return finalComponentPath
}

// Format path of css path
export function formatedStyleName(
  libraryName: string, 
  componentName: string, 
  option: ImportOption
): string {
  const {
    style,
    libraryDirectory = 'lib',
    camel2DashComponentName = true,
    styleLibraryDirectory,
    customStyleName,
  } = option

  let finalCssPath = ''
  if (!style && !styleLibraryDirectory) {
    return ''
  }
  const formated = camel2DashComponentName ? kebabCase(componentName) : componentName

  if (customStyleName && typeof customStyleName === 'function') {
    finalCssPath = customStyleName(formated)
    if (!finalCssPath) {
      return ''
    }
  } else {
    const libPath = `${libraryName}/${(styleLibraryDirectory || libraryDirectory) + '/'}${formated}`
    let cssPath

    if (typeof style === 'function') {
      cssPath = style(libPath)
      if (!cssPath) {
        return ''
      }
    } else {
      cssPath = style === 'css' ? 'style/css' : 'style'
    }
    finalCssPath = `${libPath}/${cssPath}`
  }

  return finalCssPath
}
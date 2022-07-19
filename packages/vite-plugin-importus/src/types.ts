export interface ImportOption {
  [key: string]: any
  libraryName: string
  libraryDirectory?: string
  camel2DashComponentName?: boolean
}

export type ImportOptions = Array<ImportOption>

export type Components = Array<{
  transformExpress: string,
  start: number,
  end: number
}>

export interface JsxAndTsxComponent extends ImportOption {
  componentName: string,
  start: number,
  end: number
}

export type JsxAndTsxComponents = Array<JsxAndTsxComponent>

export type DefaultComponents = {
  components: Components,
  jsxAndTsxComponents: JsxAndTsxComponents,
  registryImport: Set<string|undefined|null>
}
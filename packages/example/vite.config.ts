import vitePluginImportus from 'vite-plugin-importus'

const config = {
  build: {
    sourcemap: true,
  },
  plugins: [
    vitePluginImportus([
      {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: 'css',
      }
    ]),
  ],
  test: {
    globals: true
  },
};

export default config

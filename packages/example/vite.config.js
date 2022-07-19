import vitePluginImportus from 'vite-plugin-importus'

const config = {
  plugins: [
    vitePluginImportus([
      {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: 'css',
      }
    ]),
  ],
};

export default config

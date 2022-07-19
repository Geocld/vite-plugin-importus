# vite-plugin-importus
The faster modularly import plugin for Vite.

> refer to [babel-plugin-import](https://github.com/umijs/babel-plugin-import) but support [Vite](https://github.com/vitejs/vite).

> refer to [vite-plugin-import](https://github.com/meowtec/vite-plugin-import) but is faster! `vite-plugin-importus` use [acron](https://github.com/acornjs/acorn) and [es-module-lexer](https://github.com/guybedford/es-module-lexer) to transform codes internally.

## Install
```
npm i vite-plugin-importus -D
```

## Usage
`vite.config.ts`:

```js
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
}
```

app code:
```javascript
import { Button } from 'antd';
ReactDOM.render(<Button>xxxx</Button>);

      ↓ ↓ ↓ ↓ ↓ ↓

import { Button } from 'antd/es/button/index'
import 'antd-mobile/es/button/style/css'

ReactDOM.render(<Button>xxxx</Button>)
```

## Options

See [babel-plugin-import](https://github.com/umijs/babel-plugin-import#options) for more detail.
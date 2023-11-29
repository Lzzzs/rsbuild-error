import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
const path = require('path');

const resolve = dir => path.join(__dirname, dir);

export default defineConfig({
  plugins: [pluginReact()],
  source: {
    alias: {
      '@': resolve('src/')
    },
  },
  html: {
    template: './public/index.html',
  },
  output: {
    distPath: {
      html: '',
    },
    externals: {
      "react": "React",
      "react-dom": "ReactDOM",
      "exceljs": "ExcelJS",
      "wangeditor": "wangEditor",
      "html2canvas": "html2canvas"
    },
    disableSourceMap: false,
  },
  performance: {
    chunkSplit: {
      strategy: 'custom',
      splitChunks: {
        cacheGroups: {
          commons: {
            chunks: 'initial',
            minChunks: 2,
            maxInitialSize: 5,
            minSize: 0
          },
          vendor: {
            test: /node_modules/,
            chunks: 'initial',
            name: 'vendor',
            priority: 10,
            enforce: true
          }
        },
      },
    },
    removeConsole: ['log', 'warn'],
  },
});

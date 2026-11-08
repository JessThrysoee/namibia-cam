import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
import { pluginTypeCheck } from '@rsbuild/plugin-type-check';

export default defineConfig({
  plugins: [pluginTypeCheck(), pluginReact()],
  html: {
    template: './src/index.html',
  },
  output: {
    assetPrefix: '/namibia-cam/',
    sourceMap: {
      js: process.env.NODE_ENV === 'production' ? 'source-map' : 'cheap-module-source-map',
    },
  },
});

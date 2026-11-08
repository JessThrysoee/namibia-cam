import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
import { pluginTypeCheck } from '@rsbuild/plugin-type-check';

export default defineConfig({
  plugins: [pluginTypeCheck(), pluginReact()],
  html: {
    title: 'NamibiaCam',
    meta: {
      description:
        "Watch NamibiaCam's live wildlife webcams from Namibian waterholes side by side. Drag and resize the extra streams, and click one to make it the main view.",
    },
  },
  output: {
    assetPrefix: '/namibia-cam/',
    sourceMap: {
      js: process.env.NODE_ENV === 'production' ? 'source-map' : 'cheap-module-source-map',
    },
  },
});

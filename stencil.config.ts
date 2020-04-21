import { Config } from '@stencil/core';
import jestConfig from './.jest.config.js';
import { sass } from '@stencil/sass';

export const config: Config = {
  namespace: 'lyne-components',
  outputTargets: [
    {
      esmLoaderPath: '../loader',
      type: 'dist'
    },
    {
      footer: '',
      type: 'docs-readme'
    },
    {
      dir: './dist/documentation',
      footer: '',
      type: 'docs-readme'
    },
    {
      file: './dist/documentation/jsonDocs.json',
      type: 'docs-json'
    },
    {
      // disable service workers
      serviceWorker: null,
      type: 'www'
    }
  ],
  plugins: [
    sass({
      injectGlobalPaths: ['src/global/variables.scss']
    })
  ],
  testing: jestConfig
};

import { Config } from '@stencil/core';
import jestConfig from './.jest.config.js';

export const config: Config = {
  namespace: 'lyne-components',
  outputTargets: [
    {
      esmLoaderPath: '../loader',
      type: 'dist'
    },
    {
      type: 'docs-readme'
    },
    {
      // disable service workers
      serviceWorker: null,
      type: 'www'
    }
  ],
  testing: jestConfig
};

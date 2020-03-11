import { Config } from '@stencil/core';

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
  ]
};

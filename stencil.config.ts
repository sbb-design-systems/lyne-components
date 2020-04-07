import { Config } from '@stencil/core';
import jestConfig from './.jest.config.js';
import { reactOutputTarget } from '@stencil/react-output-target';
import { sass } from '@stencil/sass';

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
    },
    reactOutputTarget({
      componentCorePackage: 'lyne-components',
      proxiesFile: '../lyne-components-react/src/components.ts'
    })
  ],
  plugins: [
    sass({
      injectGlobalPaths: ['src/global/variables.scss']
    })
  ],
  testing: jestConfig
};

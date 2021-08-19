import { inlineSvg } from 'stencil-inline-svg';
import jestConfig from './.jest.config.js';
import { sass } from '@stencil/sass';

export const config = {
  buildEs5: 'prod',
  globalStyle: 'src/global/global.scss',
  namespace: 'lyne-components',
  outputTargets: [
    {
      type: 'dist-hydrate-script'
    },
    {
      esmLoaderPath: '../loader',
      type: 'dist'
    },
    {
      type: 'dist-custom-elements-bundle'
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
    }
  ],
  plugins: [
    inlineSvg(),
    sass({
      injectGlobalPaths: [
        'src/global/variables.scss',
        'src/global/functions.scss',
        'src/global/core/components/utilities.scss'
      ]
    })
  ],
  testing: jestConfig
};

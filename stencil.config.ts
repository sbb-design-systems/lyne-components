import { inlineSvg } from 'stencil-inline-svg';
import jestConfig from './.jest.config.js';
import { sass } from '@stencil/sass';

export const config = {
  buildEs5: 'prod',
  globalScript: 'src/global/global.ts',
  globalStyle: 'src/global/global.shared.scss',
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
        'src/global/core/components/utilities.scss',
        'src/global/functions.scss',
        'src/global/mediaqueries.scss',
        'src/global/mixins.scss',
        'src/global/core/shared/variables.scss',
        'node_modules/lyne-design-tokens/dist/scss/variables_css--placeholder.scss'
      ]
    })
  ],
  testing: jestConfig
};

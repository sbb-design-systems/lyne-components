import { assert } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { ssrHydratedFixture } from '../../core/testing/private.ts';

import { SbbFlipCardElement } from './flip-card.component.ts';

import '../flip-card-details.ts';
import '../flip-card-summary.ts';
import '../../title.ts';
import '../../image.ts';
import '../../link.ts';

const imageUrl = import.meta.resolve('../../core/testing/assets/placeholder-image.png');

describe(`sbb-flip-card ssr`, () => {
  let root: SbbFlipCardElement;

  beforeEach(async () => {
    root = await ssrHydratedFixture(
      html`
        <sbb-flip-card>
          <sbb-flip-card-summary>
            <sbb-title level="4">Summary</sbb-title>
            <sbb-image slot="image" image-src=${imageUrl}></sbb-image>
          </sbb-flip-card-summary>
          <sbb-flip-card-details>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam luctus ornare condimentum.
            Vivamus turpis elit, dapibus eget fringilla pellentesque, lobortis in nibh. Duis dapibus
            vitae tortor ullamcorper maximus. In convallis consectetur felis.
            <sbb-link href="https://www.sbb.ch" negative>Link</sbb-link>
          </sbb-flip-card-details>
        </sbb-flip-card>
      `,
      {
        modules: [
          './flip-card.component.js',
          '../flip-card-summary.js',
          '../flip-card-details.js',
          '../../title.js',
          '../../image.js',
          '../../link.js',
        ],
      },
    );
  });

  it('renders', () => {
    assert.instanceOf(root, SbbFlipCardElement);
  });
});

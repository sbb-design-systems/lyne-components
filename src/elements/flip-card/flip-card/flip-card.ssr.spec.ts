import { assert } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { ssrHydratedFixture } from '../../core/testing/private.js';

import { SbbFlipCardElement } from './flip-card.js';

import '../flip-card-details.js';
import '../flip-card-summary.js';
import '../../title.js';
import '../../image.js';
import '../../link.js';

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
        modules: ['./flip-card.js'],
      },
    );
  });

  it('renders', () => {
    assert.instanceOf(root, SbbFlipCardElement);
  });
});

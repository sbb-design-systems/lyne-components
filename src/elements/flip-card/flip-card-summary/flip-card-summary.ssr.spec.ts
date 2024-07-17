import { assert } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { ssrHydratedFixture } from '../../core/testing/private.js';

import { SbbFlipCardSummaryElement } from './flip-card-summary.js';

describe(`sbb-flip-card-summary ssr`, () => {
  it('renders', () => {
    let root: SbbFlipCardSummaryElement;

    beforeEach(async () => {
      root = await ssrHydratedFixture(
        html`<sbb-flip-card-summary image-alignment="after"></sbb-flip-card-summary>`,
        {
          modules: ['./flip-card-summary.js'],
        },
      );
    });

    it('renders', () => {
      assert.instanceOf(root, SbbFlipCardSummaryElement);
    });
  });
});

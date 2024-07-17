import { assert } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { ssrHydratedFixture } from '../../core/testing/private.js';

import { SbbFlipCardDetailsElement } from './flip-card-details.js';

describe(`sbb-flip-card-details ssr`, () => {
  it('renders', () => {
    let root: SbbFlipCardDetailsElement;

    beforeEach(async () => {
      root = await ssrHydratedFixture(html`<sbb-flip-card-details></sbb-flip-card-details>`, {
        modules: ['./flip-card-details.js'],
      });
    });

    it('renders', () => {
      assert.instanceOf(root, SbbFlipCardDetailsElement);
    });
  });
});

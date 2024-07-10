import { assert } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { ssrHydratedFixture } from '../../core/testing/private.js';

import { SbbFlipCardElement } from './flip-card.js';

describe(`sbb-flip-card ssr`, () => {
  it('renders', () => {
    let root: SbbFlipCardElement;

    beforeEach(async () => {
      root = await ssrHydratedFixture(html`<sbb-flip-card my-prop="Label"></sbb-flip-card>`, {
        modules: ['./flip-card.js'],
      });
    });

    it('renders', () => {
      assert.instanceOf(root, SbbFlipCardElement);
    });
  });
});

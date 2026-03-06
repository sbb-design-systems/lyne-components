import { assert } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { ssrHydratedFixture } from '../../core/testing/private.ts';

import { SbbFlipCardDetailsElement } from './flip-card-details.component.ts';

import '../../flip-card.ts';

describe(`sbb-flip-card-details ssr`, () => {
  let root: SbbFlipCardDetailsElement;

  beforeEach(async () => {
    root = await ssrHydratedFixture(html`<sbb-flip-card-details></sbb-flip-card-details>`, {
      modules: ['../../flip-card.ts'],
    });
  });

  it('renders', () => {
    assert.instanceOf(root, SbbFlipCardDetailsElement);
  });
});

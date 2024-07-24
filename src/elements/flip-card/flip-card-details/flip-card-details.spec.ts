import { assert } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { fixture } from '../../core/testing/private.js';

import { SbbFlipCardDetailsElement } from './flip-card-details.js';

describe('sbb-flip-card-details', () => {
  let element: SbbFlipCardDetailsElement;

  beforeEach(async () => {
    element = await fixture(html`<sbb-flip-card-details></sbb-flip-card-details>`);
  });

  it('renders', async () => {
    assert.instanceOf(element, SbbFlipCardDetailsElement);
  });
});

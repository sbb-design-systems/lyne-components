import { assert, fixture } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { SbbCardBadgeElement } from './card-badge';

describe('sbb-card-badge', () => {
  let element: SbbCardBadgeElement;

  it('renders', async () => {
    element = await fixture(html`<sbb-card-badge></sbb-card-badge>`);
    assert.instanceOf(element, SbbCardBadgeElement);
  });
});

import { assert } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { fixture } from '../../core/testing/private/index.js';

import { SbbCardBadgeElement } from './card-badge.js';

describe(`sbb-card-badge with ${fixture.name}`, () => {
  let element: SbbCardBadgeElement;

  it('renders', async () => {
    element = await fixture(html`<sbb-card-badge></sbb-card-badge>`, {
      modules: ['./card-badge.ts'],
    });
    assert.instanceOf(element, SbbCardBadgeElement);
  });
});

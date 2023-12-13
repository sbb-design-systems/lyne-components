import { assert, fixture } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { SbbStatusElement } from './status';

describe('sbb-status', () => {
  let element: SbbStatusElement;

  beforeEach(async () => {
    element = await fixture(html`<sbb-status> Status info text </sbb-status>`);
  });

  it('renders', async () => {
    assert.instanceOf(element, SbbStatusElement);
  });
});

import { assert, fixture } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { SbbJourneyHeader } from './journey-header';

describe('sbb-journey-header', () => {
  let element: SbbJourneyHeader;

  beforeEach(async () => {
    element = await fixture(html`<sbb-journey-header></sbb-journey-header>`);
  });

  it('renders', async () => {
    assert.instanceOf(element, SbbJourneyHeader);
  });
});

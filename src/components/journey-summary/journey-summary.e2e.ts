import { assert, fixture } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { SbbJourneySummaryElement } from './journey-summary';

describe('sbb-journey-summary', () => {
  it('renders', async () => {
    const element = await fixture(html`<sbb-journey-summary></sbb-journey-summary>`);
    assert.instanceOf(element, SbbJourneySummaryElement);
  });
});

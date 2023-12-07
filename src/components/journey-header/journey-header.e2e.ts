import { assert, fixture } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { SbbJourneyHeaderElement } from './journey-header';

describe('sbb-journey-header', () => {
  let element: SbbJourneyHeaderElement;

  beforeEach(async () => {
    element = await fixture(html`<sbb-journey-header></sbb-journey-header>`);
  });

  it('renders', async () => {
    assert.instanceOf(element, SbbJourneyHeaderElement);
  });
});

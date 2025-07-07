import { assert } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { fixture } from '../../core/testing/private.js';

import { SbbFlipCardSummaryElement } from './flip-card-summary.component.js';

describe('sbb-flip-card-summary', () => {
  let element: SbbFlipCardSummaryElement;

  beforeEach(async () => {
    element = await fixture(html`<sbb-flip-card-summary></sbb-flip-card-summary>`);
  });

  it('renders', async () => {
    assert.instanceOf(element, SbbFlipCardSummaryElement);
  });
});

import { assert, expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { fixture } from '../../core/testing/private.js';
import { EventSpy, waitForLitRender } from '../../core/testing.js';

import { SbbFlipCardSummaryElement } from './flip-card-summary.js';

describe('sbb-flip-card-summary', () => {
  let element: SbbFlipCardSummaryElement;

  beforeEach(async () => {
    element = await fixture(html`<sbb-flip-card-summary></sbb-flip-card-summary>`);
  });

  it('renders', async () => {
    assert.instanceOf(element, SbbFlipCardSummaryElement);
  });

  it('emits on click', async () => {
    const myEventNameSpy = new EventSpy(SbbFlipCardSummaryElement.events.myEventName);
    element.click();
    await waitForLitRender(element);
    expect(myEventNameSpy.count).to.be.equal(1);
  });
});

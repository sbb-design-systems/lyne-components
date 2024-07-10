import { assert, expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { fixture } from '../../core/testing/private.js';
import { EventSpy, waitForLitRender } from '../../core/testing.js';

import { SbbFlipCardDetailsElement } from './flip-card-details.js';

describe('sbb-flip-card-details', () => {
  let element: SbbFlipCardDetailsElement;

  beforeEach(async () => {
    element = await fixture(html`<sbb-flip-card-details></sbb-flip-card-details>`);
  });

  it('renders', async () => {
    assert.instanceOf(element, SbbFlipCardDetailsElement);
  });

  it('emits on click', async () => {
    const myEventNameSpy = new EventSpy(SbbFlipCardDetailsElement.events.myEventName);
    element.click();
    await waitForLitRender(element);
    expect(myEventNameSpy.count).to.be.equal(1);
  });
});

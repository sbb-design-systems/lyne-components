import { assert, expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { fixture } from '../../core/testing/private.js';
import { EventSpy, waitForLitRender } from '../../core/testing.js';

import { SbbFlipCardElement } from './flip-card.js';

describe('sbb-flip-card', () => {
  let element: SbbFlipCardElement;

  beforeEach(async () => {
    element = await fixture(html`<sbb-flip-card></sbb-flip-card>`);
  });

  it('renders', async () => {
    assert.instanceOf(element, SbbFlipCardElement);
  });

  it('emits on click', async () => {
    const myEventNameSpy = new EventSpy(SbbFlipCardElement.events.myEventName);
    element.click();
    await waitForLitRender(element);
    expect(myEventNameSpy.count).to.be.equal(1);
  });
});
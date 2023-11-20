import { assert, expect, fixture } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { EventSpy, waitForLitRender } from '../core/testing';

import { SbbStickyBar } from './sticky-bar';

describe('sbb-sticky-bar', () => {
  let element: SbbStickyBar;

  beforeEach(async () => {
    element = await fixture(html`<sbb-sticky-bar></sbb-sticky-bar>`);
  });

  it('renders', async () => {
    assert.instanceOf(element, SbbStickyBar);
  });

  it('emits on click', async () => {
    const myEventNameSpy = new EventSpy(SbbStickyBar.events.myEventName);
    element.click();
    await waitForLitRender(element);
    expect(myEventNameSpy.count).to.be.equal(1);
  });
});

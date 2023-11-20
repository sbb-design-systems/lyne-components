import { assert, expect, fixture } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { EventSpy, waitForLitRender } from '../core/testing';

import { SbbContainer } from './container';

describe('sbb-container', () => {
  let element: SbbContainer;

  beforeEach(async () => {
    element = await fixture(html`<sbb-container></sbb-container>`);
  });

  it('renders', async () => {
    assert.instanceOf(element, SbbContainer);
  });

  it('emits on click', async () => {
    const myEventNameSpy = new EventSpy(SbbContainer.events.myEventName);
    element.click();
    await waitForLitRender(element);
    expect(myEventNameSpy.count).to.be.equal(1);
  });
});

import { assert, expect, fixture } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { EventSpy, waitForLitRender } from '../core/testing';

import { SbbStatus } from './status';

describe('sbb-status', () => {
  let element: SbbStatus;

  beforeEach(async () => {
    element = await fixture(html`<sbb-status></sbb-status>`);
  });

  it('renders', async () => {
    assert.instanceOf(element, SbbStatus);
  });

  it('emits on click', async () => {
    const myEventNameSpy = new EventSpy(SbbStatus.events.myEventName);
    element.click();
    await waitForLitRender(element);
    expect(myEventNameSpy.count).to.be.equal(1);
  });
});

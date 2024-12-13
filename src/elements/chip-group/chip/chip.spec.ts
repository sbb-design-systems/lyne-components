import { assert, expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { fixture } from '../../core/testing/private.js';
import { EventSpy, waitForLitRender } from '../../core/testing.js';

import { SbbChipElement } from './chip.js';

describe('sbb-chip', () => {
  let element: SbbChipElement;

  beforeEach(async () => {
    element = await fixture(html`<sbb-chip></sbb-chip>`);
  });

  it('renders', async () => {
    assert.instanceOf(element, SbbChipElement);
  });

  it('emits on click', async () => {
    const myEventNameSpy = new EventSpy(SbbChipElement.events.myEventName);
    element.click();
    await waitForLitRender(element);
    expect(myEventNameSpy.count).to.be.equal(1);
  });
});

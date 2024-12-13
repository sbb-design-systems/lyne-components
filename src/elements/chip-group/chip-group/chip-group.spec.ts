import { assert, expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { fixture } from '../../core/testing/private.js';
import { EventSpy, waitForLitRender } from '../../core/testing.js';

import { SbbChipGroupElement } from './chip-group.js';

describe('sbb-chip-group', () => {
  let element: SbbChipGroupElement;

  beforeEach(async () => {
    element = await fixture(html`<sbb-chip-group></sbb-chip-group>`);
  });

  it('renders', async () => {
    assert.instanceOf(element, SbbChipGroupElement);
  });

  it('emits on click', async () => {
    const myEventNameSpy = new EventSpy(SbbChipGroupElement.events.myEventName);
    element.click();
    await waitForLitRender(element);
    expect(myEventNameSpy.count).to.be.equal(1);
  });
});

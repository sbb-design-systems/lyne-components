import { assert, expect, fixture } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { EventSpy, waitForLitRender } from '../../core/testing';

import { SbbStepElement } from './step';

describe('sbb-step', () => {
  let element: SbbStepElement;

  beforeEach(async () => {
    element = await fixture(html`<sbb-step></sbb-step>`);
  });

  it('renders', async () => {
    assert.instanceOf(element, SbbStepElement);
  });

  it('emits on click', async () => {
    const myEventNameSpy = new EventSpy(SbbStepElement.events.myEventName);
    element.click();
    await waitForLitRender(element);
    expect(myEventNameSpy.count).to.be.equal(1);
  });
});

import { assert, expect, fixture } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { EventSpy, waitForLitRender } from '../../core/testing';

import { SbbStepLabelElement } from './step-label';

describe('sbb-step-label', () => {
  let element: SbbStepLabelElement;

  beforeEach(async () => {
    element = await fixture(html`<sbb-step-label></sbb-step-label>`);
  });

  it('renders', async () => {
    assert.instanceOf(element, SbbStepLabelElement);
  });

  it('emits on click', async () => {
    const myEventNameSpy = new EventSpy(SbbStepLabelElement.events.myEventName);
    element.click();
    await waitForLitRender(element);
    expect(myEventNameSpy.count).to.be.equal(1);
  });
});

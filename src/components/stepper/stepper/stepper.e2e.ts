import { assert, expect, fixture } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { EventSpy, waitForLitRender } from '../../core/testing';

import { SbbStepperElement } from './stepper';

describe('sbb-stepper', () => {
  let element: SbbStepperElement;

  beforeEach(async () => {
    element = await fixture(html`<sbb-stepper></sbb-stepper>`);
  });

  it('renders', async () => {
    assert.instanceOf(element, SbbStepperElement);
  });

  it('emits on click', async () => {
    const myEventNameSpy = new EventSpy(SbbStepperElement.events.myEventName);
    element.click();
    await waitForLitRender(element);
    expect(myEventNameSpy.count).to.be.equal(1);
  });
});

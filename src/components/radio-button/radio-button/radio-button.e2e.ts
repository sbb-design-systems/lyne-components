import { assert, expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { fixture } from '../../core/testing/private.js';
import { waitForCondition, waitForLitRender, EventSpy } from '../../core/testing.js';

import { SbbRadioButtonElement } from './radio-button.js';

describe(`sbb-radio-button`, () => {
  let element: SbbRadioButtonElement;

  beforeEach(async () => {
    element = await fixture(html`<sbb-radio-button value="Value">Value label</sbb-radio-button>`);
  });

  it('renders', async () => {
    assert.instanceOf(element, SbbRadioButtonElement);
  });

  it('should not render accessibility label about containing state', async () => {
    element = element.shadowRoot!.querySelector('.sbb-screen-reader-only:not(input)')!;
    expect(element).not.to.be.ok;
  });

  it('selects radio on click', async () => {
    const stateChange = new EventSpy(SbbRadioButtonElement.events.stateChange);

    element.click();
    await waitForLitRender(element);

    expect(element).to.have.attribute('checked');
    await waitForCondition(() => stateChange.events.length === 1);
    expect(stateChange.count).to.be.equal(1);
  });

  it('does not deselect radio if already checked', async () => {
    const stateChange = new EventSpy(SbbRadioButtonElement.events.stateChange);

    element.click();
    await waitForLitRender(element);
    expect(element).to.have.attribute('checked');
    await waitForCondition(() => stateChange.events.length === 1);
    expect(stateChange.count).to.be.equal(1);

    element.click();
    await waitForLitRender(element);
    expect(element).to.have.attribute('checked');
    await waitForCondition(() => stateChange.events.length === 1);
    expect(stateChange.count).to.be.equal(1);
  });

  it('allows empty selection', async () => {
    const stateChange = new EventSpy(SbbRadioButtonElement.events.stateChange);

    element.allowEmptySelection = true;
    element.click();
    await waitForLitRender(element);
    expect(element).to.have.attribute('checked');
    await waitForCondition(() => stateChange.events.length === 1);
    expect(stateChange.count).to.be.equal(1);

    element.click();
    await waitForLitRender(element);
    expect(element).not.to.have.attribute('checked');
    await waitForCondition(() => stateChange.events.length === 2);
    expect(stateChange.count).to.be.equal(2);
  });

  it('should convert falsy checked to false', async () => {
    element.checked = true;
    (element.checked as any) = undefined;
    expect(element.checked).to.equal(false);
  });

  it('should convert truthy checked to true', async () => {
    element.checked = true;
    (element.checked as any) = 2;
    expect(element.checked).to.equal(true);
  });
});

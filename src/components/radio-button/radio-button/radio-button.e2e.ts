import { assert, expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { waitForCondition, waitForLitRender, EventSpy, fixture } from '../../core/testing';

import { SbbRadioButtonElement } from './radio-button';

describe(`sbb-radio-button with ${fixture.name}`, () => {
  let element: SbbRadioButtonElement;

  beforeEach(async () => {
    element = await fixture(html`<sbb-radio-button value="Value">Value label</sbb-radio-button>`, {
      modules: ['./radio-button.ts'],
    });
  });

  it('renders', async () => {
    assert.instanceOf(element, SbbRadioButtonElement);
  });

  it('should not render accessibility label about containing state', async () => {
    element = element.shadowRoot!.querySelector('.sbb-screenreader-only:not(input)')!;
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
});

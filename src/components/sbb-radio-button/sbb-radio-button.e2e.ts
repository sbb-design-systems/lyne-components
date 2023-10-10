import { events } from './sbb-radio-button';
import { waitForCondition, waitForLitRender } from '../../global/testing';
import { assert, expect, fixture } from '@open-wc/testing';
import { html } from 'lit/static-html.js';
import { EventSpy } from '../../global/testing/event-spy';
import { SbbRadioButton } from './sbb-radio-button';

describe('sbb-radio-button', () => {
  let element: SbbRadioButton;

  beforeEach(async () => {
    element = await fixture(html`<sbb-radio-button value="Value">Value label</sbb-radio-button>`);
  });

  it('renders', async () => {
    assert.instanceOf(element, SbbRadioButton);
  });

  it('should not render accessibility label about containing state', async () => {
    element = element.shadowRoot.querySelector('.sbb-radio-button__expanded-label');
    expect(element).not.to.be.ok;
  });

  it('selects radio on click', async () => {
    const stateChange = new EventSpy(events.stateChange);

    element.click();
    await waitForLitRender(element);

    expect(element).to.have.attribute('checked');
    await waitForCondition(() => stateChange.events.length === 1);
    expect(stateChange.count).to.be.equal(1);
  });

  it('does not deselect radio if already checked', async () => {
    const stateChange = new EventSpy(events.stateChange);

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
    const stateChange = new EventSpy(events.stateChange);

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

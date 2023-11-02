import { assert, expect, fixture } from '@open-wc/testing';
import { html } from 'lit/static-html.js';
import { EventSpy, waitForCondition, waitForLitRender } from '../core/testing';
import { SbbToggleOption } from './sbb-toggle-option';

describe('sbb-toggle-option', () => {
  let element: SbbToggleOption;

  beforeEach(async () => {
    element = await fixture(html`<sbb-toggle-option value="Value">Value label</sbb-toggle-option>`);
  });

  it('renders', async () => {
    assert.instanceOf(element, SbbToggleOption);
  });

  it('selects the sbb-toggle-option on click', async () => {
    const onInput = new EventSpy('input');

    element.click();
    await waitForLitRender(element);

    expect(element).to.have.attribute('checked');
    await waitForCondition(() => onInput.events.length === 1);
    expect(onInput.count).to.be.equal(1);
  });

  it('does not deselect sbb-toggle-option if already checked', async () => {
    const onInput = new EventSpy('input');

    element.click();
    await waitForLitRender(element);

    expect(element).to.have.attribute('checked');
    await waitForCondition(() => onInput.events.length === 1);
    expect(onInput.count).to.be.equal(1);

    element.click();
    await waitForLitRender(element);

    expect(element).to.have.attribute('checked');
    await waitForCondition(() => onInput.events.length === 1);
    expect(onInput.count).to.be.equal(1);
  });
});

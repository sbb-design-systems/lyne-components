import { assert, expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { fixture } from '../../core/testing/private.ts';
import { waitForLitRender } from '../../core/testing.ts';

import { SbbRadioButtonPanelElement } from './radio-button-panel.component.ts';

describe(`sbb-radio-button-panel`, () => {
  let element: SbbRadioButtonPanelElement;

  beforeEach(async () => {
    element = await fixture(
      html`<sbb-radio-button-panel value="Value">Value label</sbb-radio-button-panel>`,
    );
  });

  it('renders', async () => {
    assert.instanceOf(element, SbbRadioButtonPanelElement);
  });

  it('should not render accessibility label about containing state', async () => {
    element = element.shadowRoot!.querySelector('.sbb-screen-reader-only:not(input)')!;
    expect(element).not.to.be.ok;
  });

  it('selects radio on click', async () => {
    element.click();
    await waitForLitRender(element);

    expect(element.checked).to.be.true;
    expect(element).to.match(':state(checked)');
  });

  it('does not deselect radio if already checked', async () => {
    element.click();
    await waitForLitRender(element);
    expect(element.checked).to.be.true;

    element.click();
    await waitForLitRender(element);
    expect(element.checked).to.be.true;
  });

  it('allows empty selection', async () => {
    element.allowEmptySelection = true;
    element.click();
    await waitForLitRender(element);
    expect(element.checked).to.be.true;

    element.click();
    await waitForLitRender(element);
    expect(element.checked).to.be.false;
  });
});

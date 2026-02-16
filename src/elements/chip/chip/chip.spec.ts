import { assert, expect } from '@open-wc/testing';
import { sendMouse } from '@web/test-runner-commands';
import { html } from 'lit/static-html.js';

import { fixture } from '../../core/testing/private.ts';
import { waitForLitRender } from '../../core/testing.ts';

import { SbbChipElement } from './chip.component.ts';

describe('sbb-chip', () => {
  let element: SbbChipElement;

  beforeEach(async () => {
    element = await fixture(html`<sbb-chip value="value"></sbb-chip>`);
    await waitForLitRender(element);
  });

  it('renders', async () => {
    assert.instanceOf(element, SbbChipElement);
  });

  it('should focus the chip label', async () => {
    element.focus();

    expect(document.activeElement!.localName).to.be.equal('sbb-chip');
  });

  it('should focus the chip label on click', async () => {
    await sendMouse({ type: 'click', position: [element.offsetTop + 10, element.offsetLeft + 10] });
    await waitForLitRender(element);

    expect(document.activeElement!.localName).to.be.equal('sbb-chip');
  });

  it('should ignore click when disabled', async () => {
    element.disabled = true;
    await waitForLitRender(element);
    element.click();

    expect(document.activeElement!.localName).not.to.be.equal('sbb-chip');
  });

  it('should focus on click when readonly', async () => {
    element.readOnly = true;
    await waitForLitRender(element);
    await sendMouse({ type: 'click', position: [element.offsetTop + 10, element.offsetLeft + 10] });

    expect(document.activeElement!.localName).to.be.equal('sbb-chip');
  });
});

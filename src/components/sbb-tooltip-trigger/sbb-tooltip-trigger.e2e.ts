import events from '../sbb-tooltip/sbb-tooltip.events';

import { assert, expect, fixture } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import { html } from 'lit/static-html.js';
import { waitForCondition, waitForLitRender } from '../../global/testing';
import { EventSpy } from '../../global/testing/event-spy';
import '../sbb-tooltip/sbb-tooltip';
import { SbbTooltipTrigger } from './sbb-tooltip-trigger';

describe('sbb-tooltip-trigger', () => {
  let element: SbbTooltipTrigger;

  beforeEach(async () => {
    await fixture(html`
      <sbb-tooltip-trigger id="tooltip-trigger"></sbb-tooltip-trigger>
      <sbb-tooltip id="tooltip" trigger="tooltip-trigger" disable-animation>
        Tooltip content.
        <sbb-link id="tooltip-link" variant="inline" sbb-tooltip-close>Link</sbb-link>
      </sbb-tooltip>
    `);
    element = document.querySelector('sbb-tooltip-trigger');
    await element.updateComplete;
  });

  it('renders', () => {
    assert.instanceOf(element, SbbTooltipTrigger);
  });

  it('shows tooltip on tooltip-trigger click', async () => {
    // NOTE: the ">>>" operator is not supported outside stencil. (convert it to something like "element.shadowRoot.querySelector(...)")
    const dialog = document.querySelector('sbb-tooltip').shadowRoot.querySelector('dialog');
    const willOpenEventSpy = new EventSpy(events.willOpen);
    const didOpenEventSpy = new EventSpy(events.didOpen);

    await element.updateComplete;
    await element.click();

    await element.updateComplete;
    await waitForCondition(() => willOpenEventSpy.events.length === 1);
    expect(willOpenEventSpy.count).to.be.equal(1);

    await element.updateComplete;
    await waitForCondition(() => didOpenEventSpy.events.length === 1);
    expect(didOpenEventSpy.count).to.be.equal(1);

    await element.updateComplete;
    expect(dialog).to.have.attribute('open');
  });

  it("doesn't show tooltip on disabled tooltip-trigger click", async () => {
    // NOTE: the ">>>" operator is not supported outside stencil. (convert it to something like "element.shadowRoot.querySelector(...)")
    const dialog = document.querySelector('sbb-tooltip').shadowRoot.querySelector('dialog');
    const willOpenEventSpy = new EventSpy(events.willOpen);
    element.disabled = true;

    await element.updateComplete;
    await element.click();

    await element.updateComplete;
    await waitForCondition(() => willOpenEventSpy.events.length === 0);
    expect(willOpenEventSpy.count).to.be.equal(0);

    await element.updateComplete;
    expect(dialog).not.to.have.attribute('open');
  });

  it('shows tooltip on keyboard event', async () => {
    const tooltipTrigger = document.querySelector('sbb-tooltip-trigger');
    // NOTE: the ">>>" operator is not supported outside stencil. (convert it to something like "element.shadowRoot.querySelector(...)")
    const dialog = document.querySelector('sbb-tooltip').shadowRoot.querySelector('dialog');
    const changeSpy = new EventSpy('focus', tooltipTrigger);

    await tooltipTrigger.focus();
    await element.updateComplete;
    await waitForCondition(() => changeSpy.events.length === 1);
    expect(changeSpy.count).to.be.equal(1);

    await sendKeys({ down: 'Enter' });
    await element.updateComplete;

    expect(dialog).to.have.attribute('open');
  });

  it('shows tooltip on keyboard event with hover-trigger', async () => {
    const tooltipTrigger = document.querySelector('sbb-tooltip-trigger');
    const tooltip = document.querySelector('sbb-tooltip');
    // NOTE: the ">>>" operator is not supported outside stencil. (convert it to something like "element.shadowRoot.querySelector(...)")
    const dialog = document.querySelector('sbb-tooltip').shadowRoot.querySelector('dialog');
    const changeSpy = new EventSpy('focus', tooltipTrigger);

    tooltip.hoverTrigger = true;
    await element.updateComplete;

    await tooltipTrigger.focus();
    await element.updateComplete;
    await waitForCondition(() => changeSpy.events.length === 1);
    expect(changeSpy.count).to.be.equal(1);

    await sendKeys({ down: 'Enter' });
    await element.updateComplete;

    expect(dialog).to.have.attribute('open');
  });

  it("doesn't focus tooltip-trigger on keyboard event when disabled", async () => {
    const tooltipTrigger = document.querySelector('sbb-tooltip-trigger');
    const tooltip = document.querySelector('sbb-tooltip');
    const dialog = document.querySelector('sbb-tooltip').shadowRoot.querySelector('dialog');
    const changeSpy = new EventSpy('focus', tooltipTrigger);

    tooltipTrigger.disabled = true;
    tooltip.hoverTrigger = true;
    await waitForLitRender(element);

    await sendKeys({ down: 'Tab' });
    await waitForLitRender(element);

    expect(changeSpy.count).not.to.be.greaterThan(0);
    expect(dialog).not.to.have.attribute('open');
  });
});

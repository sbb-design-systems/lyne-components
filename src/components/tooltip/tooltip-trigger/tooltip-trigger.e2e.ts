import { assert, expect, fixture } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import { html } from 'lit/static-html.js';

import { waitForCondition, EventSpy, waitForLitRender } from '../../core/testing';
import { SbbTooltipElement } from '../tooltip';

import { SbbTooltipTriggerElement } from './tooltip-trigger';

describe('sbb-tooltip-trigger', () => {
  let element: SbbTooltipTriggerElement, tooltip: SbbTooltipElement;

  beforeEach(async () => {
    await fixture(html`
      <sbb-tooltip-trigger id="tooltip-trigger"></sbb-tooltip-trigger>
      <sbb-tooltip id="tooltip" trigger="tooltip-trigger" disable-animation>
        Tooltip content.
        <sbb-link id="tooltip-link" variant="inline" sbb-tooltip-close>Link</sbb-link>
      </sbb-tooltip>
    `);
    element = document.querySelector('sbb-tooltip-trigger');
    tooltip = document.querySelector('sbb-tooltip');
  });

  it('renders', () => {
    assert.instanceOf(element, SbbTooltipTriggerElement);
  });

  it('shows tooltip on tooltip-trigger click', async () => {
    const willOpenEventSpy = new EventSpy(SbbTooltipElement.events.willOpen);
    const didOpenEventSpy = new EventSpy(SbbTooltipElement.events.didOpen);

    element.click();

    await waitForCondition(() => willOpenEventSpy.events.length === 1);
    expect(willOpenEventSpy.count).to.be.equal(1);

    await waitForCondition(() => didOpenEventSpy.events.length === 1);
    expect(didOpenEventSpy.count).to.be.equal(1);
    expect(tooltip).to.have.attribute('data-state', 'opened');
  });

  it("doesn't show tooltip on disabled tooltip-trigger click", async () => {
    const willOpenEventSpy = new EventSpy(SbbTooltipElement.events.willOpen);
    element.disabled = true;
    await waitForLitRender(element);

    element.click();
    await waitForLitRender(element);

    expect(willOpenEventSpy.count).to.be.equal(0);
    expect(tooltip).to.have.attribute('data-state', 'closed');
  });

  it('shows tooltip on keyboard event', async () => {
    const focusSpy = new EventSpy('focus', element);

    element.focus();
    await waitForCondition(() => focusSpy.events.length === 1);
    expect(focusSpy.count).to.be.equal(1);

    await sendKeys({ down: 'Enter' });
    await waitForCondition(() => tooltip.getAttribute('data-state') === 'opened');

    expect(tooltip).to.have.attribute('data-state', 'opened');
  });

  it('shows tooltip on keyboard event with hover-trigger', async () => {
    const changeSpy = new EventSpy('focus', element);

    tooltip.hoverTrigger = true;
    element.focus();

    await waitForCondition(() => changeSpy.events.length === 1);
    expect(changeSpy.count).to.be.equal(1);

    await sendKeys({ down: 'Enter' });
    await waitForCondition(() => tooltip.getAttribute('data-state') === 'opened');

    expect(tooltip).to.have.attribute('data-state', 'opened');
  });

  it("doesn't focus tooltip-trigger on keyboard event when disabled", async () => {
    const changeSpy = new EventSpy('focus', element);

    element.disabled = true;
    tooltip.hoverTrigger = true;
    await waitForLitRender(element);

    element.focus();

    expect(changeSpy.count).not.to.be.greaterThan(0);
    expect(tooltip).to.have.attribute('data-state', 'closed');
  });
});

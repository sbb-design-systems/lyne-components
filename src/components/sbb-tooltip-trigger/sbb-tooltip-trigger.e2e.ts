import { assert, expect, fixture } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import { html } from 'lit/static-html.js';
import { waitForCondition } from '../../global/testing';
import { EventSpy } from '../../global/testing/event-spy';
import { SbbTooltip } from '../sbb-tooltip';
import { SbbTooltipTrigger } from './sbb-tooltip-trigger';

describe('sbb-tooltip-trigger', () => {
  let element: SbbTooltipTrigger, tooltip: SbbTooltip;

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
    assert.instanceOf(element, SbbTooltipTrigger);
  });

  it('shows tooltip on tooltip-trigger click', async () => {
    const dialog = tooltip.shadowRoot.querySelector('dialog');
    const willOpenEventSpy = new EventSpy(SbbTooltip.events.willOpen);
    const didOpenEventSpy = new EventSpy(SbbTooltip.events.didOpen);

    element.click();

    await waitForCondition(() => willOpenEventSpy.events.length === 1);
    expect(willOpenEventSpy.count).to.be.equal(1);

    await waitForCondition(() => didOpenEventSpy.events.length === 1);
    expect(didOpenEventSpy.count).to.be.equal(1);
    expect(dialog).to.have.attribute('open');
  });

  it("doesn't show tooltip on disabled tooltip-trigger click", async () => {
    const dialog = tooltip.shadowRoot.querySelector('dialog');
    const willOpenEventSpy = new EventSpy(SbbTooltip.events.willOpen);
    element.disabled = true;
    element.click();

    await waitForCondition(() => willOpenEventSpy.events.length === 0);

    expect(willOpenEventSpy.count).to.be.equal(0);
    expect(dialog).not.to.have.attribute('open');
  });

  it('shows tooltip on keyboard event', async () => {
    const dialog = tooltip.shadowRoot.querySelector('dialog');
    const changeSpy = new EventSpy('focus', element);

    element.focus();
    await waitForCondition(() => changeSpy.events.length === 1);
    expect(changeSpy.count).to.be.equal(1);

    await sendKeys({ down: 'Enter' });

    expect(dialog).to.have.attribute('open');
  });

  it('shows tooltip on keyboard event with hover-trigger', async () => {
    const dialog = tooltip.shadowRoot.querySelector('dialog');
    const changeSpy = new EventSpy('focus', element);

    tooltip.hoverTrigger = true;
    element.focus();

    await waitForCondition(() => changeSpy.events.length === 1);
    expect(changeSpy.count).to.be.equal(1);

    await sendKeys({ down: 'Enter' });

    expect(dialog).to.have.attribute('open');
  });

  it("doesn't focus tooltip-trigger on keyboard event when disabled", async () => {
    const dialog = tooltip.shadowRoot.querySelector('dialog');
    const changeSpy = new EventSpy('focus', element);

    element.disabled = true;
    tooltip.hoverTrigger = true;

    await sendKeys({ down: 'Tab' });

    expect(changeSpy.count).not.to.be.greaterThan(0);
    expect(dialog).not.to.have.attribute('open');
  });
});

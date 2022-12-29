import events from '../sbb-tooltip/sbb-tooltip.events';
import { E2EElement, E2EPage, newE2EPage } from '@stencil/core/testing';

describe('sbb-tooltip-trigger', () => {
  let element: E2EElement, page: E2EPage;

  beforeEach(async () => {
    page = await newE2EPage();
    await page.setContent(`
      <sbb-tooltip-trigger data-testid="tooltip-trigger" id="tooltip-trigger"></sbb-tooltip-trigger>
      <sbb-tooltip id="tooltip" trigger="tooltip-trigger" disable-animation>
        Tooltip content. <sbb-link id="tooltip-link" variant="inline" sbb-tooltip-close>Link</sbb-link>
      </sbb-tooltip> 
    `);
    element = await page.find('sbb-tooltip-trigger');
  });

  it('renders', () => {
    expect(element).toHaveClass('hydrated');
  });

  it('shows tooltip on tooltip-trigger click', async () => {
    const dialog = await page.find('sbb-tooltip >>> dialog');
    const willOpenEventSpy = await page.spyOnEvent(events.willOpen);
    const didOpenEventSpy = await page.spyOnEvent(events.didOpen);

    await element.click();
    await page.waitForChanges();
    expect(willOpenEventSpy).toHaveReceivedEventTimes(1);

    await page.waitForChanges();
    expect(didOpenEventSpy).toHaveReceivedEventTimes(1);

    await page.waitForChanges();
    expect(dialog).toHaveAttribute('open');
  });

  it('shows tooltip on keyboard event', async () => {
    const tooltipTrigger = await page.find('sbb-tooltip-trigger >>> button');
    const dialog = await page.find('sbb-tooltip >>> dialog');
    const changeSpy = await tooltipTrigger.spyOnEvent('focus');

    await tooltipTrigger.focus();
    await page.waitForChanges();
    expect(changeSpy).toHaveReceivedEventTimes(1);

    await page.keyboard.down('Enter');
    await page.waitForChanges();

    expect(dialog).toHaveAttribute('open');
  });
});

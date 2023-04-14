import events from './sbb-tooltip.events';
import { E2EPage, newE2EPage, E2EElement } from '@stencil/core/testing';
import { waitForCondition } from '../../global/helpers/testing/wait-for-condition';

describe('sbb-tooltip', () => {
  let element: E2EElement, trigger: E2EElement, page: E2EPage;

  beforeEach(async () => {
    page = await newE2EPage();
    await page.setContent(`
      <sbb-button id="tooltip-trigger">Tooltip trigger</sbb-button>
      <sbb-tooltip id="tooltip" trigger="tooltip-trigger" disable-animation>
        Tooltip content. <sbb-link id="tooltip-link" variant="inline" sbb-tooltip-close>Link</sbb-link>
      </sbb-tooltip>
    `);
    trigger = await page.find('sbb-button');
    element = await page.find('sbb-tooltip');
  });

  it('renders', () => {
    expect(element).toHaveClass('hydrated');
  });

  it('shows the tooltip', async () => {
    const willOpenEventSpy = await page.spyOnEvent(events.willOpen);
    const didOpenEventSpy = await page.spyOnEvent(events.didOpen);
    const dialog = await page.find('sbb-tooltip >>> dialog');

    await element.callMethod('open');
    await page.waitForChanges();

    await waitForCondition(() => willOpenEventSpy.events.length === 1);
    expect(willOpenEventSpy).toHaveReceivedEventTimes(1);
    await page.waitForChanges();

    await waitForCondition(() => didOpenEventSpy.events.length === 1);
    expect(didOpenEventSpy).toHaveReceivedEventTimes(1);
    await page.waitForChanges();

    expect(dialog).toHaveAttribute('open');
  });

  it('shows on trigger click', async () => {
    const willOpenEventSpy = await page.spyOnEvent(events.willOpen);
    const didOpenEventSpy = await page.spyOnEvent(events.didOpen);
    const dialog = await page.find('sbb-tooltip >>> dialog');

    trigger.triggerEvent('click');
    await page.waitForChanges();

    await waitForCondition(() => willOpenEventSpy.events.length === 1);
    expect(willOpenEventSpy).toHaveReceivedEventTimes(1);
    await page.waitForChanges();

    await waitForCondition(() => didOpenEventSpy.events.length === 1);
    expect(didOpenEventSpy).toHaveReceivedEventTimes(1);
    await page.waitForChanges();

    expect(dialog).toHaveAttribute('open');
  });

  it('closes the tooltip', async () => {
    const willOpenEventSpy = await page.spyOnEvent(events.willOpen);
    const didOpenEventSpy = await page.spyOnEvent(events.didOpen);
    const willCloseEventSpy = await page.spyOnEvent(events.willClose);
    const didCloseEventSpy = await page.spyOnEvent(events.didClose);
    const dialog = await page.find('sbb-tooltip >>> dialog');

    await element.callMethod('open');
    await page.waitForChanges();

    await waitForCondition(() => willOpenEventSpy.events.length === 1);
    expect(willOpenEventSpy).toHaveReceivedEventTimes(1);
    await page.waitForChanges();

    await waitForCondition(() => didOpenEventSpy.events.length === 1);
    expect(didOpenEventSpy).toHaveReceivedEventTimes(1);
    await page.waitForChanges();

    expect(dialog).toHaveAttribute('open');

    await element.callMethod('close');
    await page.waitForChanges();

    await waitForCondition(() => willCloseEventSpy.events.length === 1);
    expect(willCloseEventSpy).toHaveReceivedEventTimes(1);
    await page.waitForChanges();

    await waitForCondition(() => didCloseEventSpy.events.length === 1);
    expect(didCloseEventSpy).toHaveReceivedEventTimes(1);
    await page.waitForChanges();

    expect(dialog).not.toHaveAttribute('open');
  });

  it('closes the tooltip on close button click', async () => {
    const willOpenEventSpy = await page.spyOnEvent(events.willOpen);
    const didOpenEventSpy = await page.spyOnEvent(events.didOpen);
    const willCloseEventSpy = await page.spyOnEvent(events.willClose);
    const didCloseEventSpy = await page.spyOnEvent(events.didClose);
    const dialog = await page.find('sbb-tooltip >>> dialog');
    const closeButton = await page.find('sbb-tooltip >>> .sbb-tooltip__close sbb-button');

    await element.callMethod('open');
    await page.waitForChanges();

    await waitForCondition(() => willOpenEventSpy.events.length === 1);
    expect(willOpenEventSpy).toHaveReceivedEventTimes(1);
    await page.waitForChanges();

    await waitForCondition(() => didOpenEventSpy.events.length === 1);
    expect(didOpenEventSpy).toHaveReceivedEventTimes(1);
    await page.waitForChanges();

    expect(dialog).toHaveAttribute('open');

    await closeButton.click();
    await page.waitForChanges();

    await waitForCondition(() => willCloseEventSpy.events.length === 1);
    expect(willCloseEventSpy).toHaveReceivedEventTimes(1);
    await page.waitForChanges();

    await waitForCondition(() => didCloseEventSpy.events.length === 1);
    expect(didCloseEventSpy).toHaveReceivedEventTimes(1);
    await page.waitForChanges();

    expect(dialog).not.toHaveAttribute('open');
  });

  it('closes on Esc keypress', async () => {
    const willOpenEventSpy = await page.spyOnEvent(events.willOpen);
    const didOpenEventSpy = await page.spyOnEvent(events.didOpen);
    const willCloseEventSpy = await page.spyOnEvent(events.willClose);
    const didCloseEventSpy = await page.spyOnEvent(events.didClose);
    const dialog = await page.find('sbb-tooltip >>> dialog');

    trigger.triggerEvent('click');
    await page.waitForChanges();

    await waitForCondition(() => willOpenEventSpy.events.length === 1);
    expect(willOpenEventSpy).toHaveReceivedEventTimes(1);
    await page.waitForChanges();

    await waitForCondition(() => didOpenEventSpy.events.length === 1);
    expect(didOpenEventSpy).toHaveReceivedEventTimes(1);
    await page.waitForChanges();

    expect(dialog).toHaveAttribute('open');

    await page.keyboard.down('Tab');
    await page.waitForChanges();

    await page.keyboard.down('Escape');
    await page.waitForChanges();

    await waitForCondition(() => willCloseEventSpy.events.length === 1);
    expect(willCloseEventSpy).toHaveReceivedEventTimes(1);
    await page.waitForChanges();

    await waitForCondition(() => didCloseEventSpy.events.length === 1);
    expect(didCloseEventSpy).toHaveReceivedEventTimes(1);
    await page.waitForChanges();

    expect(dialog).not.toHaveAttribute('open');
  });

  it('closes on interactive element click', async () => {
    const willOpenEventSpy = await page.spyOnEvent(events.willOpen);
    const didOpenEventSpy = await page.spyOnEvent(events.didOpen);
    const willCloseEventSpy = await page.spyOnEvent(events.willClose);
    const didCloseEventSpy = await page.spyOnEvent(events.didClose);
    const dialog = await page.find('sbb-tooltip >>> dialog');
    const tooltipLink = await page.find('sbb-tooltip > sbb-link');

    trigger.triggerEvent('click');
    await page.waitForChanges();

    await waitForCondition(() => willOpenEventSpy.events.length === 1);
    expect(willOpenEventSpy).toHaveReceivedEventTimes(1);
    await page.waitForChanges();

    await waitForCondition(() => didOpenEventSpy.events.length === 1);
    expect(didOpenEventSpy).toHaveReceivedEventTimes(1);
    await page.waitForChanges();

    expect(dialog).toHaveAttribute('open');
    expect(tooltipLink).not.toBeNull();

    tooltipLink.triggerEvent('click');
    await page.waitForChanges();

    await waitForCondition(() => willCloseEventSpy.events.length === 1);
    expect(willCloseEventSpy).toHaveReceivedEventTimes(1);
    await page.waitForChanges();

    await waitForCondition(() => didCloseEventSpy.events.length === 1);
    expect(didCloseEventSpy).toHaveReceivedEventTimes(1);
    await page.waitForChanges();

    expect(dialog).not.toHaveAttribute('open');
  });

  it('is correctly positioned on screen', async () => {
    const willOpenEventSpy = await page.spyOnEvent(events.willOpen);
    const didOpenEventSpy = await page.spyOnEvent(events.didOpen);

    await page.setViewport({ width: 1200, height: 800 });
    const dialog = await page.find('sbb-tooltip >>> dialog');

    trigger.triggerEvent('click');
    await page.waitForChanges();

    await waitForCondition(() => willOpenEventSpy.events.length === 1);
    expect(willOpenEventSpy).toHaveReceivedEventTimes(1);
    await page.waitForChanges();

    await waitForCondition(() => didOpenEventSpy.events.length === 1);
    expect(didOpenEventSpy).toHaveReceivedEventTimes(1);
    await page.waitForChanges();

    expect(dialog).toHaveAttribute('open');

    const buttonHeight = await page.evaluate(() =>
      getComputedStyle(document.documentElement).getPropertyValue(
        `--sbb-size-button-l-min-height-large`
      )
    );
    expect(buttonHeight.trim()).toBe('3.5rem');

    const buttonHeightPx = parseFloat(buttonHeight) * 16;
    expect(await page.evaluate(() => document.querySelector('sbb-button').offsetHeight)).toBe(
      buttonHeightPx
    );
    expect(await page.evaluate(() => document.querySelector('sbb-button').offsetTop)).toBe(0);
    expect(await page.evaluate(() => document.querySelector('sbb-button').offsetLeft)).toBe(0);

    // Expect dialog offsetTop to be equal to the trigger height + the dialog offset (8px)
    expect(
      await page.evaluate(
        () => document.querySelector('sbb-tooltip').shadowRoot.querySelector('dialog').offsetTop
      )
    ).toBe(buttonHeightPx + 16);
    expect(
      await page.evaluate(
        () => document.querySelector('sbb-tooltip').shadowRoot.querySelector('dialog').offsetLeft
      )
    ).toBe(0);
  });

  it('sets the focus on the dialog content when the tooltip is opened by click', async () => {
    const willOpenEventSpy = await page.spyOnEvent(events.willOpen);
    const didOpenEventSpy = await page.spyOnEvent(events.didOpen);
    const dialog = await page.find('sbb-tooltip >>> dialog');

    trigger.triggerEvent('click');
    await page.waitForChanges();

    await waitForCondition(() => willOpenEventSpy.events.length === 1);
    expect(willOpenEventSpy).toHaveReceivedEventTimes(1);
    await page.waitForChanges();

    await waitForCondition(() => didOpenEventSpy.events.length === 1);
    expect(didOpenEventSpy).toHaveReceivedEventTimes(1);
    await page.waitForChanges();

    expect(dialog).toHaveAttribute('open');

    await page.waitForChanges();
    expect(
      await page.evaluate(
        () => document.querySelector('sbb-tooltip').shadowRoot.activeElement.className
      )
    ).toBe('sbb-tooltip__content');

    await page.keyboard.down('Tab');
    await page.waitForChanges();

    expect(await page.evaluate(() => document.activeElement.id)).toBe('tooltip-link');
  });

  it('sets the focus to the first focusable element when the tooltip is opened by keyboard', async () => {
    const willOpenEventSpy = await page.spyOnEvent(events.willOpen);
    const didOpenEventSpy = await page.spyOnEvent(events.didOpen);
    const dialog = await page.find('sbb-tooltip >>> dialog');

    await page.keyboard.down('Tab');
    await page.waitForChanges();

    await page.keyboard.down('Enter');
    await page.waitForChanges();

    await waitForCondition(() => willOpenEventSpy.events.length === 1);
    expect(willOpenEventSpy).toHaveReceivedEventTimes(1);
    await page.waitForChanges();

    await waitForCondition(() => didOpenEventSpy.events.length === 1);
    expect(didOpenEventSpy).toHaveReceivedEventTimes(1);
    await page.waitForChanges();

    expect(dialog).toHaveAttribute('open');

    await page.waitForChanges();
    expect(await page.evaluate(() => document.activeElement.id)).toBe('tooltip');
    expect(
      await page.evaluate(
        () =>
          document.activeElement.shadowRoot.activeElement ===
          document.activeElement.shadowRoot.querySelector('[sbb-tooltip-close]')
      )
    ).toBe(true);
  });
});

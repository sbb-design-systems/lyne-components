import events from './sbb-tooltip.events';
import { E2EPage, newE2EPage, E2EElement } from '@stencil/core/testing';
import { waitForCondition } from '../../global/testing';

describe('sbb-tooltip', () => {
  let element: E2EElement, trigger: E2EElement, page: E2EPage;

  beforeEach(async () => {
    page = await newE2EPage();
    await page.setContent(`
      <sbb-button id="tooltip-trigger">Tooltip trigger</sbb-button>
      <sbb-tooltip id="tooltip" trigger="tooltip-trigger" disable-animation>
        Tooltip content. <sbb-link id="tooltip-link" variant="inline" sbb-tooltip-close>Link</sbb-link>
      </sbb-tooltip>
      <sbb-link href="#somewhere" id="interactive-background-element">Other interactive element</sbb-link>
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

    await element.callMethod('open');
    await page.waitForChanges();

    await waitForCondition(() => willOpenEventSpy.events.length === 1);
    expect(willOpenEventSpy).toHaveReceivedEventTimes(1);
    await page.waitForChanges();

    await waitForCondition(() => didOpenEventSpy.events.length === 1);
    expect(didOpenEventSpy).toHaveReceivedEventTimes(1);
    await page.waitForChanges();

    expect(element).toEqualAttribute('data-state', 'opened');
  });

  it('shows on trigger click', async () => {
    const willOpenEventSpy = await page.spyOnEvent(events.willOpen);
    const didOpenEventSpy = await page.spyOnEvent(events.didOpen);

    trigger.triggerEvent('click');
    await page.waitForChanges();

    await waitForCondition(() => willOpenEventSpy.events.length === 1);
    expect(willOpenEventSpy).toHaveReceivedEventTimes(1);
    await page.waitForChanges();

    await waitForCondition(() => didOpenEventSpy.events.length === 1);
    expect(didOpenEventSpy).toHaveReceivedEventTimes(1);
    await page.waitForChanges();

    expect(element).toEqualAttribute('data-state', 'opened');
  });

  it('closes the tooltip', async () => {
    const willOpenEventSpy = await page.spyOnEvent(events.willOpen);
    const didOpenEventSpy = await page.spyOnEvent(events.didOpen);
    const willCloseEventSpy = await page.spyOnEvent(events.willClose);
    const didCloseEventSpy = await page.spyOnEvent(events.didClose);

    await element.callMethod('open');
    await page.waitForChanges();

    await waitForCondition(() => willOpenEventSpy.events.length === 1);
    expect(willOpenEventSpy).toHaveReceivedEventTimes(1);
    await page.waitForChanges();

    await waitForCondition(() => didOpenEventSpy.events.length === 1);
    expect(didOpenEventSpy).toHaveReceivedEventTimes(1);
    await page.waitForChanges();

    expect(element).toEqualAttribute('data-state', 'opened');

    await element.callMethod('close');
    await page.waitForChanges();

    await waitForCondition(() => willCloseEventSpy.events.length === 1);
    expect(willCloseEventSpy).toHaveReceivedEventTimes(1);
    await page.waitForChanges();

    await waitForCondition(() => didCloseEventSpy.events.length === 1);
    expect(didCloseEventSpy).toHaveReceivedEventTimes(1);
    await page.waitForChanges();

    expect(element).toEqualAttribute('data-state', 'closed');
  });

  it('closes the tooltip on close button click', async () => {
    const willOpenEventSpy = await page.spyOnEvent(events.willOpen);
    const didOpenEventSpy = await page.spyOnEvent(events.didOpen);
    const willCloseEventSpy = await page.spyOnEvent(events.willClose);
    const didCloseEventSpy = await page.spyOnEvent(events.didClose);
    const closeButton = await page.find('sbb-tooltip >>> [sbb-tooltip-close]');

    await element.callMethod('open');
    await page.waitForChanges();

    await waitForCondition(() => willOpenEventSpy.events.length === 1);
    expect(willOpenEventSpy).toHaveReceivedEventTimes(1);
    await page.waitForChanges();

    await waitForCondition(() => didOpenEventSpy.events.length === 1);
    expect(didOpenEventSpy).toHaveReceivedEventTimes(1);
    await page.waitForChanges();

    expect(element).toEqualAttribute('data-state', 'opened');

    await closeButton.click();
    await page.waitForChanges();

    await waitForCondition(() => willCloseEventSpy.events.length === 1);
    expect(willCloseEventSpy).toHaveReceivedEventTimes(1);
    await page.waitForChanges();

    await waitForCondition(() => didCloseEventSpy.events.length === 1);
    expect(didCloseEventSpy).toHaveReceivedEventTimes(1);
    await page.waitForChanges();

    expect(element).toEqualAttribute('data-state', 'closed');
    expect(trigger).toEqualAttribute('data-focus-origin', 'mouse');
    expect(await page.evaluate(() => document.activeElement.id)).toBe('tooltip-trigger');
  });

  it('closes the tooltip on close button click by keyboard', async () => {
    const didOpenEventSpy = await page.spyOnEvent(events.didOpen);
    const didCloseEventSpy = await page.spyOnEvent(events.didClose);
    const closeButton = await page.find('sbb-tooltip >>> [sbb-tooltip-close]');

    await element.callMethod('open');
    await page.waitForChanges();

    await waitForCondition(() => didOpenEventSpy.events.length === 1);
    expect(didOpenEventSpy).toHaveReceivedEventTimes(1);
    await page.waitForChanges();

    await closeButton.focus();
    await page.keyboard.down('Enter');
    await page.waitForChanges();

    await waitForCondition(() => didCloseEventSpy.events.length === 1);
    expect(didCloseEventSpy).toHaveReceivedEventTimes(1);
    await page.waitForChanges();

    expect(trigger).toEqualAttribute('data-focus-origin', 'keyboard');
    expect(await page.evaluate(() => document.activeElement.id)).toBe('tooltip-trigger');
  });

  it('closes on Esc keypress', async () => {
    const willOpenEventSpy = await page.spyOnEvent(events.willOpen);
    const didOpenEventSpy = await page.spyOnEvent(events.didOpen);
    const willCloseEventSpy = await page.spyOnEvent(events.willClose);
    const didCloseEventSpy = await page.spyOnEvent(events.didClose);

    trigger.triggerEvent('click');
    await page.waitForChanges();

    await waitForCondition(() => willOpenEventSpy.events.length === 1);
    expect(willOpenEventSpy).toHaveReceivedEventTimes(1);
    await page.waitForChanges();

    await waitForCondition(() => didOpenEventSpy.events.length === 1);
    expect(didOpenEventSpy).toHaveReceivedEventTimes(1);
    await page.waitForChanges();

    expect(element).toEqualAttribute('data-state', 'opened');

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

    expect(element).toEqualAttribute('data-state', 'closed');
    expect(trigger).toEqualAttribute('data-focus-origin', 'keyboard');
    expect(await page.evaluate(() => document.activeElement.id)).toBe('tooltip-trigger');
  });

  it('closes on interactive element click', async () => {
    const willOpenEventSpy = await page.spyOnEvent(events.willOpen);
    const didOpenEventSpy = await page.spyOnEvent(events.didOpen);
    const willCloseEventSpy = await page.spyOnEvent(events.willClose);
    const didCloseEventSpy = await page.spyOnEvent(events.didClose);
    const tooltipLink = await page.find('sbb-tooltip > sbb-link');

    await trigger.triggerEvent('click');
    await page.waitForChanges();

    await waitForCondition(() => willOpenEventSpy.events.length === 1);
    expect(willOpenEventSpy).toHaveReceivedEventTimes(1);
    await page.waitForChanges();

    await waitForCondition(() => didOpenEventSpy.events.length === 1);
    expect(didOpenEventSpy).toHaveReceivedEventTimes(1);
    await page.waitForChanges();

    expect(element).toEqualAttribute('data-state', 'opened');
    expect(tooltipLink).not.toBeNull();

    await tooltipLink.click();
    await page.waitForChanges();

    await waitForCondition(() => willCloseEventSpy.events.length === 1);
    expect(willCloseEventSpy).toHaveReceivedEventTimes(1);
    await page.waitForChanges();

    await waitForCondition(() => didCloseEventSpy.events.length === 1);
    expect(didCloseEventSpy).toHaveReceivedEventTimes(1);
    await page.waitForChanges();

    expect(element).toEqualAttribute('data-state', 'closed');
    expect(trigger).toEqualAttribute('data-focus-origin', 'mouse');
    expect(await page.evaluate(() => document.activeElement.id)).toBe('tooltip-trigger');
  });

  it('closes on interactive element click by keyboard', async () => {
    const didOpenEventSpy = await page.spyOnEvent(events.didOpen);
    const didCloseEventSpy = await page.spyOnEvent(events.didClose);
    const tooltipLink = await page.find('sbb-tooltip > sbb-link');

    await trigger.triggerEvent('click');
    await page.waitForChanges();

    await waitForCondition(() => didOpenEventSpy.events.length === 1);
    expect(didOpenEventSpy).toHaveReceivedEventTimes(1);
    await page.waitForChanges();

    expect(tooltipLink).not.toBeNull();

    await tooltipLink.focus();
    await page.keyboard.down('Enter');
    await page.waitForChanges();

    await waitForCondition(() => didCloseEventSpy.events.length === 1);
    expect(didCloseEventSpy).toHaveReceivedEventTimes(1);
    await page.waitForChanges();

    expect(trigger).toEqualAttribute('data-focus-origin', 'keyboard');
    expect(await page.evaluate(() => document.activeElement.id)).toBe('tooltip-trigger');
  });

  it('is correctly positioned on screen', async () => {
    const willOpenEventSpy = await page.spyOnEvent(events.willOpen);
    const didOpenEventSpy = await page.spyOnEvent(events.didOpen);

    await page.setViewport({ width: 1200, height: 800 });

    trigger.triggerEvent('click');
    await page.waitForChanges();

    await waitForCondition(() => willOpenEventSpy.events.length === 1);
    expect(willOpenEventSpy).toHaveReceivedEventTimes(1);
    await page.waitForChanges();

    await waitForCondition(() => didOpenEventSpy.events.length === 1);
    expect(didOpenEventSpy).toHaveReceivedEventTimes(1);
    await page.waitForChanges();

    expect(element).toEqualAttribute('data-state', 'opened');

    const buttonHeight = await page.evaluate(() =>
      getComputedStyle(document.documentElement).getPropertyValue(
        `--sbb-size-button-l-min-height-large`,
      ),
    );
    expect(buttonHeight.trim()).toBe('3.5rem');

    const buttonHeightPx = parseFloat(buttonHeight) * 16;
    expect(await page.evaluate(() => document.querySelector('sbb-button').offsetHeight)).toBe(
      buttonHeightPx,
    );
    expect(await page.evaluate(() => document.querySelector('sbb-button').offsetTop)).toBe(0);
    expect(await page.evaluate(() => document.querySelector('sbb-button').offsetLeft)).toBe(0);

    // Expect overlay offsetTop to be equal to the trigger height + the overlay offset (8px)
    expect(
      await page.evaluate(
        () =>
          (
            document
              .querySelector('sbb-tooltip')
              .shadowRoot.querySelector('.sbb-tooltip') as HTMLElement
          ).offsetTop,
      ),
    ).toBe(buttonHeightPx + 16);
    expect(
      await page.evaluate(
        () =>
          (
            document
              .querySelector('sbb-tooltip')
              .shadowRoot.querySelector('.sbb-tooltip') as HTMLElement
          ).offsetLeft,
      ),
    ).toBe(0);
  });

  it('sets the focus to the first focusable element when the tooltip is opened', async () => {
    const willOpenEventSpy = await page.spyOnEvent(events.willOpen);
    const didOpenEventSpy = await page.spyOnEvent(events.didOpen);

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

    expect(element).toEqualAttribute('data-state', 'opened');

    await page.waitForChanges();
    expect(await page.evaluate(() => document.activeElement.id)).toBe('tooltip');
    expect(
      await page.evaluate(
        () =>
          document.activeElement.shadowRoot.activeElement ===
          document.activeElement.shadowRoot.querySelector('[sbb-tooltip-close]'),
      ),
    ).toBe(true);
  });

  it('should set correct focus attribute on trigger after backdrop click', async () => {
    const didOpenEventSpy = await page.spyOnEvent(events.didOpen);
    const didCloseEventSpy = await page.spyOnEvent(events.didClose);

    await element.callMethod('open');
    await page.waitForChanges();

    await waitForCondition(() => didOpenEventSpy.events.length === 1);
    await page.waitForChanges();

    // Simulate backdrop click
    await page.evaluate(() =>
      document.dispatchEvent(new MouseEvent('mousedown', { buttons: 1, clientX: 1 })),
    );
    await page.evaluate(() => window.dispatchEvent(new PointerEvent('pointerup')));

    await waitForCondition(() => didCloseEventSpy.events.length === 1);
    await page.waitForChanges();

    expect(trigger).toEqualAttribute('data-focus-origin', 'mouse');
    expect(await page.evaluate(() => document.activeElement.id)).toBe('tooltip-trigger');
  });

  it('should set correct focus attribute on trigger after backdrop click on an interactive element', async () => {
    const interactiveBackgroundElement = await page.find('#interactive-background-element');
    const didOpenEventSpy = await page.spyOnEvent(events.didOpen);
    const didCloseEventSpy = await page.spyOnEvent(events.didClose);

    await element.callMethod('open');
    await page.waitForChanges();

    await waitForCondition(() => didOpenEventSpy.events.length === 1);
    await page.waitForChanges();

    await interactiveBackgroundElement.click();
    await page.waitForChanges();

    await waitForCondition(() => didCloseEventSpy.events.length === 1);
    await page.waitForChanges();

    expect(await page.evaluate(() => document.activeElement.id)).toBe(
      'interactive-background-element',
    );
  });

  it('should close an open tooltip when another one is opened', async () => {
    page = await newE2EPage();
    await page.setContent(`
      <sbb-button id="tooltip-trigger">Tooltip trigger</sbb-button>
      <sbb-button id="another-tooltip-trigger">Another tooltip trigger</sbb-button>
      <sbb-tooltip id="tooltip" trigger="tooltip-trigger" disable-animation>
        Tooltip content.
      </sbb-tooltip>
      <sbb-tooltip id="another-tooltip" trigger="another-tooltip-trigger" disable-animation>
        Another tooltip content.
      </sbb-tooltip>
      <sbb-link href="#somewhere" id="interactive-background-element">Other interactive element</sbb-link>
    `);
    trigger = await page.find('#tooltip-trigger');
    const secondTrigger = await page.find('#another-tooltip-trigger');
    element = await page.find('#tooltip');
    const secondElement = await page.find('#another-tooltip');

    const willOpenEventSpy = await page.spyOnEvent(events.didOpen);
    const didOpenEventSpy = await page.spyOnEvent(events.didOpen);
    const willCloseEventSpy = await page.spyOnEvent(events.didClose);
    const didCloseEventSpy = await page.spyOnEvent(events.didClose);

    expect(secondTrigger).not.toBeNull();
    expect(secondElement).not.toBeNull();

    await trigger.focus();
    await trigger.press('Space');
    await page.waitForChanges();

    await waitForCondition(() => willOpenEventSpy.events.length === 1);
    expect(willOpenEventSpy).toHaveReceivedEventTimes(1);
    await page.waitForChanges();

    await waitForCondition(() => didOpenEventSpy.events.length === 1);
    expect(didOpenEventSpy).toHaveReceivedEventTimes(1);
    await page.waitForChanges();

    expect(element).toEqualAttribute('data-state', 'opened');
    await trigger.press('Tab');
    expect(await page.evaluate(() => document.activeElement.id)).toBe('another-tooltip-trigger');

    await page.keyboard.down('Enter');

    await waitForCondition(() => willCloseEventSpy.events.length === 1);
    expect(willCloseEventSpy).toHaveReceivedEventTimes(1);
    await page.waitForChanges();

    await waitForCondition(() => didCloseEventSpy.events.length === 1);
    expect(didCloseEventSpy).toHaveReceivedEventTimes(1);
    await page.waitForChanges();

    expect(element).toEqualAttribute('data-state', 'closed');

    await waitForCondition(() => willOpenEventSpy.events.length === 2);
    expect(willOpenEventSpy).toHaveReceivedEventTimes(2);
    await page.waitForChanges();

    await waitForCondition(() => didOpenEventSpy.events.length === 2);
    expect(didOpenEventSpy).toHaveReceivedEventTimes(2);
    await page.waitForChanges();

    expect(secondElement).toEqualAttribute('data-state', 'opened');
  });
});

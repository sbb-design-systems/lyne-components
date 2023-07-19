import events from './sbb-menu.events';
import { E2EPage, newE2EPage, E2EElement } from '@stencil/core/testing';
import { waitForCondition } from '../../global/testing';

describe('sbb-menu', () => {
  let element: E2EElement, trigger: E2EElement, page: E2EPage;

  beforeEach(async () => {
    page = await newE2EPage();
    await page.setContent(`
      <sbb-button id="menu-trigger">Menu trigger</sbb-button>
      <sbb-menu id="menu" trigger="menu-trigger" disable-animation>
        <sbb-link id="menu-link" href="https://www.sbb.ch/en" size="xs" variant="block" target="_blank">Profile</sbb-link>
        <sbb-menu-action id="menu-action-1" icon="tick-small">View</sbb-menu-action>
        <sbb-menu-action id="menu-action-2" icon="pen-small" amount="1" disabled>Edit</sbb-menu-action>
        <sbb-menu-action id="menu-action-3" icon="swisspass-small" amount="2">Details</sbb-menu-action>
        <sbb-divider id="menu-divider" />
        <sbb-menu-action id="menu-action-4" icon="cross-small">Cancel</sbb-menu-action>
      </sbb-menu>
    `);
    trigger = await page.find('sbb-button');
    element = await page.find('sbb-menu');
  });

  it('renders', () => {
    expect(element).toHaveClass('hydrated');
  });

  it('opens on trigger click', async () => {
    const dialog = await page.find('sbb-menu >>> dialog');
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
    expect(dialog).toHaveAttribute('open');
  });

  it('closes on Esc keypress', async () => {
    const willOpenEventSpy = await page.spyOnEvent(events.willOpen);
    const didOpenEventSpy = await page.spyOnEvent(events.didOpen);
    const willCloseEventSpy = await page.spyOnEvent(events.willClose);
    const didCloseEventSpy = await page.spyOnEvent(events.didClose);
    const dialog = await page.find('sbb-menu >>> dialog');

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

  it('closes on menu action click', async () => {
    const willOpenEventSpy = await page.spyOnEvent(events.willOpen);
    const didOpenEventSpy = await page.spyOnEvent(events.didOpen);
    const willCloseEventSpy = await page.spyOnEvent(events.willClose);
    const didCloseEventSpy = await page.spyOnEvent(events.didClose);
    const dialog = await page.find('sbb-menu >>> dialog');
    const menuAction = await page.find('sbb-menu > sbb-menu-action');

    trigger.triggerEvent('click');
    await page.waitForChanges();

    await waitForCondition(() => willOpenEventSpy.events.length === 1);
    expect(willOpenEventSpy).toHaveReceivedEventTimes(1);
    await page.waitForChanges();

    await waitForCondition(() => didOpenEventSpy.events.length === 1);
    expect(didOpenEventSpy).toHaveReceivedEventTimes(1);
    await page.waitForChanges();

    expect(dialog).toHaveAttribute('open');
    expect(menuAction).not.toBeNull();

    menuAction.triggerEvent('click');
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
    const dialog = await page.find('sbb-menu >>> dialog');
    const menuLink = await page.find('sbb-menu > sbb-link');

    trigger.triggerEvent('click');
    await page.waitForChanges();

    await waitForCondition(() => willOpenEventSpy.events.length === 1);
    expect(willOpenEventSpy).toHaveReceivedEventTimes(1);
    await page.waitForChanges();

    await waitForCondition(() => didOpenEventSpy.events.length === 1);
    expect(didOpenEventSpy).toHaveReceivedEventTimes(1);
    await page.waitForChanges();

    expect(dialog).toHaveAttribute('open');
    expect(menuLink).not.toBeNull();

    menuLink.triggerEvent('click');
    await page.waitForChanges();

    await waitForCondition(() => willCloseEventSpy.events.length === 1);
    expect(willCloseEventSpy).toHaveReceivedEventTimes(1);
    await page.waitForChanges();

    await waitForCondition(() => didCloseEventSpy.events.length === 1);
    expect(didCloseEventSpy).toHaveReceivedEventTimes(1);
    await page.waitForChanges();

    expect(dialog).not.toHaveAttribute('open');
  });

  it('is correctly positioned on desktop', async () => {
    const willOpenEventSpy = await page.spyOnEvent(events.willOpen);
    const didOpenEventSpy = await page.spyOnEvent(events.didOpen);
    await page.setViewport({ width: 1200, height: 800 });
    const dialog = await page.find('sbb-menu >>> dialog');

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

    // Expect dialog offsetTop to be equal to the trigger height + the dialog offset (8px)
    expect(
      await page.evaluate(
        () => document.querySelector('sbb-menu').shadowRoot.querySelector('dialog').offsetTop,
      ),
    ).toBe(buttonHeightPx + 8);
    expect(
      await page.evaluate(
        () => document.querySelector('sbb-menu').shadowRoot.querySelector('dialog').offsetLeft,
      ),
    ).toBe(0);
  });

  it('is correctly positioned on mobile', async () => {
    const willOpenEventSpy = await page.spyOnEvent(events.willOpen);
    const didOpenEventSpy = await page.spyOnEvent(events.didOpen);

    await page.setViewport({ width: 800, height: 600 });
    const dialog = await page.find('sbb-menu >>> dialog');

    trigger.triggerEvent('click');
    await page.waitForChanges();

    await waitForCondition(() => willOpenEventSpy.events.length === 1);
    expect(willOpenEventSpy).toHaveReceivedEventTimes(1);
    await page.waitForChanges();

    await waitForCondition(() => didOpenEventSpy.events.length === 1);
    expect(didOpenEventSpy).toHaveReceivedEventTimes(1);
    await page.waitForChanges();

    expect(dialog).toHaveAttribute('open');

    const menuOffsetTop = await page.evaluate(
      () => document.querySelector('sbb-menu').shadowRoot.querySelector('dialog').offsetTop,
    );
    const menuHeight = await page.evaluate(
      () => document.querySelector('sbb-menu').shadowRoot.querySelector('dialog').offsetHeight,
    );
    const pageHeight = await page.evaluate(() => window.innerHeight);

    expect(menuOffsetTop).toBe(pageHeight - menuHeight);
  });

  it('sets the focus on the dialog content when the menu is opened by click', async () => {
    const willOpenEventSpy = await page.spyOnEvent(events.willOpen);
    const didOpenEventSpy = await page.spyOnEvent(events.didOpen);
    const dialog = await page.find('sbb-menu >>> dialog');

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
        () => document.querySelector('sbb-menu').shadowRoot.activeElement.className,
      ),
    ).toBe('sbb-menu__content');

    await page.keyboard.down('Tab');
    await page.waitForChanges();

    expect(await page.evaluate(() => document.activeElement.id)).toBe('menu-link');
  });

  it('sets the focus to the first focusable element when the menu is opened by keyboard', async () => {
    const willOpenEventSpy = await page.spyOnEvent(events.willOpen);
    const didOpenEventSpy = await page.spyOnEvent(events.didOpen);
    const dialog = await page.find('sbb-menu >>> dialog');

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
    expect(await page.evaluate(() => document.activeElement.id)).toBe('menu-link');
  });
});

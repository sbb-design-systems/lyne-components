import events from './sbb-menu.events';
import { E2EPage, newE2EPage, E2EElement } from '@stencil/core/testing';

describe('sbb-menu', () => {
  let element: E2EElement, trigger: E2EElement, page: E2EPage;

  beforeEach(async () => {
    page = await newE2EPage();
    await page.setContent(`
      <sbb-button id="menu-trigger" label="Menu trigger"></sbb-button>
      <sbb-menu trigger="menu-trigger">
        <sbb-link href="https://www.sbb.ch/en" text-size="xs" variant="block" target="_blank">Profile</sbb-link>
        <sbb-menu-action icon="tick-small">View</sbb-menu-action>
        <sbb-menu-action icon="pen-small" amount="1" disabled>Edit</sbb-menu-action>
        <sbb-menu-action icon="swisspass-small" amount="2">Details</sbb-menu-action>
        <sbb-divider />
        <sbb-menu-action icon="cross-small">Cancel</sbb-menu-action>
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
    const willOpenEventSpy = await page.spyOnEvent(events.willPresent);
    const didOpenEventSpy = await page.spyOnEvent(events.didPresent);

    await trigger.click();
    await page.waitForChanges();
    expect(willOpenEventSpy).toHaveReceivedEventTimes(1);

    await page.waitForChanges();
    expect(didOpenEventSpy).toHaveReceivedEventTimes(1);

    await page.waitForChanges();
    expect(dialog).toHaveAttribute('open');
  });

  it('closes on menu action click', async () => {
    const willCloseEventSpy = await page.spyOnEvent(events.willDismiss);
    const didCloseEventSpy = await page.spyOnEvent(events.didDismiss);
    const dialog = await page.find('sbb-menu >>> dialog');
    const menuAction = await page.find('sbb-menu > sbb-menu-action');

    await trigger.click();
    await page.waitForChanges();
    expect(dialog).toHaveAttribute('open');
    expect(menuAction).not.toBeNull();

    await menuAction.click();
    await page.waitForChanges();
    expect(willCloseEventSpy).toHaveReceivedEventTimes(1);

    await page.waitForChanges();
    expect(didCloseEventSpy).toHaveReceivedEventTimes(1);

    await page.waitForChanges();
    expect(dialog).not.toHaveAttribute('open');
  });

  it('closes on interactive element click', async () => {
    const willCloseEventSpy = await page.spyOnEvent(events.willDismiss);
    const didCloseEventSpy = await page.spyOnEvent(events.didDismiss);
    const dialog = await page.find('sbb-menu >>> dialog');
    const menuLink = await page.find('sbb-menu > sbb-link');

    await trigger.click();
    await page.waitForChanges();
    expect(dialog).toHaveAttribute('open');
    expect(menuLink).not.toBeNull();

    await menuLink.click();
    await page.waitForChanges();
    expect(willCloseEventSpy).toHaveReceivedEventTimes(1);

    await page.waitForChanges();
    expect(didCloseEventSpy).toHaveReceivedEventTimes(1);
    expect(dialog).not.toHaveAttribute('open');
  });

  it('closes on Esc keypress', async () => {
    const dialog = await page.find('sbb-menu >>> dialog');

    await trigger.click();
    await page.waitForChanges();
    expect(dialog).toHaveAttribute('open');

    await page.keyboard.down('Escape');
    await page.waitForChanges();

    expect(dialog).not.toHaveAttribute('open');
  });

  // Test focusing first element (or not focusing some cases)
  // Test keyboard navigation
  // Test positioning     expect(
  //       await page.evaluate(() => document.querySelector('sbb-menu').shadowRoot.querySelector('dialog').offsetTop)
  //     ).toBe(-1);
});

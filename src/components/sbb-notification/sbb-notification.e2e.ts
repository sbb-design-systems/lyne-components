import { waitForCondition } from '../../global/helpers/testing/wait-for-condition';
import events from './sbb-notification.events';
import { E2EElement, E2EPage, newE2EPage } from '@stencil/core/testing';

describe('sbb-notification', () => {
  let element: E2EElement, page: E2EPage;

  beforeEach(async () => {
    page = await newE2EPage();
    await page.setContent(`
      <sbb-notification id="notification" disable-animation>
        The quick brown fox jumps over the lazy dog. The quick brown fox jumps over the lazy dog.
        <sbb-link href="/" variant="inline">Link one</sbb-link>
      </sbb-notification>
    `);
    element = await page.find('sbb-notification');
  });

  it('renders', async () => {
    expect(element).toHaveClass('hydrated');
  });

  it('closes the notification and removes it from the DOM', async () => {
    const willCloseEventSpy = await page.spyOnEvent(events.willClose);
    const didCloseEventSpy = await page.spyOnEvent(events.didClose);

    expect(element).not.toBeNull();
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

    element = await page.find('sbb-notification');
    expect(element).toBeNull();
  });

  it('closes the notification and removes it from the DOM on close button click', async () => {
    const willCloseEventSpy = await page.spyOnEvent(events.willClose);
    const didCloseEventSpy = await page.spyOnEvent(events.didClose);
    const closeButton = await page.find('sbb-notification >>> .sbb-notification__close');

    expect(element).not.toBeNull();
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

    element = await page.find('sbb-notification');
    expect(element).toBeNull();
  });

  it('closes the notification and removes it from the DOM on close button click by keyboard', async () => {
    const willCloseEventSpy = await page.spyOnEvent(events.willClose);
    const didCloseEventSpy = await page.spyOnEvent(events.didClose);
    const closeButton = await page.find('sbb-notification >>> .sbb-notification__close');

    expect(element).not.toBeNull();
    expect(element).toEqualAttribute('data-state', 'opened');

    await closeButton.focus();
    await page.keyboard.down('Enter');
    await page.waitForChanges();

    await waitForCondition(() => willCloseEventSpy.events.length === 1);
    expect(willCloseEventSpy).toHaveReceivedEventTimes(1);
    await page.waitForChanges();

    await waitForCondition(() => didCloseEventSpy.events.length === 1);
    expect(didCloseEventSpy).toHaveReceivedEventTimes(1);
    await page.waitForChanges();

    expect(element).toEqualAttribute('data-state', 'closed');

    element = await page.find('sbb-notification');
    expect(element).toBeNull();
  });
});

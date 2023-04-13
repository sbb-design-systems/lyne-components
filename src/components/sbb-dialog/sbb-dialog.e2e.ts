import { E2EElement, E2EPage, newE2EPage } from '@stencil/core/testing';
import events from './sbb-dialog.events';
import { waitForCondition } from '../../global/helpers/testing/wait-for-condition';

describe('sbb-dialog', () => {
  let element: E2EElement, page: E2EPage;

  beforeEach(async () => {
    page = await newE2EPage();
    await page.setContent(`
      <sbb-dialog id="my-dialog" title-content="Title" title-back-button="true" disable-animation>
        Dialog content.
        <div slot="action-group">Action group</div>
      </sbb-dialog>
    `);
    element = await page.find('sbb-dialog');
    await page.waitForChanges();
  });

  it('renders', () => {
    expect(element).toHaveClass('hydrated');
  });

  it('opens the dialog', async () => {
    const dialog = await page.find('sbb-dialog >>> dialog');
    const willOpen = await page.spyOnEvent(events.willOpen);
    const didOpen = await page.spyOnEvent(events.didOpen);

    await element.callMethod('open');
    await page.waitForChanges();

    await waitForCondition(() => willOpen.events.length === 1);
    expect(willOpen).toHaveReceivedEventTimes(1);
    await page.waitForChanges();

    await waitForCondition(() => didOpen.events.length === 1);
    expect(didOpen).toHaveReceivedEventTimes(1);
    await page.waitForChanges();

    expect(element).toEqualAttribute('data-state', 'opened');
    expect(dialog).toHaveAttribute('open');
  });

  it('closes the dialog', async () => {
    const willOpen = await page.spyOnEvent(events.willOpen);
    const didOpen = await page.spyOnEvent(events.didOpen);
    const willClose = await page.spyOnEvent(events.willClose);
    const didClose = await page.spyOnEvent(events.didClose);
    const dialog = await page.find('sbb-dialog >>> dialog');

    await element.callMethod('open');
    await page.waitForChanges();

    await waitForCondition(() => willOpen.events.length === 1);
    expect(willOpen).toHaveReceivedEventTimes(1);
    await page.waitForChanges();

    await waitForCondition(() => didOpen.events.length === 1);
    expect(didOpen).toHaveReceivedEventTimes(1);
    await page.waitForChanges();

    expect(dialog).toHaveAttribute('open');

    await element.callMethod('close');
    await page.waitForChanges();

    await waitForCondition(() => willClose.events.length === 1);
    expect(willClose).toHaveReceivedEventTimes(1);
    await page.waitForChanges();

    await waitForCondition(() => didClose.events.length === 1);
    expect(didClose).toHaveReceivedEventTimes(1);
    await page.waitForChanges();

    expect(element).toEqualAttribute('data-state', 'closed');
    expect(dialog).not.toHaveAttribute('open');
  });

  it('closes the dialog on close button click', async () => {
    const dialog = await page.find('sbb-dialog >>> dialog');
    const closeButton = await page.find('sbb-dialog >>> [sbb-dialog-close]');
    const willOpen = await page.spyOnEvent(events.willOpen);
    const didOpen = await page.spyOnEvent(events.didOpen);
    const willClose = await page.spyOnEvent(events.willClose);
    const didClose = await page.spyOnEvent(events.didClose);

    await element.callMethod('open');
    await page.waitForChanges();

    await waitForCondition(() => willOpen.events.length === 1);
    expect(willOpen).toHaveReceivedEventTimes(1);
    await page.waitForChanges();

    await waitForCondition(() => didOpen.events.length === 1);
    expect(didOpen).toHaveReceivedEventTimes(1);
    await page.waitForChanges();

    expect(dialog).toHaveAttribute('open');

    closeButton.triggerEvent('click');
    await page.waitForChanges();

    await waitForCondition(() => willClose.events.length === 1);
    expect(willClose).toHaveReceivedEventTimes(1);
    await page.waitForChanges();

    await waitForCondition(() => didClose.events.length === 1);
    expect(didClose).toHaveReceivedEventTimes(1);
    await page.waitForChanges();

    expect(dialog).not.toHaveAttribute('open');
  });

  it('closes the dialog on Esc key press', async () => {
    const dialog = await page.find('sbb-dialog >>> dialog');
    const willOpen = await page.spyOnEvent(events.willOpen);
    const didOpen = await page.spyOnEvent(events.didOpen);
    const willClose = await page.spyOnEvent(events.willClose);
    const didClose = await page.spyOnEvent(events.didClose);

    await element.callMethod('open');
    await page.waitForChanges();

    await waitForCondition(() => willOpen.events.length === 1);
    expect(willOpen).toHaveReceivedEventTimes(1);
    await page.waitForChanges();

    await waitForCondition(() => didOpen.events.length === 1);
    expect(didOpen).toHaveReceivedEventTimes(1);
    await page.waitForChanges();

    expect(dialog).toHaveAttribute('open');

    await page.keyboard.down('Tab');
    await page.waitForChanges();

    await page.keyboard.down('Escape');
    await page.waitForChanges();

    await waitForCondition(() => willClose.events.length === 1);
    expect(willClose).toHaveReceivedEventTimes(1);
    await page.waitForChanges();

    await waitForCondition(() => didClose.events.length === 1);
    expect(didClose).toHaveReceivedEventTimes(1);
    await page.waitForChanges();

    expect(dialog).not.toHaveAttribute('open');
  });

  it('does not have the fullscreen attribute', async () => {
    const dialog = await page.find('sbb-dialog >>> dialog');
    const willOpen = await page.spyOnEvent(events.willOpen);
    const didOpen = await page.spyOnEvent(events.didOpen);

    await element.callMethod('open');
    await page.waitForChanges();

    await waitForCondition(() => willOpen.events.length === 1);
    expect(willOpen).toHaveReceivedEventTimes(1);
    await page.waitForChanges();

    await waitForCondition(() => didOpen.events.length === 1);
    expect(didOpen).toHaveReceivedEventTimes(1);
    await page.waitForChanges();

    expect(dialog).toHaveAttribute('open');

    await page.waitForChanges();
    expect(element).not.toHaveAttribute('data-fullscreen');
  });

  it('renders in fullscreen mode if no title is provided', async () => {
    page = await newE2EPage();
    await page.setContent(`
      <sbb-dialog id="my-dialog" title-back-button="true" disable-animation>
        Dialog content.
        <div slot="action-group">Action group</div>
      </sbb-dialog>
    `);
    element = await page.find('sbb-dialog');

    const dialog = await page.find('sbb-dialog >>> dialog');
    const willOpen = await page.spyOnEvent(events.willOpen);
    const didOpen = await page.spyOnEvent(events.didOpen);

    await element.callMethod('open');
    await page.waitForChanges();

    await waitForCondition(() => willOpen.events.length === 1);
    expect(willOpen).toHaveReceivedEventTimes(1);
    await page.waitForChanges();

    await waitForCondition(() => didOpen.events.length === 1);
    expect(didOpen).toHaveReceivedEventTimes(1);
    await page.waitForChanges();

    expect(dialog).toHaveAttribute('open');

    await page.waitForChanges();
    expect(element).toHaveAttribute('data-fullscreen');
  });
});

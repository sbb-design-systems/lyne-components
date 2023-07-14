import { E2EElement, E2EPage, newE2EPage } from '@stencil/core/testing';
import events from './sbb-dialog.events';
import { waitForCondition } from '../../global/testing';

describe('sbb-dialog', () => {
  let element: E2EElement, page: E2EPage;

  beforeEach(async () => {
    page = await newE2EPage();
    await page.setViewport({ width: 900, height: 600 });
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

  it('closes the dialog on backdrop click', async () => {
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

    // Simulate backdrop click
    await page.mouse.click(1, 1);
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

  it('does not close the dialog on other overlay click', async () => {
    page = await newE2EPage();
    await page.setViewport({ width: 900, height: 600 });
    await page.setContent(`
      <sbb-dialog id="my-dialog" title-content="Title" title-back-button="true" disable-animation>
        Dialog content.
        <div slot="action-group">Action group</div>
        <sbb-dialog id="inner-dialog" title-content="Inner Dialog title" title-back-button="true" disable-animation>
          Dialog content.
          <div slot="action-group">Action group</div>
        </sbb-dialog>
      </sbb-dialog>
    `);
    element = await page.find('sbb-dialog');
    const willOpen = await page.spyOnEvent(events.willOpen);
    const didOpen = await page.spyOnEvent(events.didOpen);
    const willClose = await page.spyOnEvent(events.willClose);
    const didClose = await page.spyOnEvent(events.didClose);
    const outerDialog = await page.find('sbb-dialog >>> dialog');
    const innerElement = await page.find('sbb-dialog > sbb-dialog');
    const innerDialog = await page.find('sbb-dialog > sbb-dialog >>> dialog');

    await element.callMethod('open');
    await page.waitForChanges();

    await waitForCondition(() => willOpen.events.length === 1);
    expect(willOpen).toHaveReceivedEventTimes(1);
    await page.waitForChanges();

    await waitForCondition(() => didOpen.events.length === 1);
    expect(didOpen).toHaveReceivedEventTimes(1);
    await page.waitForChanges();

    expect(outerDialog).toHaveAttribute('open');

    await innerElement.callMethod('open');
    await page.waitForChanges();

    await waitForCondition(() => willOpen.events.length === 2);
    expect(willOpen).toHaveReceivedEventTimes(2);
    await page.waitForChanges();

    await waitForCondition(() => didOpen.events.length === 2);
    expect(didOpen).toHaveReceivedEventTimes(2);
    await page.waitForChanges();

    expect(innerDialog).toHaveAttribute('open');

    // Simulate a click on the inner dialog's backdrop
    await page.mouse.click(1, 1);
    await page.waitForChanges();

    await waitForCondition(() => willClose.events.length === 1);
    expect(willClose).toHaveReceivedEventTimes(1);
    await page.waitForChanges();

    await waitForCondition(() => didClose.events.length === 1);
    expect(didClose).toHaveReceivedEventTimes(1);
    await page.waitForChanges();

    expect(innerElement).toEqualAttribute('data-state', 'closed');
    expect(innerDialog).not.toHaveAttribute('open');

    expect(element).toEqualAttribute('data-state', 'opened');
    expect(outerDialog).toHaveAttribute('open');
  });
});

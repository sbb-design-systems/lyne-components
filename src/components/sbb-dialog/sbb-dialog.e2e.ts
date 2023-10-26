import { E2EElement, E2EPage, newE2EPage } from '@stencil/core/testing';
import events from './sbb-dialog.events';
import { waitForCondition } from '../../global/testing';
import { i18nDialog } from '../../global/i18n';

describe('sbb-dialog', () => {
  let element: E2EElement, accessibilityLabel: E2EElement, page: E2EPage;

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
    accessibilityLabel = await page.find('sbb-dialog >>> span.sbb-screen-reader-only');
    await page.waitForChanges();
  });

  it('renders', () => {
    expect(element).toHaveClass('hydrated');
  });

  it('opens the dialog', async () => {
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
  });

  it('closes the dialog', async () => {
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

    expect(element).toEqualAttribute('data-state', 'opened');
    expect(accessibilityLabel.innerText.trim()).toBe(`${i18nDialog.en}, Title`);

    await element.callMethod('close');
    await page.waitForChanges();

    await waitForCondition(() => willClose.events.length === 1);
    expect(willClose).toHaveReceivedEventTimes(1);
    await page.waitForChanges();

    await waitForCondition(() => didClose.events.length === 1);
    expect(didClose).toHaveReceivedEventTimes(1);
    await page.waitForChanges();

    expect(element).toEqualAttribute('data-state', 'closed');
    expect(accessibilityLabel.innerText).toBe('');
  });

  it('closes the dialog on backdrop click', async () => {
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

    expect(element).toEqualAttribute('data-state', 'opened');

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
  });

  it('does not close the dialog on backdrop click', async () => {
    const willOpen = await page.spyOnEvent(events.willOpen);
    const didOpen = await page.spyOnEvent(events.didOpen);
    const willClose = await page.spyOnEvent(events.willClose);
    const didClose = await page.spyOnEvent(events.didClose);

    await element.setProperty('backdropAction', 'none');
    await page.waitForChanges();

    await element.callMethod('open');
    await page.waitForChanges();

    await waitForCondition(() => willOpen.events.length === 1);
    expect(willOpen).toHaveReceivedEventTimes(1);
    await page.waitForChanges();

    await waitForCondition(() => didOpen.events.length === 1);
    expect(didOpen).toHaveReceivedEventTimes(1);
    await page.waitForChanges();

    expect(element).toEqualAttribute('data-state', 'opened');

    // Simulate backdrop click
    await page.mouse.click(1, 1);
    await page.waitForChanges();

    expect(willClose).toHaveReceivedEventTimes(0);
    await page.waitForChanges();

    expect(didClose).toHaveReceivedEventTimes(0);
    await page.waitForChanges();

    expect(element).toEqualAttribute('data-state', 'opened');
  });

  it('closes the dialog on close button click', async () => {
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

    expect(element).toEqualAttribute('data-state', 'opened');

    closeButton.triggerEvent('click');
    await page.waitForChanges();

    await waitForCondition(() => willClose.events.length === 1);
    expect(willClose).toHaveReceivedEventTimes(1);
    await page.waitForChanges();

    await waitForCondition(() => didClose.events.length === 1);
    expect(didClose).toHaveReceivedEventTimes(1);
    await page.waitForChanges();

    expect(element).toEqualAttribute('data-state', 'closed');
  });

  it('closes the dialog on Esc key press', async () => {
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

    expect(element).toEqualAttribute('data-state', 'opened');

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

    expect(element).toEqualAttribute('data-state', 'closed');
  });

  it('does not have the fullscreen attribute', async () => {
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
    accessibilityLabel = await page.find('sbb-dialog >>> span.sbb-screen-reader-only');

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

    await page.waitForChanges();
    expect(element).toHaveAttribute('data-fullscreen');
    expect(accessibilityLabel.innerText.trim()).toBe(`${i18nDialog.en}`);
  });

  it('closes stacked dialogs one by one on ESC key pressed', async () => {
    page = await newE2EPage();
    await page.setContent(`
      <sbb-dialog id="my-dialog" title-content="Title" title-back-button="true" disable-animation>
        Dialog content.
        <div slot="action-group">Action group</div>
      </sbb-dialog>

      <sbb-dialog id="stacked-dialog" disable-animation>
        Stacked dialog.
      </sbb-dialog>
    `);
    element = await page.find('sbb-dialog');

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
    await page.waitForChanges();

    const stackedDialog = await page.find('#stacked-dialog');

    await stackedDialog.callMethod('open');
    await page.waitForChanges();

    expect(stackedDialog).toEqualAttribute('data-state', 'opened');

    await page.keyboard.down('Tab');
    await page.waitForChanges();

    await page.keyboard.down('Escape');
    await page.waitForChanges();

    expect(stackedDialog).toEqualAttribute('data-state', 'closed');
    expect(element).toEqualAttribute('data-state', 'opened');

    await page.keyboard.down('Tab');
    await page.waitForChanges();

    await page.keyboard.down('Escape');
    await page.waitForChanges();

    expect(stackedDialog).toEqualAttribute('data-state', 'closed');
    expect(element).toEqualAttribute('data-state', 'closed');
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
    const innerElement = await page.find('sbb-dialog > sbb-dialog');

    await element.callMethod('open');
    await page.waitForChanges();

    await waitForCondition(() => willOpen.events.length === 1);
    expect(willOpen).toHaveReceivedEventTimes(1);
    await page.waitForChanges();

    await waitForCondition(() => didOpen.events.length === 1);
    expect(didOpen).toHaveReceivedEventTimes(1);
    await page.waitForChanges();

    expect(element).toEqualAttribute('data-state', 'opened');

    await innerElement.callMethod('open');
    await page.waitForChanges();

    await waitForCondition(() => willOpen.events.length === 2);
    expect(willOpen).toHaveReceivedEventTimes(2);
    await page.waitForChanges();

    await waitForCondition(() => didOpen.events.length === 2);
    expect(didOpen).toHaveReceivedEventTimes(2);
    await page.waitForChanges();

    expect(innerElement).toEqualAttribute('data-state', 'opened');

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
    expect(element).toEqualAttribute('data-state', 'opened');
  });

  it('should remove accessibilityLabel on any click interaction', async () => {
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
    expect(accessibilityLabel.innerText.trim()).toBe(`${i18nDialog.en}, Title`);

    await element.press('Tab');
    await page.waitForChanges();

    expect(accessibilityLabel.innerText).toBe('');
  });

  it('should remove accessibilityLabel on any keyboard interaction', async () => {
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
    expect(accessibilityLabel.innerText.trim()).toBe(`${i18nDialog.en}, Title`);

    await element.click();
    await page.waitForChanges();

    expect(accessibilityLabel.innerText).toBe('');
  });

  it('should announce accessibility label if explicitly set', async () => {
    const willOpen = await page.spyOnEvent(events.willOpen);
    const didOpen = await page.spyOnEvent(events.didOpen);

    await element.setProperty('accessibilityLabel', 'Special Dialog');
    await element.callMethod('open');
    await page.waitForChanges();

    await waitForCondition(() => willOpen.events.length === 1);
    expect(willOpen).toHaveReceivedEventTimes(1);
    await page.waitForChanges();

    await waitForCondition(() => didOpen.events.length === 1);
    expect(didOpen).toHaveReceivedEventTimes(1);
    await page.waitForChanges();

    expect(element).toEqualAttribute('data-state', 'opened');
    expect(accessibilityLabel.innerText.trim()).toBe(`${i18nDialog.en}, Special Dialog`);
  });
});

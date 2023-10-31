import { assert, expect, fixture } from '@open-wc/testing';
import { html } from 'lit/static-html.js';
import { sendKeys, setViewport } from '@web/test-runner-commands';
import { EventSpy, waitForCondition, waitForLitRender } from '../../global/testing';
import { i18nDialog } from '../../global/i18n';
import { SbbDialog } from './sbb-dialog';
import '../sbb-button';
import '../sbb-icon';
import '../sbb-title';

async function openDialog(element: SbbDialog): Promise<void> {
  const willOpen = new EventSpy(SbbDialog.events.willOpen);
  const didOpen = new EventSpy(SbbDialog.events.didOpen);

  element.open();
  await waitForLitRender(element);

  await waitForCondition(() => willOpen.events.length === 1);
  expect(willOpen.count).to.be.equal(1);
  await waitForLitRender(element);

  await waitForCondition(() => didOpen.events.length === 1);
  expect(didOpen.count).to.be.equal(1);
  await waitForLitRender(element);

  expect(element).to.have.attribute('data-state', 'opened');
}

describe('sbb-dialog', () => {
  let element: SbbDialog, ariaLiveRef: HTMLElement;

  beforeEach(async () => {
    await setViewport({ width: 900, height: 600 });
    element = await fixture(html`
      <sbb-dialog id="my-dialog-1" title-content="Title" disable-animation>
        Dialog content.
        <div slot="action-group">Action group</div>
      </sbb-dialog>
    `);
    ariaLiveRef = element.shadowRoot.querySelector('span.sbb-screen-reader-only');
  });

  it('renders', () => {
    assert.instanceOf(element, SbbDialog);
  });

  it('opens the dialog', async () => {
    await openDialog(element);
  });

  it('closes the dialog', async () => {
    const willClose = new EventSpy(SbbDialog.events.willClose);
    const didClose = new EventSpy(SbbDialog.events.didClose);

    await openDialog(element);

    expect(ariaLiveRef.innerText.trim()).to.be.equal(`${i18nDialog.en}, Title`);

    element.close();
    await waitForLitRender(element);

    await waitForCondition(() => willClose.events.length === 1);
    expect(willClose.count).to.be.equal(1);
    await waitForLitRender(element);

    await waitForCondition(() => didClose.events.length === 1);
    expect(didClose.count).to.be.equal(1);
    await waitForLitRender(element);

    expect(element).to.have.attribute('data-state', 'closed');
    expect(ariaLiveRef.innerText).to.be.equal('');
  });

  it('closes the dialog on backdrop click', async () => {
    const willClose = new EventSpy(SbbDialog.events.willClose);
    const didClose = new EventSpy(SbbDialog.events.didClose);

    await openDialog(element);

    // Simulate backdrop click
    element.dispatchEvent(new CustomEvent('pointerdown'));
    element.dispatchEvent(new CustomEvent('pointerup'));
    await waitForLitRender(element);

    await waitForCondition(() => willClose.events.length === 1);
    expect(willClose.count).to.be.equal(1);
    await waitForLitRender(element);

    await waitForCondition(() => didClose.events.length === 1);
    expect(didClose.count).to.be.equal(1);
    await waitForLitRender(element);

    expect(element).to.have.attribute('data-state', 'closed');
  });

  it('does not close the dialog on backdrop click', async () => {
    const willClose = new EventSpy(SbbDialog.events.willClose);
    const didClose = new EventSpy(SbbDialog.events.didClose);

    element.backdropAction = 'none';
    await waitForLitRender(element);

    await openDialog(element);

    // Simulate backdrop click
    element.dispatchEvent(new CustomEvent('pointerdown'));
    element.dispatchEvent(new CustomEvent('pointerup'));
    await waitForLitRender(element);

    expect(willClose.count).to.be.equal(0);
    await waitForLitRender(element);

    expect(didClose.count).to.be.equal(0);
    await waitForLitRender(element);

    expect(element).to.have.attribute('data-state', 'opened');
  });

  it('closes the dialog on close button click', async () => {
    const closeButton = element.shadowRoot.querySelector('[sbb-dialog-close]') as HTMLElement;
    const willClose = new EventSpy(SbbDialog.events.willClose);
    const didClose = new EventSpy(SbbDialog.events.didClose);

    await openDialog(element);

    closeButton.click();
    await waitForLitRender(element);

    await waitForCondition(() => willClose.events.length === 1);
    expect(willClose.count).to.be.equal(1);
    await waitForLitRender(element);

    await waitForCondition(() => didClose.events.length === 1);
    expect(didClose.count).to.be.equal(1);
    await waitForLitRender(element);

    expect(element).to.have.attribute('data-state', 'closed');
  });

  it('closes the dialog on Esc key press', async () => {
    const willClose = new EventSpy(SbbDialog.events.willClose);
    const didClose = new EventSpy(SbbDialog.events.didClose);

    await openDialog(element);

    await sendKeys({ down: 'Tab' });
    await waitForLitRender(element);

    await sendKeys({ down: 'Escape' });
    await waitForLitRender(element);

    await waitForCondition(() => willClose.events.length === 1);
    expect(willClose.count).to.be.equal(1);
    await waitForLitRender(element);

    await waitForCondition(() => didClose.events.length === 1);
    expect(didClose.count).to.be.equal(1);
    await waitForLitRender(element);

    expect(element).to.have.attribute('data-state', 'closed');
  });

  it('does not have the fullscreen attribute', async () => {
    await openDialog(element);

    expect(element).not.to.have.attribute('data-fullscreen');
  });

  it('renders in fullscreen mode if no title is provided', async () => {
    element = await fixture(html`
      <sbb-dialog id="my-dialog-2" disable-animation>
        Dialog content.
        <div slot="action-group">Action group</div>
      </sbb-dialog>
    `);
    ariaLiveRef = element.shadowRoot.querySelector('span.sbb-screen-reader-only');

    await openDialog(element);

    expect(element).to.have.attribute('data-fullscreen');
    expect(ariaLiveRef.innerText.trim()).to.be.equal(`${i18nDialog.en}`);
  });

  it('closes stacked dialogs one by one on ESC key pressed', async () => {
    element = await fixture(html`
      <sbb-dialog id="my-dialog-3" title-content="Title" disable-animation>
        Dialog content.
        <div slot="action-group">Action group</div>
      </sbb-dialog>

      <sbb-dialog id="stacked-dialog" disable-animation title-content="Stacked title">
        Stacked dialog.
      </sbb-dialog>
    `);

    const willOpen = new EventSpy(SbbDialog.events.willOpen);
    const didOpen = new EventSpy(SbbDialog.events.didOpen);
    const willClose = new EventSpy(SbbDialog.events.willClose);
    const didClose = new EventSpy(SbbDialog.events.didClose);

    await openDialog(element);

    const stackedDialog = document.querySelector('#stacked-dialog') as SbbDialog;

    stackedDialog.open();
    await waitForLitRender(element);

    await waitForCondition(() => willOpen.events.length === 2);
    expect(willOpen.count).to.be.equal(2);
    await waitForLitRender(element);

    await waitForCondition(() => didOpen.events.length === 2);
    expect(didOpen.count).to.be.equal(2);
    await waitForLitRender(element);

    expect(stackedDialog).to.have.attribute('data-state', 'opened');

    await sendKeys({ down: 'Tab' });
    await waitForLitRender(element);

    await sendKeys({ down: 'Escape' });
    await waitForLitRender(element);

    await waitForCondition(() => willClose.events.length === 1);
    expect(willClose.count).to.be.equal(1);
    await waitForLitRender(element);

    await waitForCondition(() => didClose.events.length === 1);
    expect(didClose.count).to.be.equal(1);
    await waitForLitRender(element);

    expect(stackedDialog).to.have.attribute('data-state', 'closed');
    expect(element).to.have.attribute('data-state', 'opened');

    await sendKeys({ down: 'Tab' });
    await waitForLitRender(element);

    await sendKeys({ down: 'Escape' });
    await waitForLitRender(element);

    await waitForCondition(() => willClose.events.length === 2);
    expect(willClose.count).to.be.equal(2);
    await waitForLitRender(element);

    await waitForCondition(() => didClose.events.length === 2);
    expect(didClose.count).to.be.equal(2);
    await waitForLitRender(element);

    expect(stackedDialog).to.have.attribute('data-state', 'closed');
    expect(element).to.have.attribute('data-state', 'closed');
  });

  it('does not close the dialog on other overlay click', async () => {
    await setViewport({ width: 900, height: 600 });
    element = await fixture(html`
      <sbb-dialog id="my-dialog-4" title-content="Title" disable-animation>
        Dialog content.
        <div slot="action-group">Action group</div>
        <sbb-dialog id="inner-dialog" title-content="Inner Dialog title" disable-animation>
          Dialog content.
          <div slot="action-group">Action group</div>
        </sbb-dialog>
      </sbb-dialog>
    `);
    const willOpen = new EventSpy(SbbDialog.events.willOpen);
    const didOpen = new EventSpy(SbbDialog.events.didOpen);
    const willClose = new EventSpy(SbbDialog.events.willClose);
    const didClose = new EventSpy(SbbDialog.events.didClose);
    const innerElement = element.querySelector('sbb-dialog') as SbbDialog;

    await openDialog(element);

    innerElement.open();
    await waitForLitRender(element);

    await waitForCondition(() => willOpen.events.length === 2);
    expect(willOpen.count).to.be.equal(2);
    await waitForLitRender(element);

    await waitForCondition(() => didOpen.events.length === 2);
    expect(didOpen.count).to.be.equal(2);
    await waitForLitRender(element);

    expect(innerElement).to.have.attribute('data-state', 'opened');

    // Simulate a click on the inner dialog's backdrop
    innerElement.dispatchEvent(new CustomEvent('pointerdown'));
    innerElement.dispatchEvent(new CustomEvent('pointerup'));
    await waitForLitRender(element);

    await waitForCondition(() => willClose.events.length === 1);
    expect(willClose.count).to.be.equal(1);
    await waitForLitRender(element);

    await waitForCondition(() => didClose.events.length === 1);
    expect(didClose.count).to.be.equal(1);
    await waitForLitRender(element);

    expect(innerElement).to.have.attribute('data-state', 'closed');
    expect(element).to.have.attribute('data-state', 'opened');
  });

  it('should remove ariaLiveRef content on any keyboard interaction', async () => {
    await openDialog(element);

    expect(ariaLiveRef.innerText.trim()).to.be.equal(`${i18nDialog.en}, Title`);

    await sendKeys({ down: 'Tab' });
    await waitForLitRender(element);

    expect(ariaLiveRef.innerText.trim()).to.be.equal('');
  });

  it('should remove ariaLiveRef content on any click interaction', async () => {
    await openDialog(element);

    expect(ariaLiveRef.innerText.trim()).to.be.equal(`${i18nDialog.en}, Title`);

    element.click();
    await waitForLitRender(element);

    expect(ariaLiveRef.innerText).to.be.equal('');
  });

  it('should announce accessibility label in ariaLiveRef if explicitly set', async () => {
    element.accessibilityLabel = 'Special Dialog';

    await openDialog(element);

    expect(ariaLiveRef.innerText.trim()).to.be.equal(`${i18nDialog.en}, Special Dialog`);
  });
});

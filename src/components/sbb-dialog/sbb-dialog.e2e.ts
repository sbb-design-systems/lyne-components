import { events } from './sbb-dialog';
import { waitForCondition } from '../../global/testing';
import { assert, expect, fixture } from '@open-wc/testing';
import { html } from 'lit/static-html.js';
import { sendKeys, setViewport } from '@web/test-runner-commands';
import { SbbDialog } from './sbb-dialog';
import '../sbb-button';
import '../sbb-icon';
import '../sbb-title';
import { EventSpy, waitForLitRender } from '../../global/testing';

describe('sbb-dialog', () => {
  let element: SbbDialog;

  beforeEach(async () => {
    await setViewport({ width: 900, height: 600 });
    element = await fixture(html`
      <sbb-dialog id="my-dialog-1" title-content="Title" disable-animation>
        Dialog content.
        <div slot="action-group">Action group</div>
      </sbb-dialog>
    `);
  });

  it('renders', () => {
    assert.instanceOf(element, SbbDialog);
  });

  it('opens the dialog', async () => {
    const dialog = element.shadowRoot.querySelector('dialog');
    const willOpen = new EventSpy(events.willOpen);
    const didOpen = new EventSpy(events.didOpen);

    element.open();
    await waitForLitRender(element);

    await waitForCondition(() => willOpen.events.length === 1);
    expect(willOpen.count).to.be.equal(1);
    await waitForLitRender(element);

    await waitForCondition(() => didOpen.events.length === 1);
    expect(didOpen.count).to.be.equal(1);
    await waitForLitRender(element);

    expect(element).to.have.attribute('data-state', 'opened');
    expect(dialog).to.have.attribute('open');
  });

  it('closes the dialog', async () => {
    const willOpen = new EventSpy(events.willOpen);
    const didOpen = new EventSpy(events.didOpen);
    const willClose = new EventSpy(events.willClose);
    const didClose = new EventSpy(events.didClose);
    const dialog = element.shadowRoot.querySelector('dialog');

    element.open();
    await waitForLitRender(element);

    await waitForCondition(() => willOpen.events.length === 1);
    expect(willOpen.count).to.be.equal(1);
    await waitForLitRender(element);

    await waitForCondition(() => didOpen.events.length === 1);
    expect(didOpen.count).to.be.equal(1);
    await waitForLitRender(element);

    expect(dialog).to.have.attribute('open');

    element.close();
    await waitForLitRender(element);

    await waitForCondition(() => willClose.events.length === 1);
    expect(willClose.count).to.be.equal(1);
    await waitForLitRender(element);

    await waitForCondition(() => didClose.events.length === 1);
    expect(didClose.count).to.be.equal(1);
    await waitForLitRender(element);

    expect(element).to.have.attribute('data-state', 'closed');

    await waitForCondition(() => dialog.getAttribute('open') === null);
    expect(dialog).not.to.have.attribute('open');
  });

  it('closes the dialog on backdrop click', async () => {
    const willOpen = new EventSpy(events.willOpen);
    const didOpen = new EventSpy(events.didOpen);
    const willClose = new EventSpy(events.willClose);
    const didClose = new EventSpy(events.didClose);
    const dialog = element.shadowRoot.querySelector('dialog');

    element.open();
    await waitForLitRender(element);

    await waitForCondition(() => willOpen.events.length === 1);
    expect(willOpen.count).to.be.equal(1);
    await waitForLitRender(element);

    await waitForCondition(() => didOpen.events.length === 1);
    expect(didOpen.count).to.be.equal(1);
    await waitForLitRender(element);

    expect(dialog).to.have.attribute('open');

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

    await waitForCondition(() => dialog.getAttribute('open') === null);
    expect(dialog).not.to.have.attribute('open');
  });

  it('does not close the dialog on backdrop click', async () => {
    const willOpen = new EventSpy(events.willOpen);
    const didOpen = new EventSpy(events.didOpen);
    const willClose = new EventSpy(events.willClose);
    const didClose = new EventSpy(events.didClose);
    const dialog = element.shadowRoot.querySelector('dialog');

    element.backdropAction = 'none';
    await waitForLitRender(element);

    element.open();
    await waitForLitRender(element);

    await waitForCondition(() => willOpen.events.length === 1);
    expect(willOpen.count).to.be.equal(1);
    await waitForLitRender(element);

    await waitForCondition(() => didOpen.events.length === 1);
    expect(didOpen.count).to.be.equal(1);
    await waitForLitRender(element);

    expect(dialog).to.have.attribute('open');

    // Simulate backdrop click
    element.dispatchEvent(new CustomEvent('pointerdown'));
    element.dispatchEvent(new CustomEvent('pointerup'));
    await waitForLitRender(element);

    expect(willClose.count).to.be.equal(0);
    await waitForLitRender(element);

    expect(didClose.count).to.be.equal(0);
    await waitForLitRender(element);

    expect(element).to.have.attribute('data-state', 'opened');
    await waitForCondition(() => dialog.getAttribute('open') === '');
    expect(dialog).to.have.attribute('open');
  });

  it('closes the dialog on close button click', async () => {
    const dialog = element.shadowRoot.querySelector('dialog');
    const closeButton = element.shadowRoot.querySelector('[sbb-dialog-close]') as HTMLElement;
    const willOpen = new EventSpy(events.willOpen);
    const didOpen = new EventSpy(events.didOpen);
    const willClose = new EventSpy(events.willClose);
    const didClose = new EventSpy(events.didClose);

    element.open();
    await waitForLitRender(element);

    await waitForCondition(() => willOpen.events.length === 1);
    expect(willOpen.count).to.be.equal(1);
    await waitForLitRender(element);

    await waitForCondition(() => didOpen.events.length === 1);
    expect(didOpen.count).to.be.equal(1);
    await waitForLitRender(element);

    expect(dialog).to.have.attribute('open');

    closeButton.click();
    await waitForLitRender(element);

    await waitForCondition(() => willClose.events.length === 1);
    expect(willClose.count).to.be.equal(1);
    await waitForLitRender(element);

    await waitForCondition(() => didClose.events.length === 1);
    expect(didClose.count).to.be.equal(1);
    await waitForLitRender(element);

    await waitForCondition(() => dialog.getAttribute('open') === null);
    expect(dialog).not.to.have.attribute('open');
  });

  it('closes the dialog on Esc key press', async () => {
    const dialog = element.shadowRoot.querySelector('dialog');
    const willOpen = new EventSpy(events.willOpen);
    const didOpen = new EventSpy(events.didOpen);
    const willClose = new EventSpy(events.willClose);
    const didClose = new EventSpy(events.didClose);

    element.open();
    await waitForLitRender(element);

    await waitForCondition(() => willOpen.events.length === 1);
    expect(willOpen.count).to.be.equal(1);
    await waitForLitRender(element);

    await waitForCondition(() => didOpen.events.length === 1);
    expect(didOpen.count).to.be.equal(1);
    await waitForLitRender(element);

    expect(dialog).to.have.attribute('open');

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

    await waitForCondition(() => dialog.getAttribute('open') === null);
    expect(dialog).not.to.have.attribute('open');
  });

  it('does not have the fullscreen attribute', async () => {
    const dialog = element.shadowRoot.querySelector('dialog');
    const willOpen = new EventSpy(events.willOpen);
    const didOpen = new EventSpy(events.didOpen);
    const willClose = new EventSpy(events.willClose);
    const didClose = new EventSpy(events.didClose);

    element.open();
    await waitForLitRender(element);

    await waitForCondition(() => willOpen.events.length === 1);
    expect(willOpen.count).to.be.equal(1);
    await waitForLitRender(element);

    await waitForCondition(() => didOpen.events.length === 1);
    expect(didOpen.count).to.be.equal(1);
    await waitForLitRender(element);

    expect(dialog).to.have.attribute('open');

    await waitForLitRender(element);
    expect(element).not.to.have.attribute('data-fullscreen');

    element.close();
    await waitForLitRender(element);

    await waitForCondition(() => willClose.events.length === 1);
    expect(willClose.count).to.be.equal(1);
    await waitForLitRender(element);

    await waitForCondition(() => didClose.events.length === 1);
    expect(didClose.count).to.be.equal(1);
    await waitForLitRender(element);

    expect(element).not.to.have.attribute('data-state', 'opened');

    await waitForCondition(() => dialog.getAttribute('open') === null);
    expect(dialog).not.to.have.attribute('open');
  });

  it('renders in fullscreen mode if no title is provided', async () => {
    element = await fixture(html`
      <sbb-dialog id="my-dialog-2" disable-animation>
        Dialog content.
        <div slot="action-group">Action group</div>
      </sbb-dialog>
    `);

    const dialog = element.shadowRoot.querySelector('dialog');
    const willOpen = new EventSpy(events.willOpen);
    const didOpen = new EventSpy(events.didOpen);
    const willClose = new EventSpy(events.willClose);
    const didClose = new EventSpy(events.didClose);

    element.open();
    await waitForLitRender(element);

    await waitForCondition(() => willOpen.events.length === 1);
    expect(willOpen.count).to.be.equal(1);
    await waitForLitRender(element);

    await waitForCondition(() => didOpen.events.length === 1);
    expect(didOpen.count).to.be.equal(1);
    await waitForLitRender(element);

    expect(dialog).to.have.attribute('open');

    await waitForLitRender(element);
    expect(element).to.have.attribute('data-fullscreen');

    element.close();
    await waitForLitRender(element);

    await waitForCondition(() => willClose.events.length === 1);
    expect(willClose.count).to.be.equal(1);
    await waitForLitRender(element);

    await waitForCondition(() => didClose.events.length === 1);
    expect(didClose.count).to.be.equal(1);
    await waitForLitRender(element);

    expect(element).not.to.have.attribute('data-state', 'opened');

    await waitForCondition(() => dialog.getAttribute('open') === null);
    expect(dialog).not.to.have.attribute('open');
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

    const dialog = element.shadowRoot.querySelector('dialog');
    const willOpen = new EventSpy(events.willOpen);
    const didOpen = new EventSpy(events.didOpen);
    const willClose = new EventSpy(events.willClose);
    const didClose = new EventSpy(events.didClose);

    element.open();
    await waitForLitRender(element);

    await waitForCondition(() => willOpen.events.length === 1);
    expect(willOpen.count).to.be.equal(1);
    await waitForLitRender(element);

    await waitForCondition(() => didOpen.events.length === 1);
    expect(didOpen.count).to.be.equal(1);
    await waitForLitRender(element);

    expect(dialog).to.have.attribute('open');
    await waitForLitRender(element);

    const stackedDialog = document.querySelector('#stacked-dialog') as SbbDialog;
    const stackedDialogElement = stackedDialog.shadowRoot.querySelector('dialog');

    stackedDialog.open();
    await waitForLitRender(element);

    await waitForCondition(() => willOpen.events.length === 2);
    expect(willOpen.count).to.be.equal(2);
    await waitForLitRender(element);

    await waitForCondition(() => didOpen.events.length === 2);
    expect(didOpen.count).to.be.equal(2);
    await waitForLitRender(element);

    expect(stackedDialogElement).to.have.attribute('open');

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

    await waitForCondition(() => stackedDialogElement.getAttribute('open') === null);
    expect(stackedDialogElement).not.to.have.attribute('open');
    expect(dialog).to.have.attribute('open');

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

    expect(element).not.to.have.attribute('data-state', 'opened');

    await waitForCondition(() => dialog.getAttribute('open') === null);
    expect(dialog).not.to.have.attribute('open');
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
    const willOpen = new EventSpy(events.willOpen);
    const didOpen = new EventSpy(events.didOpen);
    const willClose = new EventSpy(events.willClose);
    const didClose = new EventSpy(events.didClose);
    const outerDialog = element.shadowRoot.querySelector('dialog');
    const innerElement = element.querySelector('sbb-dialog') as SbbDialog;
    const innerDialog = element.querySelector('sbb-dialog').shadowRoot.querySelector('dialog');

    element.open();
    await waitForLitRender(element);

    await waitForCondition(() => willOpen.events.length === 1);
    expect(willOpen.count).to.be.equal(1);
    await waitForLitRender(element);

    await waitForCondition(() => didOpen.events.length === 1);
    expect(didOpen.count).to.be.equal(1);
    await waitForLitRender(element);

    expect(outerDialog).to.have.attribute('open');

    innerElement.open();
    await waitForLitRender(element);

    await waitForCondition(() => willOpen.events.length === 2);
    expect(willOpen.count).to.be.equal(2);
    await waitForLitRender(element);

    await waitForCondition(() => didOpen.events.length === 2);
    expect(didOpen.count).to.be.equal(2);
    await waitForLitRender(element);

    expect(innerDialog).to.have.attribute('open');

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
    expect(innerDialog).not.to.have.attribute('open');

    expect(element).to.have.attribute('data-state', 'opened');
    expect(outerDialog).to.have.attribute('open');
  });
});

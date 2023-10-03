import { events } from './sbb-dialog';
import { waitForCondition } from '../../global/testing';
import { assert, expect, fixture } from '@open-wc/testing';
import { html } from 'lit/static-html.js';
import { sendKeys, sendMouse, setViewport } from '@web/test-runner-commands';
import { EventSpy } from '../../global/testing/event-spy';
import { SbbDialog } from './sbb-dialog';
import '../sbb-button';
import '../sbb-icon';
import '../sbb-title';

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
    await element.updateComplete;
  });

  it('renders', () => {
    assert.instanceOf(element, SbbDialog);
  });

  it('opens the dialog', async () => {
    const dialog = element.shadowRoot.querySelector('dialog');
    const willOpen = new EventSpy(events.willOpen);
    const didOpen = new EventSpy(events.didOpen);
    const willClose = new EventSpy(events.willClose);
    const didClose = new EventSpy(events.didClose);

    element.open();
    await element.updateComplete;

    await waitForCondition(() => willOpen.events.length === 1);
    expect(willOpen.count).to.be.equal(1);
    await element.updateComplete;

    await waitForCondition(() => didOpen.events.length === 1);
    expect(didOpen.count).to.be.equal(1);
    await element.updateComplete;

    expect(element).to.have.attribute('data-state', 'opened');
    expect(dialog).to.have.attribute('open');

    element.close();
    await element.updateComplete;

    await waitForCondition(() => willClose.events.length === 1);
    expect(willClose.count).to.be.equal(1);
    await element.updateComplete;

    await waitForCondition(() => didClose.events.length === 1);
    expect(didClose.count).to.be.equal(1);
    await element.updateComplete;

    expect(element).not.to.have.attribute('data-state', 'opened');

    await waitForCondition(() => dialog.getAttribute('open') === null);
    expect(dialog).not.to.have.attribute('open');
  });

  it('closes the dialog', async () => {
    const willOpen = new EventSpy(events.willOpen);
    const didOpen = new EventSpy(events.didOpen);
    const willClose = new EventSpy(events.willClose);
    const didClose = new EventSpy(events.didClose);
    const dialog = element.shadowRoot.querySelector('dialog');

    element.open();
    await element.updateComplete;

    await waitForCondition(() => willOpen.events.length === 1);
    expect(willOpen.count).to.be.equal(1);
    await element.updateComplete;

    await waitForCondition(() => didOpen.events.length === 1);
    expect(didOpen.count).to.be.equal(1);
    await element.updateComplete;

    expect(dialog).to.have.attribute('open');

    element.close();
    await element.updateComplete;

    await waitForCondition(() => willClose.events.length === 1);
    expect(willClose.count).to.be.equal(1);
    await element.updateComplete;

    await waitForCondition(() => didClose.events.length === 1);
    expect(didClose.count).to.be.equal(1);
    await element.updateComplete;

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
    await element.updateComplete;

    await waitForCondition(() => willOpen.events.length === 1);
    expect(willOpen.count).to.be.equal(1);
    await element.updateComplete;

    await waitForCondition(() => didOpen.events.length === 1);
    expect(didOpen.count).to.be.equal(1);
    await element.updateComplete;

    expect(dialog).to.have.attribute('open');

    // Simulate backdrop click
    await sendMouse({ type: 'click', position: [1, 1] });
    await element.updateComplete;

    await waitForCondition(() => willClose.events.length === 1);
    expect(willClose.count).to.be.equal(1);
    await element.updateComplete;

    await waitForCondition(() => didClose.events.length === 1);
    expect(didClose.count).to.be.equal(1);
    await element.updateComplete;

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
    await element.updateComplete;

    element.open();
    await element.updateComplete;

    await waitForCondition(() => willOpen.events.length === 1);
    expect(willOpen.count).to.be.equal(1);
    await element.updateComplete;

    await waitForCondition(() => didOpen.events.length === 1);
    expect(didOpen.count).to.be.equal(1);
    await element.updateComplete;

    expect(dialog).to.have.attribute('open');

    // Simulate backdrop click
    await sendMouse({ type: 'click', position: [1, 1] });
    await element.updateComplete;

    expect(willClose.count).to.be.equal(0);
    await element.updateComplete;

    expect(didClose.count).to.be.equal(0);
    await element.updateComplete;

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
    await element.updateComplete;

    await waitForCondition(() => willOpen.events.length === 1);
    expect(willOpen.count).to.be.equal(1);
    await element.updateComplete;

    await waitForCondition(() => didOpen.events.length === 1);
    expect(didOpen.count).to.be.equal(1);
    await element.updateComplete;

    expect(dialog).to.have.attribute('open');

    closeButton.click();
    await element.updateComplete;

    await waitForCondition(() => willClose.events.length === 1);
    expect(willClose.count).to.be.equal(1);
    await element.updateComplete;

    await waitForCondition(() => didClose.events.length === 1);
    expect(didClose.count).to.be.equal(1);
    await element.updateComplete;

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
    await element.updateComplete;

    await waitForCondition(() => willOpen.events.length === 1);
    expect(willOpen.count).to.be.equal(1);
    await element.updateComplete;

    await waitForCondition(() => didOpen.events.length === 1);
    expect(didOpen.count).to.be.equal(1);
    await element.updateComplete;

    expect(dialog).to.have.attribute('open');

    await sendKeys({ down: 'Tab' });
    await element.updateComplete;

    await sendKeys({ down: 'Escape' });
    await element.updateComplete;

    await waitForCondition(() => willClose.events.length === 1);
    expect(willClose.count).to.be.equal(1);
    await element.updateComplete;

    await waitForCondition(() => didClose.events.length === 1);
    expect(didClose.count).to.be.equal(1);
    await element.updateComplete;

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
    await element.updateComplete;

    await waitForCondition(() => willOpen.events.length === 1);
    expect(willOpen.count).to.be.equal(1);
    await element.updateComplete;

    await waitForCondition(() => didOpen.events.length === 1);
    expect(didOpen.count).to.be.equal(1);
    await element.updateComplete;

    expect(dialog).to.have.attribute('open');

    await element.updateComplete;
    expect(element).not.to.have.attribute('data-fullscreen');

    element.close();
    await element.updateComplete;

    await waitForCondition(() => willClose.events.length === 1);
    expect(willClose.count).to.be.equal(1);
    await element.updateComplete;

    await waitForCondition(() => didClose.events.length === 1);
    expect(didClose.count).to.be.equal(1);
    await element.updateComplete;

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
    await element.updateComplete;

    await waitForCondition(() => willOpen.events.length === 1);
    expect(willOpen.count).to.be.equal(1);
    await element.updateComplete;

    await waitForCondition(() => didOpen.events.length === 1);
    expect(didOpen.count).to.be.equal(1);
    await element.updateComplete;

    expect(dialog).to.have.attribute('open');

    await element.updateComplete;
    expect(element).to.have.attribute('data-fullscreen');

    element.close();
    await element.updateComplete;

    await waitForCondition(() => willClose.events.length === 1);
    expect(willClose.count).to.be.equal(1);
    await element.updateComplete;

    await waitForCondition(() => didClose.events.length === 1);
    expect(didClose.count).to.be.equal(1);
    await element.updateComplete;

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
    await element.updateComplete;

    await waitForCondition(() => willOpen.events.length === 1);
    expect(willOpen.count).to.be.equal(1);
    await element.updateComplete;

    await waitForCondition(() => didOpen.events.length === 1);
    expect(didOpen.count).to.be.equal(1);
    await element.updateComplete;

    expect(dialog).to.have.attribute('open');
    await element.updateComplete;

    const stackedDialog = document.querySelector('#stacked-dialog') as SbbDialog;
    const stackedDialogElement = stackedDialog.shadowRoot.querySelector('dialog');

    stackedDialog.open();
    await element.updateComplete;

    expect(stackedDialogElement).to.have.attribute('open');

    await sendKeys({ down: 'Tab' });
    await element.updateComplete;

    await sendKeys({ down: 'Escape' });
    await element.updateComplete;

    expect(stackedDialogElement).not.to.have.attribute('open');
    expect(dialog).to.have.attribute('open');

    await sendKeys({ down: 'Tab' });
    await element.updateComplete;

    await sendKeys({ down: 'Escape' });
    await element.updateComplete;

    element.close();
    await element.updateComplete;

    await waitForCondition(() => willClose.events.length === 1);
    expect(willClose.count).to.be.equal(1);
    await element.updateComplete;

    await waitForCondition(() => didClose.events.length === 1);
    expect(didClose.count).to.be.equal(1);
    await element.updateComplete;

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
    await element.updateComplete;

    await waitForCondition(() => willOpen.events.length === 1);
    expect(willOpen.count).to.be.equal(1);
    await element.updateComplete;

    await waitForCondition(() => didOpen.events.length === 1);
    expect(didOpen.count).to.be.equal(1);
    await element.updateComplete;

    expect(outerDialog).to.have.attribute('open');

    innerElement.open();
    await element.updateComplete;

    await waitForCondition(() => willOpen.events.length === 2);
    expect(willOpen.count).to.be.equal(2);
    await element.updateComplete;

    await waitForCondition(() => didOpen.events.length === 2);
    expect(didOpen.count).to.be.equal(2);
    await element.updateComplete;

    expect(innerDialog).to.have.attribute('open');

    // Simulate a click on the inner dialog's backdrop
    await sendMouse({ type: 'click', position: [1, 1] });
    await element.updateComplete;

    await waitForCondition(() => willClose.events.length === 1);
    expect(willClose.count).to.be.equal(1);
    await element.updateComplete;

    await waitForCondition(() => didClose.events.length === 1);
    expect(didClose.count).to.be.equal(1);
    await element.updateComplete;

    expect(innerElement).to.have.attribute('data-state', 'closed');
    expect(innerDialog).not.to.have.attribute('open');

    expect(element).to.have.attribute('data-state', 'opened');
    expect(outerDialog).to.have.attribute('open');

    element.close();
    await element.updateComplete;

    await waitForCondition(() => willClose.events.length === 1);
    expect(willClose.count).to.be.equal(1);
    await element.updateComplete;

    await waitForCondition(() => didClose.events.length === 1);
    expect(didClose.count).to.be.equal(1);
    await element.updateComplete;

    expect(element).not.to.have.attribute('data-state', 'opened');

    await waitForCondition(() => outerDialog.getAttribute('open') === null);
    expect(outerDialog).not.to.have.attribute('open');
  });
});

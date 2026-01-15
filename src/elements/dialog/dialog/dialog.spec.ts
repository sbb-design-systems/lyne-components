import { assert, aTimeout, expect, fixture } from '@open-wc/testing';
import { sendKeys, setViewport } from '@web/test-runner-commands';
import { html } from 'lit/static-html.js';
import type { Context } from 'mocha';

import type { SbbAutocompleteElement } from '../../autocomplete.ts';
import type { SbbButtonElement } from '../../button.ts';
import { i18nDialog } from '../../core/i18n.ts';
import { sbbBreakpointLargeMinPx, tabKey } from '../../core/testing/private.ts';
import { EventSpy, waitForCondition, waitForLitRender } from '../../core/testing.ts';
import { SbbStepElement } from '../../stepper/step/step.component.ts';

import { assignDialogResult, SbbDialogCloseEvent, SbbDialogElement } from './dialog.component.ts';

import '../../autocomplete.ts';
import '../../button.ts';
import '../../form-field.ts';
import '../../icon.ts';
import '../../option.ts';
import '../../stepper.ts';
import '../dialog-title.ts';
import '../dialog-close-button.ts';
import '../dialog-content.ts';
import '../dialog-actions.ts';

async function openDialog(element: SbbDialogElement): Promise<void> {
  const beforeOpenSpy = new EventSpy(SbbDialogElement.events.beforeopen, element);
  const openSpy = new EventSpy(SbbDialogElement.events.open, element);

  element.open();
  await waitForLitRender(element);

  await beforeOpenSpy.calledOnce();
  expect(beforeOpenSpy.count).to.be.equal(1);
  await waitForLitRender(element);

  await openSpy.calledOnce();
  expect(openSpy.count).to.be.equal(1);
  await waitForLitRender(element);

  expect(element).to.match(':state(state-opened)');
  expect(element).to.match(':popover-open');
}

describe('sbb-dialog', () => {
  describe('basic', () => {
    let element: SbbDialogElement, ariaLiveRef: HTMLElement;

    beforeEach(async () => {
      await setViewport({ width: sbbBreakpointLargeMinPx, height: 600 });
      element = await fixture(html`
        <sbb-dialog id="my-dialog-1">
          <sbb-dialog-title>Title</sbb-dialog-title>
          <sbb-dialog-content>Dialog content</sbb-dialog-content>
          <sbb-dialog-actions>
            Action group <button sbb-dialog-close>Cancel</button>
          </sbb-dialog-actions>
        </sbb-dialog>
      `);
      ariaLiveRef = element.shadowRoot!.querySelector('sbb-screen-reader-only')!;
    });

    it('renders', () => {
      assert.instanceOf(element, SbbDialogElement);
    });

    it('opens the dialog', async () => {
      await openDialog(element);
    });

    it('does not open the dialog if prevented', async () => {
      const beforeOpenSpy = new EventSpy(SbbDialogElement.events.beforeopen, element);
      const openSpy = new EventSpy(SbbDialogElement.events.open, element);

      element.addEventListener(SbbDialogElement.events.beforeopen, (ev) => ev.preventDefault());

      element.open();
      await waitForLitRender(element);

      await beforeOpenSpy.calledOnce();
      expect(beforeOpenSpy.count).to.be.equal(1);
      await waitForLitRender(element);

      expect(openSpy.count).to.be.equal(0);
      expect(element).to.match(':state(state-closed)');
    });

    it('closes the dialog', async () => {
      const beforeCloseSpy = new EventSpy(SbbDialogElement.events.beforeclose, element);
      const closeSpy = new EventSpy(SbbDialogElement.events.close, element);

      await openDialog(element);

      await waitForCondition(() => ariaLiveRef.textContent!.trim() === `${i18nDialog.en}, Title`);

      element.close();
      await waitForLitRender(element);

      await beforeCloseSpy.calledOnce();
      expect(beforeCloseSpy.count).to.be.equal(1);
      await waitForLitRender(element);

      await closeSpy.calledOnce();
      expect(closeSpy.count).to.be.equal(1);
      await waitForLitRender(element);

      expect(element).to.match(':state(state-closed)');
      expect(element).not.to.match(':popover-open');
      expect(ariaLiveRef.textContent).to.be.equal('');
    });

    it('does not close the dialog if prevented', async () => {
      const beforeCloseSpy = new EventSpy(SbbDialogElement.events.beforeclose, element);
      const closeSpy = new EventSpy(SbbDialogElement.events.close, element);

      await openDialog(element);

      element.addEventListener(SbbDialogElement.events.beforeclose, (ev) => ev.preventDefault());

      element.close();
      await waitForLitRender(element);

      await beforeCloseSpy.calledOnce();
      expect(beforeCloseSpy.count).to.be.equal(1);
      await waitForLitRender(element);

      expect(closeSpy.count).to.be.equal(0);
      expect(element).to.match(':state(state-opened)');
    });

    it('closes the dialog on backdrop click', async () => {
      const beforeCloseSpy = new EventSpy(SbbDialogElement.events.beforeclose, element);
      const closeSpy = new EventSpy(SbbDialogElement.events.close, element);

      await openDialog(element);

      // Simulate backdrop click
      element.dispatchEvent(new PointerEvent('pointerdown'));
      element.dispatchEvent(new PointerEvent('pointerup'));
      await waitForLitRender(element);

      await beforeCloseSpy.calledOnce();
      expect(beforeCloseSpy.count).to.be.equal(1);
      await waitForLitRender(element);

      await closeSpy.calledOnce();
      expect(closeSpy.count).to.be.equal(1);
      await waitForLitRender(element);

      expect(element).to.match(':state(state-closed)');
    });

    it('does not close the dialog on backdrop click', async () => {
      const beforeCloseSpy = new EventSpy(SbbDialogElement.events.beforeclose, element);
      const closeSpy = new EventSpy(SbbDialogElement.events.close, element);

      element.backdropAction = 'none';
      await waitForLitRender(element);

      await openDialog(element);

      // Simulate backdrop click
      element.dispatchEvent(new PointerEvent('pointerdown'));
      element.dispatchEvent(new PointerEvent('pointerup'));
      await waitForLitRender(element);

      expect(beforeCloseSpy.count).to.be.equal(0);
      await waitForLitRender(element);

      expect(closeSpy.count).to.be.equal(0);
      await waitForLitRender(element);

      expect(element).to.match(':state(state-opened)');
    });

    it('does not close the dialog on backdrop click if pointerdown is on dialog', async () => {
      const beforeCloseSpy = new EventSpy(SbbDialogElement.events.beforeclose, element);
      const closeSpy = new EventSpy(SbbDialogElement.events.close, element);

      await openDialog(element);

      // Simulate backdrop click
      element
        .shadowRoot!.querySelector('.sbb-dialog')!
        .dispatchEvent(new PointerEvent('pointerdown', { bubbles: true, composed: true }));
      element.dispatchEvent(new PointerEvent('pointerup'));
      await waitForLitRender(element);

      expect(beforeCloseSpy.count).to.be.equal(0);
      await waitForLitRender(element);

      expect(closeSpy.count).to.be.equal(0);
      await waitForLitRender(element);

      expect(element).to.match(':state(state-opened)');
    });

    it('does not close the dialog on backdrop click if pointerup is on dialog', async () => {
      const beforeCloseSpy = new EventSpy(SbbDialogElement.events.beforeclose, element);
      const closeSpy = new EventSpy(SbbDialogElement.events.close, element);

      await openDialog(element);

      // Simulate backdrop click
      element.dispatchEvent(new PointerEvent('pointerdown'));
      element
        .shadowRoot!.querySelector('.sbb-dialog')!
        .dispatchEvent(new PointerEvent('pointerup', { bubbles: true, composed: true }));
      await waitForLitRender(element);

      expect(beforeCloseSpy.count).to.be.equal(0);
      await waitForLitRender(element);

      expect(closeSpy.count).to.be.equal(0);
      await waitForLitRender(element);

      expect(element).to.match(':state(state-opened)');
    });

    it('closes the dialog on close button click with sbb-dialog-close attribute', async () => {
      const closeButton = element.querySelector('[sbb-dialog-close]') as HTMLElement;
      const beforeCloseSpy = new EventSpy(SbbDialogElement.events.beforeclose, element);
      const closeSpy = new EventSpy(SbbDialogElement.events.close, element);

      await openDialog(element);

      closeButton.click();
      await waitForLitRender(element);

      await beforeCloseSpy.calledOnce();
      expect(beforeCloseSpy.count).to.be.equal(1);
      await waitForLitRender(element);

      await closeSpy.calledOnce();
      expect(closeSpy.count).to.be.equal(1);
      await waitForLitRender(element);

      expect(element).to.match(':state(state-closed)');
    });

    it('closes the dialog on Esc key press', async () => {
      const beforeCloseSpy = new EventSpy(SbbDialogElement.events.beforeclose, element);
      const closeSpy = new EventSpy(SbbDialogElement.events.close, element);

      await openDialog(element);

      await sendKeys({ press: tabKey });
      await waitForLitRender(element);

      await sendKeys({ press: 'Escape' });
      await waitForLitRender(element);

      await beforeCloseSpy.calledOnce();
      expect(beforeCloseSpy.count).to.be.equal(1);
      await waitForLitRender(element);

      await closeSpy.calledOnce();
      expect(closeSpy.count).to.be.equal(1);
      await waitForLitRender(element);

      expect(element).to.match(':state(state-closed)');
    });

    it('closes stacked dialogs one by one on ESC key pressed', async () => {
      element = await fixture(html`
        <sbb-dialog id="my-dialog-3">
          <sbb-dialog-title>Title</sbb-dialog-title>
          <sbb-dialog-content>Dialog content</sbb-dialog-content>
          <sbb-dialog-actions>Action group</sbb-dialog-actions>
        </sbb-dialog>

        <sbb-dialog id="stacked-dialog">
          <sbb-dialog-title>Stacked title</sbb-dialog-title>
          <sbb-dialog-content>Dialog content</sbb-dialog-content>
          <sbb-dialog-actions>Action group</sbb-dialog-actions>
        </sbb-dialog>
      `);

      const beforeOpenSpy = new EventSpy(SbbDialogElement.events.beforeopen, null, {
        capture: true,
      });
      const openSpy = new EventSpy(SbbDialogElement.events.open, null, { capture: true });
      const beforeCloseSpy = new EventSpy(SbbDialogElement.events.beforeclose, null, {
        capture: true,
      });
      const closeSpy = new EventSpy(SbbDialogElement.events.close, null, { capture: true });

      await openDialog(element);

      const stackedDialog = document.querySelector('#stacked-dialog') as SbbDialogElement;

      stackedDialog.open();
      await waitForLitRender(element);

      await beforeOpenSpy.calledTimes(2);
      expect(beforeOpenSpy.count).to.be.equal(2);
      await waitForLitRender(element);

      await openSpy.calledTimes(2);
      expect(openSpy.count).to.be.equal(2);
      await waitForLitRender(element);

      expect(stackedDialog).to.match(':state(state-opened)');

      await sendKeys({ press: tabKey });
      await waitForLitRender(element);

      await sendKeys({ press: 'Escape' });
      await waitForLitRender(element);

      await beforeCloseSpy.calledOnce();
      expect(beforeCloseSpy.count).to.be.equal(1);
      await waitForLitRender(element);

      await closeSpy.calledOnce();
      expect(closeSpy.count).to.be.equal(1);
      await waitForLitRender(element);

      expect(stackedDialog).to.match(':state(state-closed)');
      expect(element).to.match(':state(state-opened)');

      await sendKeys({ press: tabKey });
      await waitForLitRender(element);

      await sendKeys({ press: 'Escape' });
      await waitForLitRender(element);

      await beforeCloseSpy.calledTimes(2);
      expect(beforeCloseSpy.count).to.be.equal(2);
      await waitForLitRender(element);

      await closeSpy.calledTimes(2);
      expect(closeSpy.count).to.be.equal(2);
      await waitForLitRender(element);

      expect(stackedDialog).to.match(':state(state-closed)');
      expect(element).to.match(':state(state-closed)');
    });

    it('opens and closes the overlay with non-zero animation duration', async () => {
      (globalThis as { disableAnimation?: boolean }).disableAnimation = false;

      element.style.setProperty('--sbb-dialog-animation-duration', '1ms');

      const beforeCloseSpy = new EventSpy(SbbDialogElement.events.beforeclose, element);
      const closeSpy = new EventSpy(SbbDialogElement.events.close, element);

      await openDialog(element);

      element.close();
      await waitForLitRender(element);

      await beforeCloseSpy.calledOnce();
      expect(beforeCloseSpy.count).to.be.equal(1);
      await waitForLitRender(element);

      await closeSpy.calledOnce();
      expect(closeSpy.count).to.be.equal(1);
      await waitForLitRender(element);

      expect(element).to.match(':state(state-closed)');
    });

    it('does not close the dialog on other overlay click', async () => {
      await setViewport({ width: sbbBreakpointLargeMinPx, height: 600 });
      element = await fixture(html`
        <sbb-dialog id="my-dialog-4">
          <sbb-dialog-title>Title</sbb-dialog-title>
          <sbb-dialog-content>Dialog content</sbb-dialog-content>

          <sbb-dialog id="inner-dialog">
            <sbb-dialog-title>Inner Dialog title</sbb-dialog-title>
            <sbb-dialog-content>Dialog content</sbb-dialog-content>
          </sbb-dialog>
        </sbb-dialog>
      `);
      const beforeOpenSpy = new EventSpy(SbbDialogElement.events.beforeopen, null, {
        capture: true,
      });
      const openSpy = new EventSpy(SbbDialogElement.events.open, null, { capture: true });
      const beforeCloseSpy = new EventSpy(SbbDialogElement.events.beforeclose, null, {
        capture: true,
      });
      const closeSpy = new EventSpy(SbbDialogElement.events.close, null, { capture: true });
      const innerElement = element.querySelector('sbb-dialog') as SbbDialogElement;

      await openDialog(element);

      innerElement.open();
      await waitForLitRender(element);

      await beforeOpenSpy.calledTimes(2);
      expect(beforeOpenSpy.count).to.be.equal(2);
      await waitForLitRender(element);

      await openSpy.calledTimes(2);
      expect(openSpy.count).to.be.equal(2);
      await waitForLitRender(element);

      expect(innerElement).to.match(':state(state-opened)');

      // Simulate a click on the inner dialog's backdrop
      innerElement.dispatchEvent(new PointerEvent('pointerdown'));
      innerElement.dispatchEvent(new PointerEvent('pointerup'));
      await waitForLitRender(element);

      await beforeCloseSpy.calledOnce();
      expect(beforeCloseSpy.count).to.be.equal(1);
      await waitForLitRender(element);

      await closeSpy.calledOnce();
      expect(closeSpy.count).to.be.equal(1);
      await waitForLitRender(element);

      expect(innerElement).to.match(':state(state-closed)');
      expect(element).to.match(':state(state-opened)');
    });

    it('should remove ariaLiveRef content on any keyboard interaction', async () => {
      await openDialog(element);

      await waitForCondition(() => ariaLiveRef.textContent!.trim() === `${i18nDialog.en}, Title`);

      await sendKeys({ press: tabKey });
      await waitForLitRender(element);

      expect(ariaLiveRef.textContent!.trim()).to.be.equal('');
    });

    it('should remove ariaLiveRef content on any click interaction', async () => {
      await openDialog(element);

      await waitForCondition(() => ariaLiveRef.textContent!.trim() === `${i18nDialog.en}, Title`);

      element.click();
      await waitForLitRender(element);

      expect(ariaLiveRef.textContent).to.be.equal('');
    });

    it('should announce accessibility label in ariaLiveRef if explicitly set', async () => {
      element.accessibilityLabel = 'Special Dialog';

      await openDialog(element);

      await waitForCondition(
        () => ariaLiveRef.textContent!.trim() === `${i18nDialog.en}, Special Dialog`,
      );

      expect(ariaLiveRef.textContent!.trim()).to.be.equal(`${i18nDialog.en}, Special Dialog`);
    });

    it('should announce accessibility label by calling announceTitle()', async () => {
      await openDialog(element);

      await waitForCondition(() => ariaLiveRef.textContent!.trim() === `${i18nDialog.en}, Title`);

      element.accessibilityLabel = 'Special Dialog';
      element.announceTitle();

      expect(ariaLiveRef.textContent!.trim()).to.be.equal(`${i18nDialog.en}, Special Dialog`);
    });
  });

  describe('with trigger', () => {
    let element: SbbDialogElement, trigger: HTMLElement;

    beforeEach(async () => {
      await setViewport({ width: sbbBreakpointLargeMinPx, height: 600 });
      const root = await fixture(html`
        <div>
          <button id="trigger"></button>
          <sbb-dialog trigger="trigger">
            <sbb-dialog-title>Title</sbb-dialog-title>
            <sbb-dialog-content>Dialog content</sbb-dialog-content>
            <sbb-dialog-actions>Action group</sbb-dialog-actions>
          </sbb-dialog>
        </div>
      `);
      element = root.querySelector('sbb-dialog')!;
      trigger = root.querySelector('#trigger')!;
    });

    it('configures trigger', () => {
      expect(trigger.ariaHasPopup).to.be.equal('dialog');
      const ariaControlsId = trigger.getAttribute('aria-controls');
      expect(element.id).to.be.equal(ariaControlsId);
      expect(trigger.getAttribute('aria-expanded')).to.be.equal('false');

      trigger.click();
      expect(element.isOpen).to.be.true;
      expect(trigger.getAttribute('aria-expanded')).to.be.equal('true');
    });

    it('updates trigger connected by id', async () => {
      trigger.id = '';
      await waitForLitRender(element);
      expect(trigger.ariaHasPopup).to.be.null;

      trigger.id = 'trigger';
      await waitForLitRender(element);
      expect(trigger.ariaHasPopup).not.to.be.null;
    });

    it('accepts trigger as HTML Element', async () => {
      trigger.id = '';
      await waitForLitRender(element);
      expect(trigger.ariaHasPopup).to.be.null;

      element.trigger = trigger;
      await waitForLitRender(element);
      expect(trigger.ariaHasPopup).not.to.be.null;
    });

    it('allows removing the trigger', async () => {
      expect(trigger.ariaHasPopup).not.to.be.null;

      element.trigger = null;
      await waitForLitRender(element);
      expect(trigger.ariaHasPopup).to.be.null;
    });

    it('init with HtmlElement as trigger', async () => {
      trigger = await fixture(html`<sbb-button id="dialog-trigger">Menu trigger</sbb-button>`);
      element = await fixture(html`<sbb-dialog id="dialog" .trigger=${trigger}></sbb-dialog>`);

      const beforeOpenSpy = new EventSpy(SbbDialogElement.events.beforeopen, element);
      const openSpy = new EventSpy(SbbDialogElement.events.open, element);

      trigger.click();

      await beforeOpenSpy.calledOnce();
      expect(beforeOpenSpy.count).to.be.equal(1);

      await openSpy.calledOnce();
      expect(openSpy.count).to.be.equal(1);

      expect(element).to.match(':state(state-opened)');
      expect(element).to.match(':popover-open');
    });

    it('closes and restores focus', async () => {
      trigger.focus();
      expect(document.activeElement).to.be.equal(trigger);

      trigger.click();
      expect(element.isOpen).to.be.true;
      await waitForCondition(() => document.activeElement !== trigger, 2);
      expect(document.activeElement).not.to.be.equal(trigger);

      await sendKeys({ press: 'Escape' });
      expect(element.isOpen).to.be.false;
      expect(document.activeElement).to.be.equal(trigger);
    });

    it('closes and skips focus restoration', async () => {
      element.skipFocusRestoration = true;

      trigger.focus();
      expect(document.activeElement).to.be.equal(trigger);

      trigger.click();
      expect(element.isOpen).to.be.true;
      await waitForCondition(() => document.activeElement !== trigger, 2);
      expect(document.activeElement).not.to.be.equal(trigger);

      await sendKeys({ press: 'Escape' });
      expect(element.isOpen).to.be.false;
      expect(document.activeElement).not.to.be.equal(trigger);
    });
  });

  describe('with long content', () => {
    let element: SbbDialogElement;

    beforeEach(async () => {
      await setViewport({ width: sbbBreakpointLargeMinPx, height: 300 });
      element = await fixture(html`
        <sbb-dialog id="my-dialog-1">
          <sbb-dialog-title>Title</sbb-dialog-title>
          <sbb-dialog-content>
            Frodo halted for a moment, looking back. Elrond was in his chair and the fire was on his
            face like summer-light upon the trees. Near him sat the Lady Arwen. To his surprise
            Frodo saw that Aragorn stood beside her; his dark cloak was thrown back, and he seemed
            to be clad in elven-mail, and a star shone on his breast. They spoke together, and then
            suddenly it seemed to Frodo that Arwen turned towards him, and the light of her eyes
            fell on him from afar and pierced his heart. He stood still enchanted, while the sweet
            syllables of the elvish song fell like clear jewels of blended word and melody. 'It is a
            song to Elbereth,'' said Bilbo. 'They will sing that, and other songs of the Blessed
            Realm, many times tonight. Come on!’ —J.R.R. Tolkien, The Lord of the Rings: The
            Fellowship of the Ring, “Many Meetings” J.R.R. Tolkien, the mastermind behind
            Middle-earth's enchanting world, was born on January 3, 1892. With "The Hobbit" and "The
            Lord of the Rings", he pioneered fantasy literature. Tolkien's linguistic brilliance and
            mythic passion converge in a literary legacy that continues to transport readers to
            magical realms.
          </sbb-dialog-content>
          <sbb-dialog-actions>Action group</sbb-dialog-actions>
        </sbb-dialog>
      `);
    });

    it('renders', () => {
      assert.instanceOf(element, SbbDialogElement);
    });

    it('sets the overflows state', async () => {
      await openDialog(element);

      expect(element).to.match(':state(state-opened)');
      await waitForCondition(() => element.matches(':state(bottom-shadow)'));
      expect(element).to.match(':state(bottom-shadow)');
    });

    it('should detect scrolled state', async () => {
      await openDialog(element);

      const scrollContext = element.querySelector('sbb-dialog-content')!;

      const scrollEventSpy = new EventSpy('scroll', scrollContext, { passive: true });

      await setViewport({ width: sbbBreakpointLargeMinPx, height: 200 });
      await waitForLitRender(element);
      expect(element).not.to.match(':state(top-shadow)');

      scrollContext.scrollTo({ top: 1, behavior: 'instant' });
      await scrollEventSpy.calledTimes(1);

      expect(element).to.match(':state(top-shadow)');
    });
  });

  describe('with autocomplete', () => {
    const openDialog: (root: HTMLElement, selector: string) => void = (
      root: HTMLElement,
      selector: string,
    ) => {
      (root.querySelector(selector) as SbbDialogElement)!.open();
    };

    it('pressing "Escape" will close only the last opened overlay', async () => {
      const root: HTMLElement = await fixture(html`
        <div>
          <sbb-button id="button-1" @click=${() => openDialog(root, '#dialog-1')}
            >Open dialog</sbb-button
          >
          <sbb-dialog id="dialog-1">
            <sbb-dialog-title>Title</sbb-dialog-title>
            <sbb-dialog-content>
              <sbb-button id="button-2" @click="${() => openDialog(root, '#dialog-2')}"
                >Open nested dialog</sbb-button
              >
              <sbb-dialog id="dialog-2">
                <sbb-dialog-content>
                  Content
                  <sbb-form-field>
                    <label>Pressing 'Escape' keydown with overlay</label>
                    <input />
                    <sbb-autocomplete>
                      <sbb-option value="1">1</sbb-option>
                      <sbb-option value="2">2</sbb-option>
                      <sbb-option value="3">3</sbb-option>
                    </sbb-autocomplete>
                  </sbb-form-field>
                </sbb-dialog-content>
              </sbb-dialog>
            </sbb-dialog-content>
          </sbb-dialog>
        </div>
      `);

      const button = root.querySelector<SbbButtonElement>('#button-1')!;
      const dialog = root.querySelector<SbbDialogElement>('#dialog-1')!;
      const nestedButton = root.querySelector<SbbButtonElement>('#button-2')!;
      const nestedDialog = root.querySelector<SbbDialogElement>('#dialog-2')!;
      const autocomplete = root.querySelector<SbbAutocompleteElement>('sbb-autocomplete')!;

      // the overlays are all closed
      expect(dialog).to.match(':state(state-closed)');
      expect(nestedDialog).to.match(':state(state-closed)');
      expect(autocomplete).to.match(':state(state-closed)');

      // open the first dialog
      button.click();
      await waitForLitRender(root);
      expect(dialog).to.match(':state(state-opened)');
      expect(nestedDialog).to.match(':state(state-closed)');
      expect(autocomplete).to.match(':state(state-closed)');

      // open the second dialog; since it has no sbb-title, the autocomplete is the first focusable element, so it opens
      nestedButton.click();
      await waitForLitRender(root);
      expect(dialog).to.match(':state(state-opened)');
      expect(nestedDialog).to.match(':state(state-opened)');
      expect(autocomplete).to.match(':state(state-opened)');

      // press Escape for the first time will close the autocomplete but not the dialogs
      await sendKeys({ press: 'Escape' });
      await waitForLitRender(root);
      expect(dialog).to.match(':state(state-opened)');
      expect(nestedDialog).to.match(':state(state-opened)');
      expect(autocomplete).to.match(':state(state-closed)');

      // press Escape for the second time will close the second dialog
      await sendKeys({ press: 'Escape' });
      await waitForLitRender(root);
      expect(dialog).to.match(':state(state-opened)');
      expect(nestedDialog).to.match(':state(state-closed)');
      expect(autocomplete).to.match(':state(state-closed)');

      // press Escape again will close the first dialog
      await sendKeys({ press: 'Escape' });
      await waitForLitRender(root);
      expect(dialog).to.match(':state(state-closed)');
      expect(nestedDialog).to.match(':state(state-closed)');
      expect(autocomplete).to.match(':state(state-closed)');
    });
  });

  describe('with stepper', () => {
    let root: SbbDialogElement;

    beforeEach(async () => {
      await setViewport({ width: sbbBreakpointLargeMinPx, height: 600 });
      root = await fixture(html`
        <sbb-dialog>
          <sbb-dialog-title>Title</sbb-dialog-title>
          <sbb-dialog-content>
            <sbb-stepper linear orientation="horizontal" size="m">
              <sbb-step-label>First step</sbb-step-label>
              <sbb-step>
                First content
                <sbb-button size="m" sbb-stepper-next>Next</sbb-button>
              </sbb-step>
              <sbb-step-label>Second step</sbb-step-label>
              <sbb-step>
                Second content
                <sbb-secondary-button size="m" sbb-stepper-previous>Back</sbb-secondary-button>
                <sbb-button size="m" sbb-stepper-next>Next</sbb-button>
              </sbb-step>
            </sbb-stepper>
          </sbb-dialog-content>
          <sbb-dialog-actions>Action group</sbb-dialog-actions>
        </sbb-dialog>
      `);
    });

    it('should open the dialog and the stepper should appear with the correct style', async () => {
      const stepper = root.querySelector('sbb-stepper')!;
      // TODO: Firefox has 0 instead of 0px; fix when possible
      expect(
        parseInt(getComputedStyle(stepper).getPropertyValue('--sbb-stepper-marker-size')),
        'stepper marker size',
      ).to.be.equal(0);
      expect(
        getComputedStyle(stepper).getPropertyValue('--sbb-stepper-content-height'),
      ).to.be.equal('0px');

      const stepOne = root.querySelector<SbbStepElement>('sbb-step:nth-of-type(1)')!;
      const resizeChangeSpy = new EventSpy(SbbStepElement.events.resizechange, stepOne);
      await openDialog(root);
      await waitForLitRender(root);
      await resizeChangeSpy.calledOnce();
      expect(resizeChangeSpy.count).to.be.equal(1);
      expect(root).to.match(':state(state-opened)');

      // Need to wait for the intersector to kick in; the value is set in px, so we have to remove the unit
      await waitForCondition(
        () =>
          Number(
            getComputedStyle(stepper)
              .getPropertyValue('--sbb-stepper-marker-size')
              .replaceAll('px', ''),
          ) > 0,
      );
      expect(
        getComputedStyle(stepper).getPropertyValue('--sbb-stepper-marker-size'),
      ).not.to.be.equal('0');

      await waitForCondition(
        () =>
          Number(
            getComputedStyle(stepper)
              .getPropertyValue('--sbb-stepper-content-height')
              .replaceAll('px', ''),
          ) > 0,
      );
      expect(
        getComputedStyle(stepper).getPropertyValue('--sbb-stepper-content-height'),
      ).not.to.be.equal('0px');
    });
  });

  describe('nested dialogs', () => {
    let root: HTMLElement;
    let openButton: SbbButtonElement;
    let nestedOpenButton: SbbButtonElement;
    let closeButton: SbbButtonElement;
    let nestedCloseButton: SbbButtonElement;
    let dialog: SbbDialogElement;
    let nestedDialog: SbbDialogElement;
    let openSpy: EventSpy<Event>;
    let closeSpy: EventSpy<Event>;
    let nestedOpenSpy: EventSpy<Event>;
    let nestedCloseSpy: EventSpy<Event>;

    beforeEach(async () => {
      root = await fixture(html`
        <div>
          <sbb-button id="button-1">Open dialog</sbb-button>
          <sbb-dialog id="dialog-1" trigger="button-1">
            <sbb-dialog-close-button id="close-1"></sbb-dialog-close-button>
            <sbb-dialog-content>
              <sbb-button id="button-2">Open nested dialog</sbb-button>
              <sbb-dialog id="dialog-2" trigger="button-2">
                <sbb-dialog-close-button id="close-2"></sbb-dialog-close-button>
              </sbb-dialog>
            </sbb-dialog-content>
          </sbb-dialog>
        </div>
      `);

      openButton = root.querySelector<SbbButtonElement>('#button-1')!;
      nestedOpenButton = root.querySelector<SbbButtonElement>('#button-2')!;
      closeButton = root.querySelector<SbbButtonElement>('#close-1')!;
      nestedCloseButton = root.querySelector<SbbButtonElement>('#close-2')!;
      dialog = root.querySelector<SbbDialogElement>('#dialog-1')!;
      nestedDialog = root.querySelector<SbbDialogElement>('#dialog-2')!;
      openSpy = new EventSpy(SbbDialogElement.events.open, dialog);
      closeSpy = new EventSpy(SbbDialogElement.events.close, dialog);
      nestedOpenSpy = new EventSpy(SbbDialogElement.events.open, nestedDialog);
      nestedCloseSpy = new EventSpy(SbbDialogElement.events.close, nestedDialog);
    });

    it('should only close most upper dialog when pressing close button', async () => {
      openButton.click();
      await openSpy.calledOnce();

      nestedOpenButton.click();
      await nestedOpenSpy.calledOnce();

      expect(dialog).to.match(':state(state-opened)');
      expect(nestedDialog).to.match(':state(state-opened)');

      nestedCloseButton.click();
      await nestedCloseSpy.calledOnce();

      expect(dialog).to.match(':state(state-opened)');
      expect(nestedDialog).to.match(':state(state-closed)');

      // Should not throw when dialog was removed from DOM before closing
      nestedDialog.remove();

      closeButton.click();
      await closeSpy.calledOnce();
      expect(dialog).to.match(':state(state-closed)');
      expect(nestedDialog).to.match(':state(state-closed)');
    });

    it('should only close most upper dialog when pressing Escape', async function (this: Context) {
      // Flaky on WebKit
      this.retries(3);

      (globalThis as { disableAnimation?: boolean }).disableAnimation = false;

      nestedDialog.style.setProperty('--sbb-dialog-animation-duration', '5ms');

      openButton.click();
      await openSpy.calledOnce();

      nestedOpenButton.click();
      expect(nestedDialog).to.match(':state(state-opening)');
      await sendKeys({ press: 'Escape' });
      expect(nestedDialog).to.match(':state(state-closing)');
      await nestedCloseSpy.calledOnce();

      expect(dialog).to.match(':state(state-opened)');
      expect(nestedDialog).to.match(':state(state-closed)');
    });

    it('should prevent opening a nested dialog if outer is closed or closing', async () => {
      openButton.click();
      await openSpy.calledOnce();

      await sendKeys({ press: 'Escape' });
      nestedOpenButton.click();
      expect(nestedDialog, 'nested dialog should stay close').to.match(':state(state-closed)');
      await closeSpy.calledOnce();
      expect(nestedDialog, 'nested dialog').to.match(':state(state-closed)');
      expect(dialog, 'outer dialog').to.match(':state(state-closed)');
    });
  });

  it('handles opening without first rendering', async () => {
    const button = document.createElement('button');
    button.textContent = 'Button';
    const content = document.createElement('sbb-dialog-content');
    content.appendChild(button);
    const element = document.createElement('sbb-dialog');
    element.appendChild(content);
    document.body.appendChild(element);

    element.open();

    await waitForLitRender(element);
    expect(element.shadowRoot?.querySelector('sbb-screen-reader-only')).to.have.trimmed.text(
      'Dialog',
    );

    // Wait until setTimeout of overlay base kicks in.
    await aTimeout(0);

    expect(document.activeElement).to.be.equal(button);

    element.remove();
  });

  describe('assignDialogResult and SbbDialogCloseEvent', () => {
    let element: SbbDialogElement;

    beforeEach(async () => {
      element = await fixture(html`
        <sbb-dialog>
          <sbb-dialog-title>Result Dialog</sbb-dialog-title>
          <sbb-dialog-content>
            <button id="close-with-attribute-result" sbb-dialog-close="simple-result">
              Close with attribute result
            </button>
            <button id="close-with-assigned-result" sbb-dialog-close>
              Close with assigned result
            </button>
            <button id="close-without-result" sbb-dialog-close>Close without result</button>
          </sbb-dialog-content>
        </sbb-dialog>
      `);
    });

    it('should emit SbbDialogCloseEvent with result from attribute', async () => {
      const closeSpy = new EventSpy(SbbDialogElement.events.close, element);
      const closeButton = element.querySelector<HTMLButtonElement>('#close-with-attribute-result')!;

      await openDialog(element);

      closeButton.click();
      await closeSpy.calledOnce();

      const event = closeSpy.lastEvent as SbbDialogCloseEvent;
      expect(event).to.be.instanceOf(SbbDialogCloseEvent);
      expect(event.result).to.equal('simple-result');
      expect(event.closeTarget).to.equal(closeButton);
    });

    it('should emit SbbDialogCloseEvent with assigned result via assignDialogResult', async () => {
      const closeSpy = new EventSpy(SbbDialogElement.events.close, element);
      const closeButton = element.querySelector<HTMLButtonElement>('#close-with-assigned-result')!;

      // Assign a complex result object
      const complexResult = { success: true, data: { id: 123, name: 'Test' } };
      assignDialogResult(closeButton, complexResult);

      await openDialog(element);

      closeButton.click();
      await closeSpy.calledOnce();

      const event = closeSpy.lastEvent as SbbDialogCloseEvent;
      expect(event).to.be.instanceOf(SbbDialogCloseEvent);
      expect(event.result).to.deep.equal(complexResult);
      expect(event.closeTarget).to.equal(closeButton);
    });

    it('should prioritize assigned result over attribute result', async () => {
      const closeSpy = new EventSpy(SbbDialogElement.events.close, element);
      const closeButton = element.querySelector<HTMLButtonElement>('#close-with-attribute-result')!;

      // Assign a result that should override the attribute
      const overrideResult = { override: true };
      assignDialogResult(closeButton, overrideResult);

      await openDialog(element);

      closeButton.click();
      await closeSpy.calledOnce();

      const event = closeSpy.lastEvent as SbbDialogCloseEvent;
      expect(event).to.be.instanceOf(SbbDialogCloseEvent);
      expect(event.result).to.deep.equal(overrideResult);
      expect(event.result).not.to.equal('simple-result');
    });

    it('should emit SbbDialogCloseEvent with null result when no result is provided', async () => {
      const closeSpy = new EventSpy(SbbDialogElement.events.close, element);
      const closeButton = element.querySelector<HTMLButtonElement>('#close-without-result')!;

      await openDialog(element);

      closeButton.click();
      await closeSpy.calledOnce();

      const event = closeSpy.lastEvent as SbbDialogCloseEvent;
      expect(event).to.be.instanceOf(SbbDialogCloseEvent);
      expect(event.result).to.be.null;
      expect(event.closeTarget).to.equal(closeButton);
    });

    it('should emit SbbDialogCloseEvent with null closeTarget when closed programmatically', async () => {
      const closeSpy = new EventSpy(SbbDialogElement.events.close, element);

      await openDialog(element);

      element.close();
      await closeSpy.calledOnce();

      const event = closeSpy.lastEvent as SbbDialogCloseEvent;
      expect(event).to.be.instanceOf(SbbDialogCloseEvent);
      expect(event.result).to.be.null;
      expect(event.closeTarget).to.be.null;
    });

    it('should emit SbbDialogCloseEvent with result when closed programmatically with result', async () => {
      const closeSpy = new EventSpy(SbbDialogElement.events.close, element);

      await openDialog(element);

      const programmaticResult = { reason: 'user-action' };
      element.close(programmaticResult);
      await closeSpy.calledOnce();

      const event = closeSpy.lastEvent as SbbDialogCloseEvent;
      expect(event).to.be.instanceOf(SbbDialogCloseEvent);
      expect(event.result).to.deep.equal(programmaticResult);
      expect(event.detail.returnValue).to.deep.equal(programmaticResult);
      expect(event.closeTarget).to.be.null;
    });

    it('should emit SbbDialogCloseEvent with null closeTarget when closed via Escape', async () => {
      const closeSpy = new EventSpy(SbbDialogElement.events.close, element);

      await openDialog(element);

      await sendKeys({ press: 'Escape' });
      await closeSpy.calledOnce();

      const event = closeSpy.lastEvent as SbbDialogCloseEvent;
      expect(event).to.be.instanceOf(SbbDialogCloseEvent);
      expect(event.result).to.be.null;
      expect(event.closeTarget).to.be.null;
    });

    it('should emit result with closeTarget when close() is called with target parameter', async () => {
      const closeSpy = new EventSpy(SbbDialogElement.events.close, element);
      const customTarget = element.querySelector<HTMLButtonElement>('#close-programmatically')!;

      await openDialog(element);

      element.close({ custom: 'result' }, customTarget);
      await closeSpy.calledOnce();

      const event = closeSpy.lastEvent as SbbDialogCloseEvent;
      expect(event).to.be.instanceOf(SbbDialogCloseEvent);
      expect(event.result).to.deep.equal({ custom: 'result' });
      expect(event.detail.returnValue).to.deep.equal({ custom: 'result' });
      expect(event.closeTarget).to.equal(customTarget);
    });
  });
});

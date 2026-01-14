import { assert, expect, fixture } from '@open-wc/testing';
import { sendKeys, setViewport } from '@web/test-runner-commands';
import { html } from 'lit/static-html.js';
import type { Context } from 'mocha';

import type { SbbButtonElement } from '../button.ts';
import { i18nDialog } from '../core/i18n.ts';
import type { SbbOverlayCloseEventDetails } from '../core/interfaces.ts';
import { sbbBreakpointLargeMinPx, tabKey } from '../core/testing/private.ts';
import { EventSpy, waitForCondition, waitForLitRender } from '../core/testing.ts';

import { assignOverlayResult, SbbOverlayCloseEvent } from './overlay-base-element.ts';
import { SbbOverlayElement } from './overlay.component.ts';
import '../button.ts';
import '../icon.ts';

async function openOverlay(element: SbbOverlayElement): Promise<void> {
  const beforeOpenSpy = new EventSpy(SbbOverlayElement.events.beforeopen, element);
  const openSpy = new EventSpy(SbbOverlayElement.events.open, element);

  element.open();
  await waitForLitRender(element);

  await beforeOpenSpy.calledOnce();
  expect(beforeOpenSpy.count).to.be.equal(1);

  await openSpy.calledOnce();
  expect(openSpy.count).to.be.equal(1);
  expect(element).to.match(':state(state-opened)');
  expect(element).to.match(':popover-open');
}

describe('sbb-overlay', () => {
  describe('basic', () => {
    let element: SbbOverlayElement, ariaLiveRef: HTMLElement;

    beforeEach(async () => {
      await setViewport({ width: sbbBreakpointLargeMinPx, height: 600 });
      element = await fixture(html`
        <sbb-overlay id="my-overlay-1" accessibility-label="Label">
          <p>Overlay content</p>
          <p>Overlay content</p>
          <p>Overlay content</p>
          <p>Overlay content</p>
        </sbb-overlay>
      `);
      ariaLiveRef = element.shadowRoot!.querySelector('sbb-screen-reader-only')!;
    });

    it('renders', () => {
      assert.instanceOf(element, SbbOverlayElement);
    });

    it('opens the overlay', async () => {
      await openOverlay(element);
    });

    it('does not open the overlay if prevented', async () => {
      const beforeOpenSpy = new EventSpy(SbbOverlayElement.events.beforeopen, element);
      const openSpy = new EventSpy(SbbOverlayElement.events.open, element);

      element.addEventListener(SbbOverlayElement.events.beforeopen, (ev) => ev.preventDefault());

      element.open();
      await waitForLitRender(element);

      await beforeOpenSpy.calledOnce();
      expect(beforeOpenSpy.count).to.be.equal(1);
      expect(openSpy.count).to.be.equal(0);
      expect(element).to.match(':state(state-closed)');
    });

    it('closes the overlay', async function (this: Context) {
      // Flaky on WebKit
      this.retries(3);
      const beforeCloseSpy = new EventSpy(SbbOverlayElement.events.beforeclose, element);
      const closeSpy = new EventSpy(SbbOverlayElement.events.close, element);

      await openOverlay(element);

      await waitForCondition(() => ariaLiveRef.textContent!.trim() === `${i18nDialog.en}, Label`);

      element.close();
      await waitForLitRender(element);

      await beforeCloseSpy.calledOnce();
      expect(beforeCloseSpy.count).to.be.equal(1);

      await closeSpy.calledOnce();
      expect(closeSpy.count).to.be.equal(1);
      expect(element).to.match(':state(state-closed)');
      expect(element).not.to.match(':popover-open');
      expect(ariaLiveRef.textContent).to.be.equal('');
    });

    it('opens and closes the overlay with non-zero animation duration', async () => {
      (globalThis as { disableAnimation?: boolean }).disableAnimation = false;

      element.style.setProperty('--sbb-overlay-animation-duration', '1ms');
      const closeSpy = new EventSpy(SbbOverlayElement.events.close, element);

      await openOverlay(element);

      element.close();
      await waitForLitRender(element);

      await closeSpy.calledOnce();
      expect(closeSpy.count).to.be.equal(1);
      expect(element).to.match(':state(state-closed)');
    });

    it('does not close the overlay if prevented', async () => {
      const beforeCloseSpy = new EventSpy(SbbOverlayElement.events.beforeclose, element);
      const closeSpy = new EventSpy(SbbOverlayElement.events.close, element);

      await openOverlay(element);

      element.addEventListener(SbbOverlayElement.events.beforeclose, (ev) => ev.preventDefault());

      element.close();
      await waitForLitRender(element);

      await beforeCloseSpy.calledOnce();
      expect(beforeCloseSpy.count).to.be.equal(1);
      expect(closeSpy.count).to.be.equal(0);
      expect(element).to.match(':state(state-opened)');
    });

    it('closes the overlay on close button click', async () => {
      const closeButton = element.shadowRoot!.querySelector('[sbb-overlay-close]') as HTMLElement;
      const beforeCloseSpy = new EventSpy(SbbOverlayElement.events.beforeclose, element);
      const closeSpy = new EventSpy(SbbOverlayElement.events.close, element);

      await openOverlay(element);

      closeButton.click();
      await waitForLitRender(element);

      await beforeCloseSpy.calledOnce();
      expect(beforeCloseSpy.count).to.be.equal(1);

      await closeSpy.calledOnce();
      expect(closeSpy.count).to.be.equal(1);

      expect(element).to.match(':state(state-closed)');
    });

    it('closes the overlay on close button click with linked form', async () => {
      element = await fixture(html`
        <div>
          <form id="formid" method="dialog"></form>
          <sbb-overlay id="my-overlay-3">
            <p>Overlay content</p>
            <sbb-button sbb-overlay-close type="submit" form="formid">Close</sbb-button>
          </sbb-overlay>
        </div>
      `);

      const overlay = element.querySelector('sbb-overlay')!;
      const closeButton = element.querySelector<SbbButtonElement>('[type="submit"]')!;
      const form = element.querySelector<HTMLFormElement>('form')!;
      const beforeCloseSpy = new EventSpy<CustomEvent<SbbOverlayCloseEventDetails>>(
        SbbOverlayElement.events.beforeclose,
        overlay,
      );

      await openOverlay(overlay);

      closeButton.click();
      await waitForLitRender(element);

      await beforeCloseSpy.calledOnce();

      expect(beforeCloseSpy.firstEvent?.detail.returnValue).to.be.deep.equal(form);
    });

    it('closes the overlay on Esc key press', async () => {
      const beforeCloseSpy = new EventSpy(SbbOverlayElement.events.beforeclose, element);
      const closeSpy = new EventSpy(SbbOverlayElement.events.close, element);

      await openOverlay(element);

      await sendKeys({ press: tabKey });
      await waitForLitRender(element);

      await sendKeys({ press: 'Escape' });
      await waitForLitRender(element);

      await beforeCloseSpy.calledOnce();
      expect(beforeCloseSpy.count).to.be.equal(1);

      await closeSpy.calledOnce();
      expect(closeSpy.count).to.be.equal(1);

      expect(element).to.match(':state(state-closed)');
    });

    it('closes stacked overlays one by one on ESC key pressed', async () => {
      element = await fixture(html`
        <sbb-overlay id="my-overlay-3">
          <p>Overlay content</p>
        </sbb-overlay>

        <sbb-overlay id="stacked-overlay">
          <p>Stacked overlay content</p>
        </sbb-overlay>
      `);

      const beforeOpenSpy = new EventSpy(SbbOverlayElement.events.beforeopen, null, {
        capture: true,
      });
      const openSpy = new EventSpy(SbbOverlayElement.events.open, null, { capture: true });
      const beforeCloseSpy = new EventSpy(SbbOverlayElement.events.beforeclose, null, {
        capture: true,
      });
      const closeSpy = new EventSpy(SbbOverlayElement.events.close, null, { capture: true });

      await openOverlay(element);

      const stackedOverlay = document.querySelector('#stacked-overlay') as SbbOverlayElement;

      stackedOverlay.open();
      await waitForLitRender(element);

      await beforeOpenSpy.calledTimes(2);
      expect(beforeOpenSpy.count).to.be.equal(2);

      await openSpy.calledTimes(2);
      expect(openSpy.count).to.be.equal(2);

      expect(stackedOverlay).to.match(':state(state-opened)');

      await sendKeys({ press: tabKey });
      await waitForLitRender(element);

      await sendKeys({ press: 'Escape' });
      await waitForLitRender(element);

      await beforeCloseSpy.calledOnce();
      expect(beforeCloseSpy.count).to.be.equal(1);

      await closeSpy.calledOnce();
      expect(closeSpy.count).to.be.equal(1);

      expect(stackedOverlay).to.match(':state(state-closed)');
      expect(element).to.match(':state(state-opened)');

      await sendKeys({ press: tabKey });
      await waitForLitRender(element);

      await sendKeys({ press: 'Escape' });
      await waitForLitRender(element);

      await beforeCloseSpy.calledTimes(2);
      expect(beforeCloseSpy.count).to.be.equal(2);

      await closeSpy.calledTimes(2);
      expect(closeSpy.count).to.be.equal(2);

      expect(stackedOverlay).to.match(':state(state-closed)');
      expect(element).to.match(':state(state-closed)');
    });

    it('should remove ariaLiveRef content on any keyboard interaction', async () => {
      await openOverlay(element);

      await waitForCondition(() => ariaLiveRef.textContent!.trim() === `${i18nDialog.en}, Label`);

      await sendKeys({ press: tabKey });
      await waitForLitRender(element);

      expect(ariaLiveRef.textContent!.trim()).to.be.equal('');
    });

    it('should remove ariaLiveRef content on any click interaction', async () => {
      await openOverlay(element);

      await waitForCondition(() => ariaLiveRef.textContent!.trim() === `${i18nDialog.en}, Label`);

      element.click();
      await waitForLitRender(element);

      expect(ariaLiveRef.textContent).to.be.equal('');
    });

    it('should announce accessibility label in ariaLiveRef if explicitly set', async () => {
      element.accessibilityLabel = 'Special Overlay';

      await openOverlay(element);

      await waitForCondition(
        () => ariaLiveRef.textContent!.trim() === `${i18nDialog.en}, Special Overlay`,
      );

      expect(ariaLiveRef.textContent!.trim()).to.be.equal(`${i18nDialog.en}, Special Overlay`);
    });

    it('does forward scroll event to document', async () => {
      const openSpy = new EventSpy(SbbOverlayElement.events.open, element);

      element.open();
      await waitForLitRender(element);
      await openSpy.calledOnce();

      await setViewport({ width: 320, height: 300 });

      const scrollSpy = new EventSpy('scroll', document);
      const scrollContext = element.shadowRoot!.querySelector('.sbb-overlay__content')!;

      scrollContext.scrollTo(0, 400);

      await scrollSpy.calledOnce();
      expect(scrollSpy.count).to.be.equal(1);
    });
  });

  describe('with trigger', () => {
    let element: SbbOverlayElement, trigger: HTMLElement;

    beforeEach(async () => {
      await setViewport({ width: sbbBreakpointLargeMinPx, height: 600 });
      const root = await fixture(html`
        <div>
          <button id="trigger"></button>
          <sbb-overlay trigger="trigger">Content</sbb-overlay>
        </div>
      `);
      element = root.querySelector('sbb-overlay')!;
      trigger = root.querySelector('#trigger')!;
    });

    it('configures trigger', () => {
      expect(trigger.ariaHasPopup).to.be.equal('dialog');
      expect(trigger.getAttribute('aria-controls')).to.be.equal('sbb-overlay-0');
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
      trigger = await fixture(html`<sbb-button id="overlay-trigger">Menu trigger</sbb-button>`);
      element = await fixture(html`<sbb-overlay id="overlay" .trigger=${trigger}></sbb-overlay>`);

      const beforeOpenSpy = new EventSpy(SbbOverlayElement.events.beforeopen, element);
      const openSpy = new EventSpy(SbbOverlayElement.events.open, element);

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

  describe('assignOverlayResult and SbbOverlayCloseEvent', () => {
    let element: SbbOverlayElement;

    beforeEach(async () => {
      element = await fixture(html`
        <sbb-overlay>
          <button id="close-with-attribute-result" sbb-overlay-close="simple-result">
            Close with attribute result
          </button>
          <button id="close-with-assigned-result" sbb-overlay-close>
            Close with assigned result
          </button>
          <button id="close-without-result" sbb-overlay-close>Close without result</button>
        </sbb-overlay>
      `);
    });

    it('should emit SbbOverlayCloseEvent with result from attribute', async () => {
      const closeSpy = new EventSpy(SbbOverlayElement.events.close, element);
      const closeButton = element.querySelector<HTMLButtonElement>('#close-with-attribute-result')!;

      await openOverlay(element);

      closeButton.click();
      await closeSpy.calledOnce();

      const event = closeSpy.lastEvent as SbbOverlayCloseEvent;
      expect(event).to.be.instanceOf(SbbOverlayCloseEvent);
      expect(event.result).to.equal('simple-result');
      expect(event.closeTarget).to.equal(closeButton);
    });

    it('should emit SbbOverlayCloseEvent with assigned result via assignOverlayResult', async () => {
      const closeSpy = new EventSpy(SbbOverlayElement.events.close, element);
      const closeButton = element.querySelector<HTMLButtonElement>('#close-with-assigned-result')!;

      // Assign a complex result object
      const complexResult = { success: true, data: { id: 123, name: 'Test' } };
      assignOverlayResult(closeButton, complexResult);

      await openOverlay(element);

      closeButton.click();
      await closeSpy.calledOnce();

      const event = closeSpy.lastEvent as SbbOverlayCloseEvent;
      expect(event).to.be.instanceOf(SbbOverlayCloseEvent);
      expect(event.result).to.deep.equal(complexResult);
      expect(event.closeTarget).to.equal(closeButton);
    });

    it('should prioritize assigned result over attribute result', async () => {
      const closeSpy = new EventSpy(SbbOverlayElement.events.close, element);
      const closeButton = element.querySelector<HTMLButtonElement>('#close-with-attribute-result')!;

      // Assign a result that should override the attribute
      const overrideResult = { override: true };
      assignOverlayResult(closeButton, overrideResult);

      await openOverlay(element);

      closeButton.click();
      await closeSpy.calledOnce();

      const event = closeSpy.lastEvent as SbbOverlayCloseEvent;
      expect(event).to.be.instanceOf(SbbOverlayCloseEvent);
      expect(event.result).to.deep.equal(overrideResult);
      expect(event.result).not.to.equal('simple-result');
    });

    it('should emit SbbOverlayCloseEvent with null result when no result is provided', async () => {
      const closeSpy = new EventSpy(SbbOverlayElement.events.close, element);
      const closeButton = element.querySelector<HTMLButtonElement>('#close-without-result')!;

      await openOverlay(element);

      closeButton.click();
      await closeSpy.calledOnce();

      const event = closeSpy.lastEvent as SbbOverlayCloseEvent;
      expect(event).to.be.instanceOf(SbbOverlayCloseEvent);
      expect(event.result).to.be.null;
      expect(event.closeTarget).to.equal(closeButton);
    });

    it('should emit SbbOverlayCloseEvent with null closeTarget when closed programmatically', async () => {
      const closeSpy = new EventSpy(SbbOverlayElement.events.close, element);

      await openOverlay(element);

      element.close();
      await closeSpy.calledOnce();

      const event = closeSpy.lastEvent as SbbOverlayCloseEvent;
      expect(event).to.be.instanceOf(SbbOverlayCloseEvent);
      expect(event.result).to.be.null;
      expect(event.closeTarget).to.be.null;
    });

    it('should emit SbbOverlayCloseEvent with result when closed programmatically with result', async () => {
      const closeSpy = new EventSpy(SbbOverlayElement.events.close, element);

      await openOverlay(element);

      const programmaticResult = { reason: 'user-action' };
      element.close(programmaticResult);
      await closeSpy.calledOnce();

      const event = closeSpy.lastEvent as SbbOverlayCloseEvent;
      expect(event).to.be.instanceOf(SbbOverlayCloseEvent);
      expect(event.detail.returnValue).to.deep.equal(programmaticResult);
      expect(event.closeTarget).to.be.null;
    });

    it('should emit SbbOverlayCloseEvent with null closeTarget when closed via Escape', async () => {
      const closeSpy = new EventSpy(SbbOverlayElement.events.close, element);

      await openOverlay(element);

      await sendKeys({ press: 'Escape' });
      await closeSpy.calledOnce();

      const event = closeSpy.lastEvent as SbbOverlayCloseEvent;
      expect(event).to.be.instanceOf(SbbOverlayCloseEvent);
      expect(event.result).to.be.null;
      expect(event.closeTarget).to.be.null;
    });

    it('should emit result with closeTarget when close() is called with target parameter', async () => {
      const closeSpy = new EventSpy(SbbOverlayElement.events.close, element);
      const customTarget = element.querySelector<HTMLButtonElement>('#close-programmatically')!;

      await openOverlay(element);

      element.close({ custom: 'result' }, customTarget);
      await closeSpy.calledOnce();

      const event = closeSpy.lastEvent as SbbOverlayCloseEvent;
      expect(event).to.be.instanceOf(SbbOverlayCloseEvent);
      expect(event.detail.returnValue).to.deep.equal({ custom: 'result' });
      expect(event.closeTarget).to.equal(customTarget);
    });
  });
});

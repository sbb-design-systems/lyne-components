import { assert, aTimeout, expect } from '@open-wc/testing';
import { sendKeys, sendMouse, setViewport } from '@web/test-runner-commands';
import { html } from 'lit/static-html.js';
import type { Context } from 'mocha';

import type { SbbButtonElement } from '../button.ts';
import { mergeConfig } from '../core/config.ts';
import { fixture, sbbBreakpointLargeMinPx, tabKey } from '../core/testing/private.ts';
import { EventSpy, waitForLitRender } from '../core/testing.ts';
import type { SbbLinkElement } from '../link.ts';

import { SbbPopoverElement } from './popover.component.ts';

import '../button/button.ts';
import '../link.ts';

describe(`sbb-popover`, () => {
  let element: SbbPopoverElement,
    trigger: SbbButtonElement,
    openSpy: EventSpy<Event>,
    closeSpy: EventSpy<Event>;

  it('should inherit the delays from global configuration', async () => {
    element = document.createElement('sbb-popover');

    expect(element.openDelay).to.be.equal(0);
    expect(element.closeDelay).to.be.equal(0);

    mergeConfig({
      popover: {
        openDelay: 100,
        closeDelay: 200,
      },
    });

    expect(element.openDelay).to.be.equal(100);
    expect(element.closeDelay).to.be.equal(200);

    // reset global config
    mergeConfig({
      popover: undefined,
    });
  });

  describe('with interactive content', () => {
    beforeEach(async () => {
      const content = await fixture(html`
        <span>
          <sbb-button id="popover-trigger">Popover trigger</sbb-button>
          <sbb-popover id="popover" trigger="popover-trigger">
            Popover content.
            <sbb-link id="popover-link" href="#" sbb-popover-close>Link</sbb-link>
          </sbb-popover>
          <!-- Place the button with a spacing to the popover so that it gets clickable. -->
          <div>Spacer</div>
          <sbb-button id="interactive-background-element" style="margin-block-start:100px">
            Other interactive element
          </sbb-button>
        </span>
      `);
      trigger = content.querySelector<SbbButtonElement>('sbb-button')!;
      element = content.querySelector<SbbPopoverElement>('sbb-popover')!;
      openSpy = new EventSpy(SbbPopoverElement.events.open, element);
      closeSpy = new EventSpy(SbbPopoverElement.events.close, element);
    });

    it('renders', () => {
      assert.instanceOf(element, SbbPopoverElement);
    });

    it('shows the popover', async () => {
      const beforeOpenSpy = new EventSpy(SbbPopoverElement.events.beforeopen, element);

      element.open();

      await beforeOpenSpy.calledOnce();
      await openSpy.calledOnce();

      expect(element).to.match(':state(state-opened)');
    });

    it('shows on trigger click', async () => {
      trigger.click();

      await openSpy.calledOnce();
      expect(element).to.match(':state(state-opened)');
    });

    it('closes the popover', async () => {
      const beforeCloseSpy = new EventSpy(SbbPopoverElement.events.beforeclose, element);

      element.open();

      await openSpy.calledOnce();
      expect(element).to.match(':state(state-opened)');
      expect(element).to.match(':popover-open');

      element.close();

      await beforeCloseSpy.calledOnce();
      await closeSpy.calledOnce();
      expect(element).to.match(':state(state-closed)');
      expect(element).not.to.match(':popover-open');
    });

    it('closes the popover on close button click', async () => {
      const closeButton = element.shadowRoot!.querySelector<HTMLElement>('[sbb-popover-close]')!;

      element.open();

      await openSpy.calledOnce();
      expect(element).to.match(':state(state-opened)');

      closeButton!.click();

      await openSpy.calledOnce();

      expect(element).to.match(':state(state-closed)');
      expect(document.activeElement).to.be.equal(trigger);
    });

    it('closes on interactive element click', async () => {
      const popoverLink = element.querySelector(':scope > sbb-link') as HTMLElement;

      trigger.click();

      await openSpy.calledOnce();

      expect(element).to.match(':state(state-opened)');
      expect(popoverLink).not.to.be.null;

      popoverLink.click();

      await closeSpy.calledOnce();

      expect(element).to.match(':state(state-closed)');
      expect(document.activeElement).to.be.equal(trigger);
    });

    it('is correctly positioned on screen', async () => {
      await setViewport({ width: sbbBreakpointLargeMinPx, height: 800 });

      trigger.click();

      await openSpy.calledOnce();
      expect(openSpy.count).to.be.equal(1);
      expect(element).to.match(':state(state-opened)');

      const buttonHeight = getComputedStyle(document.documentElement).getPropertyValue(
        `--sbb-size-element-m`,
      );
      expect(buttonHeight.trim()).to.be.equal('3.5rem');

      const buttonHeightPx = parseFloat(buttonHeight) * 16;
      expect(trigger.offsetHeight).to.be.equal(buttonHeightPx);
      expect(trigger.offsetTop).to.be.equal(0);
      expect(trigger.offsetLeft).to.be.equal(0);

      // Expect overlay offsetTop to be equal to the trigger height + the overlay offset (8px)
      const popoverOverlay = element.shadowRoot!.querySelector<HTMLElement>('.sbb-popover')!;
      expect(popoverOverlay.offsetTop).to.be.equal(buttonHeightPx + 16);
      expect(popoverOverlay.offsetLeft).to.be.equal(0);
    });

    it('should set correct focus attribute on trigger after backdrop click', async () => {
      element.open();

      await openSpy.calledOnce();

      // Simulate backdrop click
      window.dispatchEvent(new MouseEvent('mousedown', { buttons: 1, clientX: 1 }));
      window.dispatchEvent(new PointerEvent('pointerup'));

      await closeSpy.calledOnce();

      expect(document.activeElement).to.be.equal(trigger);
    });

    it('should set correct focus attribute on trigger after backdrop click on an interactive element', async () => {
      const interactiveBackgroundElement = element.parentElement!.querySelector<SbbButtonElement>(
        '#interactive-background-element',
      )!;

      element.open();

      await openSpy.calledOnce();

      const interactiveElementPosition = interactiveBackgroundElement.getBoundingClientRect();
      await sendMouse({
        type: 'click',
        position: [
          Math.round(interactiveElementPosition.x + interactiveElementPosition.width / 2),
          Math.round(interactiveElementPosition.y + interactiveElementPosition.height / 2),
        ],
      });
      await closeSpy.calledOnce();

      expect(document.activeElement).to.be.equal(interactiveBackgroundElement);
    });

    it('closes on interactive element click by keyboard', async () => {
      const popoverLink = element.querySelector<SbbLinkElement>(':scope > sbb-link')!;

      trigger.click();

      await openSpy.calledOnce();

      expect(popoverLink).not.to.be.null;

      popoverLink.focus();
      await sendKeys({ press: 'Enter' });

      await closeSpy.calledOnce();

      expect(document.activeElement).to.be.equal(trigger);
    });

    it('opens and closes with non-zero animation duration', async function (this: Context) {
      (globalThis as { disableAnimation?: boolean }).disableAnimation = false;

      element.style.setProperty('--sbb-popover-animation-duration', '1ms');

      const popoverLink = element.querySelector<SbbLinkElement>(':scope > sbb-link')!;

      trigger.click();

      await openSpy.calledOnce();

      popoverLink.focus();
      await sendKeys({ press: 'Enter' });

      await closeSpy.calledOnce();
      expect(closeSpy.count).to.be.equal(1);
    });

    it('sets the focus to the first focusable element when the popover is opened by keyboard', async () => {
      await sendKeys({ press: tabKey });
      await sendKeys({ press: 'Enter' });

      await openSpy.calledOnce();
      expect(element).to.match(':state(state-opened)');

      expect(document.activeElement).to.be.equal(element);
      expect(
        document.activeElement!.shadowRoot!.activeElement ===
          document.activeElement!.shadowRoot!.querySelector('[sbb-popover-close]'),
      ).to.be.equal(true);
    });

    it('closes the popover on close button click by keyboard', async () => {
      const closeButton = document
        .querySelector('sbb-popover')!
        .shadowRoot!.querySelector<HTMLElement>('[sbb-popover-close]')!;

      element.open();

      await openSpy.calledOnce();
      await waitForLitRender(element);

      closeButton.focus();
      await sendKeys({ press: 'Enter' });
      await closeSpy.calledOnce();

      expect(document.activeElement).to.be.equal(trigger);
    });

    it('closes on Esc keypress', async () => {
      trigger.click();

      await openSpy.calledOnce();

      expect(element).to.match(':state(state-opened)');

      await sendKeys({ press: tabKey });
      await sendKeys({ press: 'Escape' });

      await closeSpy.calledOnce();

      expect(element).to.match(':state(state-closed)');
      expect(document.activeElement).to.be.equal(trigger);
    });

    it('does not open if prevented', async () => {
      const beforeOpenSpy = new EventSpy(SbbPopoverElement.events.beforeopen, element);

      element.addEventListener(SbbPopoverElement.events.beforeopen, (ev) => ev.preventDefault());
      element.open();

      await beforeOpenSpy.calledOnce();
      await waitForLitRender(element);

      expect(element).to.match(':state(state-closed)');
    });

    it('does not close if prevented', async () => {
      const beforeCloseSpy = new EventSpy(SbbPopoverElement.events.beforeclose, element);

      element.open();
      await openSpy.calledOnce();
      await waitForLitRender(element);

      element.addEventListener(SbbPopoverElement.events.beforeclose, (ev) => ev.preventDefault());
      element.close();

      await beforeCloseSpy.calledOnce();
      await waitForLitRender(element);

      expect(element).to.match(':state(state-opened)');
    });

    it('should update config when changing hoverTrigger', async () => {
      // Assert trigger click ok
      trigger.click();
      await openSpy.calledOnce();
      element.close();
      await closeSpy.calledOnce();

      // Assert hover does not trigger
      trigger.dispatchEvent(new Event('mouseenter'));
      await aTimeout(10);
      expect(element).to.match(':state(state-closed)');

      // Change to hover trigger
      element.hoverTrigger = true;
      await waitForLitRender(element);

      // Assert hover does trigger opening
      trigger.dispatchEvent(new Event('mouseenter'));
      await openSpy.calledTimes(2);

      // Close again
      element.close();
      await closeSpy.calledTimes(2);

      // Assert click does not trigger
      trigger.click();
      await aTimeout(0);
      expect(element).to.match(':state(state-closed)');
    });

    it('should handle hover closing on popover', async () => {
      // Change to hover trigger
      element.hoverTrigger = true;
      await waitForLitRender(element);

      const overlay = element.shadowRoot!.querySelector<HTMLElement>('.sbb-popover')!;

      // Assert hover does trigger opening
      trigger.dispatchEvent(new Event('mouseenter'));
      await openSpy.calledOnce();

      // Moving between trigger and overlay should not close the popover
      trigger.dispatchEvent(new Event('mouseleave'));
      overlay.dispatchEvent(new Event('mouseenter'));
      await aTimeout(0);
      expect(element.isOpen).to.be.true;
      overlay.dispatchEvent(new Event('mouseleave'));
      trigger.dispatchEvent(new Event('mouseenter'));
      await aTimeout(0);
      expect(element.isOpen).to.be.true;

      // Moving to overlay and leaving trigger should close the popover
      trigger.dispatchEvent(new Event('mouseleave'));
      overlay.dispatchEvent(new Event('mouseenter'));
      overlay.dispatchEvent(new Event('mouseleave'));

      await closeSpy.calledOnce();
      expect(element.isOpen).to.be.false;
    });

    it('should handle hover closing on popover with delay', async () => {
      // Change to hover trigger
      element.hoverTrigger = true;
      element.closeDelay = 2;
      await waitForLitRender(element);

      const overlay = element.shadowRoot!.querySelector<HTMLElement>('.sbb-popover')!;

      // Assert hover does trigger opening
      trigger.dispatchEvent(new Event('mouseenter'));
      await openSpy.calledOnce();

      // Moving to overlay and leaving trigger should close the popover
      trigger.dispatchEvent(new Event('mouseleave'));
      overlay.dispatchEvent(new Event('mouseenter'));
      overlay.dispatchEvent(new Event('mouseleave'));

      // After a tick, it should still be open
      await aTimeout(0);
      expect(element.isOpen).to.be.true;

      // After two milliseconds, it should be closed
      await aTimeout(2);
      expect(element.isOpen).to.be.false;
    });

    it('should handle hover closing on trigger with delay', async () => {
      // Change to hover trigger
      element.hoverTrigger = true;
      element.closeDelay = 2;
      await waitForLitRender(element);

      // Assert hover does trigger opening
      trigger.dispatchEvent(new Event('mouseenter'));
      await openSpy.calledOnce();

      // Leaving the trigger should close the popover
      trigger.dispatchEvent(new Event('mouseleave'));

      // After a tick, it should still be open
      await aTimeout(0);
      expect(element.isOpen).to.be.true;

      // After two milliseconds, it should be closed
      await aTimeout(2);
      expect(element.isOpen).to.be.false;
    });

    it('should update trigger connected by id', async () => {
      trigger.id = '';
      await waitForLitRender(element);
      expect(trigger.ariaHasPopup).to.be.null;

      trigger.id = 'popover-trigger';
      await waitForLitRender(element);
      expect(trigger.ariaHasPopup).not.to.be.null;
    });

    it('should accept trigger as HTML Element', async () => {
      trigger.id = '';
      await waitForLitRender(element);
      expect(trigger.ariaHasPopup).to.be.null;

      element.trigger = trigger;
      await waitForLitRender(element);
      expect(trigger.ariaHasPopup).not.to.be.null;
    });

    it('should allow removing the trigger', async () => {
      expect(trigger.ariaHasPopup).not.to.be.null;

      element.trigger = null;
      await waitForLitRender(element);
      expect(trigger.ariaHasPopup).to.be.null;
    });

    describe('interrupting opening and closing with non-zero animation duration', () => {
      beforeEach(() => {
        (globalThis as { disableAnimation?: boolean }).disableAnimation = false;
        element.style.setProperty('--sbb-popover-animation-duration', '5ms');
      });

      it('should close when closing during opening', async function (this: Context) {
        // Flaky on WebKit
        this.retries(3);

        const closeSpy = new EventSpy(SbbPopoverElement.events.close, element);

        element.open();
        await aTimeout(1);
        expect(element).to.match(':state(state-opening)');
        element.close();

        await closeSpy.calledOnce();
        expect(element.isOpen).to.be.false;
      });

      it('should close when closing during opening with Escape key', async function (this: Context) {
        // Flaky on WebKit
        this.retries(3);

        const closeSpy = new EventSpy(SbbPopoverElement.events.close, element);

        element.open();
        await aTimeout(1);
        expect(element).to.match(':state(state-opening)');
        await sendKeys({ press: 'Escape' });

        await closeSpy.calledOnce();
        expect(element.isOpen).to.be.false;
      });

      it('should open again when opening during closing', async function (this: Context) {
        // Flaky on WebKit
        this.retries(3);

        const openSpy = new EventSpy(SbbPopoverElement.events.open, element);

        element.open();
        await openSpy.calledOnce();

        element.close();
        await aTimeout(1);
        expect(element).to.match(':state(state-closing)');
        element.open();

        await openSpy.calledTimes(2);
        expect(element.isOpen).to.be.true;
      });
    });
  });

  describe('with no interactive content', () => {
    let content: HTMLElement, openSpy: EventSpy<Event>, closeSpy: EventSpy<Event>;

    beforeEach(async () => {
      content = await fixture(html`
        <span>
          <sbb-button id="popover-trigger">Popover trigger</sbb-button>
          <sbb-popover id="popover" trigger="popover-trigger" hide-close-button>
            Popover content.
          </sbb-popover>
          <!-- Place the button with a spacing to the popover so that it gets clickable. -->
          <sbb-button id="interactive-background-element" style="margin-block-start:100px">
            Other interactive element
          </sbb-button>
        </span>
      `);
      trigger = content.querySelector('sbb-button')!;
      element = content.querySelector('sbb-popover')!;

      openSpy = new EventSpy(SbbPopoverElement.events.open, element);
      closeSpy = new EventSpy(SbbPopoverElement.events.close, element);
    });

    it('should focus content container if no interactive content present', async () => {
      // When opening by keyboard
      trigger.focus();
      await sendKeys({ press: 'Space' });

      // Then popover opens and focuses container
      await openSpy.calledOnce();
      expect(document.activeElement!).to.equal(element);
      expect(element).to.have.attribute('tabindex', '0');

      // When tabbing away
      await sendKeys({ press: tabKey });

      // Then popover should close, next element should be focused and popover container be reset.
      await closeSpy.calledOnce();
      expect(document.activeElement).to.equal(
        content.querySelector('#interactive-background-element'),
      );
      expect(element).not.to.have.attribute('tabindex');
    });

    it('should handle blur event inside popover', async () => {
      element.open();
      await openSpy.calledOnce();

      expect(document.activeElement!).to.equal(element);
      expect(element).to.have.attribute('tabindex', '0');

      // Add focusable content
      const button = document.createElement('sbb-button');
      button.textContent = 'later added button';
      element.append(button);
      button.focus();

      // Fake blur event to simulate behavior on iOS mobile
      element.dispatchEvent(
        new FocusEvent('blur', {
          relatedTarget: button,
        }),
      );

      // Then popover should stay open, but tabindex should be removed
      await aTimeout(10);
      expect(element.isOpen, 'popover should stay open').to.be.true;
      expect(element).not.to.have.attribute('tabindex');
    });

    it('should remove tabindex when closing with esc', async () => {
      // When opening by keyboard
      trigger.focus();
      await sendKeys({ press: 'Space' });

      // Then popover opens and focuses container
      await openSpy.calledOnce();
      expect(document.activeElement!).to.equal(element);
      expect(element).to.have.attribute('tabindex', '0');

      // When pressing escape key
      await sendKeys({ press: 'Escape' });

      // Then popover should close, trigger should be focused and popover container be reset.
      await closeSpy.calledOnce();
      expect(document.activeElement).to.equal(trigger);
      expect(element).not.to.have.attribute('tabindex');
    });
  });

  it('should close an open popover when another one is opened', async () => {
    const root = await fixture(html`
      <div>
        <sbb-button id="interactive-background-element">Other interactive element</sbb-button>
        <sbb-button id="popover-trigger">Popover trigger</sbb-button>
        <sbb-button id="another-popover-trigger">Another popover trigger</sbb-button>
        <sbb-popover id="popover" trigger="popover-trigger"> Popover content. </sbb-popover>
        <sbb-popover id="another-popover" trigger="another-popover-trigger">
          Another popover content.
        </sbb-popover>
      </div>
    `);
    trigger = root.querySelector<SbbButtonElement>('#popover-trigger')!;
    element = root.querySelector<SbbPopoverElement>('#popover')!;
    const secondTrigger = root.querySelector<SbbButtonElement>('#another-popover-trigger');
    const secondElement = root.querySelector<SbbPopoverElement>('#another-popover');

    openSpy = new EventSpy(SbbPopoverElement.events.open, null, { capture: true });
    closeSpy = new EventSpy(SbbPopoverElement.events.close, null, {
      capture: true,
    });

    expect(secondTrigger).not.to.be.null;
    expect(secondElement).not.to.be.null;

    trigger.focus();
    await sendKeys({ press: 'Space' });

    await openSpy.calledOnce();

    expect(openSpy.count).to.be.equal(1);
    expect(element).to.match(':state(state-opened)');

    trigger.focus();
    await sendKeys({ press: tabKey });

    expect(document.activeElement!.id).to.be.equal('another-popover-trigger');

    await sendKeys({ press: 'Space' });

    await closeSpy.calledOnce();
    expect(closeSpy.count).to.be.equal(1);
    expect(element).to.match(':state(state-closed)');

    await openSpy.calledTimes(2);
    expect(openSpy.count).to.be.equal(2);
    expect(secondElement).to.match(':state(state-opened)');
  });

  it('init with HtmlElement as trigger', async () => {
    trigger = await fixture(html`<sbb-button>Popover trigger</sbb-button>`);
    element = await fixture(html`
      <sbb-popover id="popover" .trigger=${trigger}>
        Popover content.
        <sbb-link id="popover-link" href="#" sbb-popover-close>Link</sbb-link>
      </sbb-popover>
    `);

    const openSpy = new EventSpy(SbbPopoverElement.events.open, element);

    trigger.click();

    await openSpy.calledOnce();
    expect(openSpy.count).to.be.equal(1);

    expect(element).to.match(':state(state-opened)');
  });
});

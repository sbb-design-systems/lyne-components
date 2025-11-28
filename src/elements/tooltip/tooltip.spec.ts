import { assert, aTimeout, expect } from '@open-wc/testing';
import { resetMouse, sendKeys, sendMouse } from '@web/test-runner-commands';
import { html } from 'lit/static-html.js';
import type { Context } from 'mocha';

import type { SbbButtonElement } from '../button/button.ts';
import { mergeConfig } from '../core/config.ts';
import { fixture, tabKey } from '../core/testing/private.ts';
import { EventSpy, waitForLitRender } from '../core/testing.ts';

import { SbbTooltipElement } from './tooltip.component.ts';
import '../button/button.ts';

describe('sbb-tooltip', () => {
  let element: SbbTooltipElement;
  let trigger: SbbButtonElement;
  let openSpy: EventSpy<Event>;
  let closeSpy: EventSpy<Event>;

  describe('general behavior', () => {
    let otherElem: HTMLElement;

    afterEach(async () => {
      await resetMouse();
    });

    beforeEach(async () => {
      await fixture(html`
        <div style="padding: 2rem">
          <a href="#"></a>
          <sbb-button id="test-id">Button</sbb-button>
          <sbb-tooltip trigger="test-id">Test</sbb-tooltip>
          <a href="#"></a>
        </div>
      `);
      otherElem = document.querySelector('a')!;
      trigger = document.querySelector('sbb-button')!;
      element = document.querySelector('sbb-tooltip')!;
      openSpy = new EventSpy(SbbTooltipElement.events.open, element);
      closeSpy = new EventSpy(SbbTooltipElement.events.close, element);
    });

    it('renders', async () => {
      assert.instanceOf(element, SbbTooltipElement);
      expect(trigger.ariaDescribedByElements).contains(element);
    });

    it('should open on hover', async () => {
      const beforeOpenSpy = new EventSpy(SbbTooltipElement.events.beforeopen, element);
      const position = trigger.getBoundingClientRect();
      await sendMouse({ type: 'move', position: [position.x + 10, position.y + 10] });

      await beforeOpenSpy.calledOnce();
      await openSpy.calledOnce();
      expect(element).to.match(':state(state-opened)');
    });

    it('should close on mouse leave', async () => {
      const position = trigger.getBoundingClientRect();
      await sendMouse({ type: 'move', position: [position.x + 10, position.y + 10] });
      await openSpy.calledOnce();

      await sendMouse({ type: 'move', position: [position.x + 500, position.y + 500] });
      await closeSpy.calledOnce();

      expect(element).to.match(':state(state-closed)');
    });

    it('should open on focus', async () => {
      const beforeOpenSpy = new EventSpy(SbbTooltipElement.events.beforeopen, element);

      otherElem.focus();
      await sendKeys({ press: tabKey });

      await beforeOpenSpy.calledOnce();
      await openSpy.calledOnce();
      expect(element).to.match(':state(state-opened)');
    });

    it('should close on blur', async () => {
      otherElem.focus();
      await sendKeys({ press: tabKey });
      await openSpy.calledOnce();

      await sendKeys({ press: tabKey });

      await closeSpy.calledOnce();
      expect(element).to.match(':state(state-closed)');
    });

    it('should stay open when hovering the tooltip', async () => {
      const position = trigger.getBoundingClientRect();
      await sendMouse({ type: 'move', position: [position.x + 10, position.y + 10] });

      await openSpy.calledOnce();
      expect(element).to.match(':state(state-opened)');

      // Move the mouse on the tooltip (which is below-centered)
      await sendMouse({
        type: 'move',
        position: [position.x + Math.floor(position.width / 2), position.y + position.height + 20],
      });
      await aTimeout(200); // Wait some time to confirm it doesn't close

      expect(element).to.match(':state(state-opened)');
    });

    it('should not open when disabled', async () => {
      element.disabled = true;
      await waitForLitRender(element);

      const position = trigger.getBoundingClientRect();
      await sendMouse({ type: 'move', position: [position.x + 10, position.y + 10] });

      await aTimeout(200); // Wait some time to confirm it doesn't trigger

      expect(openSpy.count).to.equal(0);
      expect(element).to.match(':state(state-closed)');
    });

    it('should open on simulated long press', async () => {
      element.longPressCloseDelay = 200;
      await waitForLitRender(element);

      trigger.dispatchEvent(new Event('touchstart'));
      await aTimeout(600); // Simulate long press duration

      await openSpy.calledOnce();
      expect(openSpy.count).to.equal(1);

      trigger.dispatchEvent(new Event('touchend'));
      await closeSpy.calledOnce(); // Should close automatically after 'longPressCloseDelay'
      expect(closeSpy.count).to.equal(1);
    });

    it('should immediately close the tooltip on user interaction outside of it', async () => {
      element.closeDelay = 10000;
      await waitForLitRender(element);

      const position = trigger.getBoundingClientRect();
      await sendMouse({ type: 'move', position: [position.x + 10, position.y + 10] });

      await openSpy.calledOnce();
      expect(openSpy.count).to.equal(1);

      // Any click outside the tooltip should close it immediately
      await sendMouse({ type: 'click', position: [0, 0] });

      await closeSpy.calledOnce(); // Should close automatically after 'longPressCloseDelay'
      expect(closeSpy.count).to.equal(1);
    });

    it('should inherit the delays from global configuration', async () => {
      mergeConfig({
        tooltip: {
          openDelay: 100,
          closeDelay: 150,
          longPressCloseDelay: 1000,
        },
      });

      expect(element.openDelay).to.be.equal(100);
      expect(element.closeDelay).to.be.equal(150);
      expect(element.longPressCloseDelay).to.be.equal(1000);

      // reset global config
      mergeConfig({
        tooltip: undefined,
      });
    });

    describe('with delays', () => {
      beforeEach(async () => {
        element.openDelay = 200;
        element.closeDelay = 200;
        await waitForLitRender(element);
      });

      it('should open and close with delays', async function (this: Context) {
        this.retries(3); // This test involves delays, it can be flaky on ci
        const position = trigger.getBoundingClientRect();
        await sendMouse({ type: 'move', position: [position.x + 10, position.y + 10] });

        // Should not open immediately
        await aTimeout(0);
        expect(openSpy.count).to.equal(0);

        // Now wait until it opens
        await openSpy.calledOnce();
        expect(openSpy.count).to.equal(1);

        await sendMouse({ type: 'move', position: [position.x + 500, position.y + 500] });

        // Should not close immediately
        await aTimeout(50);
        expect(closeSpy.count).to.equal(0);

        await closeSpy.calledOnce();
        expect(closeSpy.count).to.equal(1);
      });

      it('should keep tooltip close when the mouse leaves before the openDelay', async function (this: Context) {
        this.retries(3); // This test involves delays, it can be flaky on ci
        const position = trigger.getBoundingClientRect();
        await sendMouse({ type: 'move', position: [position.x + 10, position.y + 10] }); // Mouse enters
        await aTimeout(0);
        await sendMouse({ type: 'move', position: [position.x + 500, position.y + 500] }); // Mouse leaves before the openDelay

        await aTimeout(300); // Wait some time to confirm it doesn't trigger
        expect(openSpy.count).to.equal(0);
      });

      it('should keep tooltip open when the mouse re-enter before the closeDelay', async function (this: Context) {
        this.retries(3); // This test involves delays, it can be flaky on ci
        element.openDelay = 0;
        await waitForLitRender(element);

        const position = trigger.getBoundingClientRect();
        await sendMouse({ type: 'move', position: [position.x + 10, position.y + 10] }); // Mouse enters
        await openSpy.calledOnce();

        await sendMouse({ type: 'move', position: [position.x + 500, position.y + 500] }); // Mouse leaves
        await sendMouse({ type: 'move', position: [position.x + 10, position.y + 10] }); // Mouse re-enters before closeDelay

        await aTimeout(300); // Wait some time to confirm it doesn't trigger
        expect(closeSpy.count).to.equal(0);
      });
    });
  });

  describe('attribute usages', () => {
    let tooltipOutlet: HTMLElement;

    beforeEach(async () => {
      await fixture(html`
        <div style="padding: 2rem">
          <sbb-button sbb-tooltip="Tooltip message">Button</sbb-button>
        </div>
      `);
      trigger = document.querySelector('sbb-button')!;
      element = document.querySelector('.sbb-overlay-outlet sbb-tooltip')!;
      tooltipOutlet = document.querySelector('.sbb-overlay-outlet')!;
      openSpy = new EventSpy(SbbTooltipElement.events.open, element);
      closeSpy = new EventSpy(SbbTooltipElement.events.close, element);
    });

    it('should link the tooltip to the trigger', async () => {
      expect(element.trigger!.localName).to.equal(trigger.localName);
      expect(trigger.ariaDescribedByElements).contains(element);

      const position = trigger.getBoundingClientRect();
      await sendMouse({ type: 'move', position: [position.x + 10, position.y + 10] });

      await openSpy.calledOnce();
      expect(element).to.match(':state(state-opened)');
    });

    it('should delete the tooltip if attribute is removed', async () => {
      expect(trigger.ariaDescribedByElements).not.to.be.null;

      trigger.removeAttribute('sbb-tooltip');
      await aTimeout(50); // wait for the MutationObserver to trigger

      expect(tooltipOutlet!.children).to.be.empty;
      expect(trigger.ariaDescribedByElements).to.be.null;
    });

    it('should delete the tooltip if the trigger is removed', async () => {
      trigger.remove();
      await aTimeout(50); // wait for the MutationObserver to trigger

      expect(tooltipOutlet!.children).to.be.empty;
    });

    it('should update tooltip message', async () => {
      trigger.setAttribute('sbb-tooltip', 'new message');
      await aTimeout(50); // wait for the MutationObserver to trigger

      expect(element.textContent).to.be.equal('new message');
    });

    it('should setup the tooltip outlet', async () => {
      expect(tooltipOutlet).to.exist;
      expect(document.querySelectorAll('.sbb-overlay-outlet').length).to.equal(1);
      expect(tooltipOutlet!.childElementCount).to.equal(1);
      expect(tooltipOutlet!.children[0].localName).to.equal('sbb-tooltip');
    });
  });

  describe('attribute usages - delay attributes', () => {
    beforeEach(async () => {
      await fixture(html`
        <div style="padding: 2rem">
          <sbb-button
            sbb-tooltip="Tooltip message"
            sbb-tooltip-open-delay="300"
            sbb-tooltip-close-delay="300"
            >Button</sbb-button
          >
        </div>
      `);
      trigger = document.querySelector('sbb-button')!;
      element = document.querySelector('.sbb-overlay-outlet sbb-tooltip')!;
    });

    it('should have the delays set', async () => {
      expect(element.openDelay).to.be.equal(300);
      expect(element.closeDelay).to.be.equal(300);
    });

    it('should update delays on attribute changes', async () => {
      trigger.setAttribute('sbb-tooltip-open-delay', '0');
      trigger.setAttribute('sbb-tooltip-close-delay', '0');
      await aTimeout(50); // wait for the MutationObserver to trigger

      expect(element.openDelay).to.be.equal(0);
      expect(element.closeDelay).to.be.equal(0);

      trigger.setAttribute('sbb-tooltip-open-delay', '1000');
      trigger.setAttribute('sbb-tooltip-close-delay', '500');
      await aTimeout(50); // wait for the MutationObserver to trigger

      expect(element.openDelay).to.be.equal(1000);
      expect(element.closeDelay).to.be.equal(500);
    });

    it('should not update delays if the sbb-tooltip attribute is removed', async () => {
      trigger.removeAttribute('sbb-tooltip');
      trigger.setAttribute('sbb-tooltip-open-delay', '0');
      trigger.setAttribute('sbb-tooltip-close-delay', '0');
      await aTimeout(50); // wait for the MutationObserver to trigger

      expect(element.openDelay).to.be.equal(300);
      expect(element.closeDelay).to.be.equal(300);
    });

    it('should reset delays if attributes are removed', async () => {
      trigger.removeAttribute('sbb-tooltip-open-delay');
      trigger.removeAttribute('sbb-tooltip-close-delay');
      await aTimeout(50); // wait for the MutationObserver to trigger

      expect(element.openDelay).to.be.equal(0);
      expect(element.closeDelay).to.be.equal(0);
    });
  });

  describe('attribute usages - position', () => {
    beforeEach(async () => {
      await fixture(html`
        <div style="padding: 2rem">
          <sbb-button
            sbb-tooltip="Tooltip message"
            sbb-tooltip-position="inline-end, inline-start, block-start"
            >Button</sbb-button
          >
        </div>
      `);
      trigger = document.querySelector('sbb-button')!;
      element = document.querySelector('.sbb-overlay-outlet sbb-tooltip')!;
    });

    it('should set position css vars', async () => {
      expect(element.style.getPropertyValue('--sbb-overlay-position-area')).to.be.equal(
        'inline-end',
      );
      expect(element.style.getPropertyValue('--sbb-overlay-position-try-fallbacks')).to.be.equal(
        'inline-start, block-start',
      );

      trigger.setAttribute('sbb-tooltip-position', 'top');
      await aTimeout(50); // wait for the MutationObserver to trigger
      expect(element.style.getPropertyValue('--sbb-overlay-position-area')).to.be.equal('top');
      expect(element.style.getPropertyValue('--sbb-overlay-position-try-fallbacks')).to.be.empty;
    });

    it('should update position css vars', async () => {
      trigger.setAttribute('sbb-tooltip-position', 'top, right');
      await aTimeout(50); // wait for the MutationObserver to trigger

      expect(element.style.getPropertyValue('--sbb-overlay-position-area')).to.be.equal('top');
      expect(element.style.getPropertyValue('--sbb-overlay-position-try-fallbacks')).to.be.equal(
        'right',
      );
    });

    it('should reset position css vars', async () => {
      trigger.removeAttribute('sbb-tooltip-position');
      await aTimeout(50); // wait for the MutationObserver to trigger

      expect(element.style.getPropertyValue('--sbb-overlay-position-area')).to.be.empty;
      expect(element.style.getPropertyValue('--sbb-overlay-position-try-fallbacks')).to.be.empty;
    });
  });
});

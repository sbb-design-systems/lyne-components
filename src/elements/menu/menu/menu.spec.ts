import { assert, aTimeout, expect } from '@open-wc/testing';
import { emulateMedia, sendKeys, sendMouse, setViewport } from '@web/test-runner-commands';
import { html } from 'lit/static-html.js';
import type { Context } from 'mocha';

import type { SbbButtonElement } from '../../button.ts';
import { isWebkit } from '../../core/dom.ts';
import {
  fixture,
  sbbBreakpointLargeMinPx,
  sbbBreakpointSmallMinPx,
  tabKey,
} from '../../core/testing/private.ts';
import { EventSpy, waitForCondition, waitForLitRender } from '../../core/testing.ts';
import type { SbbMenuButtonElement } from '../menu-button.ts';

import { SbbMenuElement } from './menu.component.ts';

import '../../button/button.ts';
import '../../link.ts';
import '../../divider.ts';
import '../menu-button.ts';

describe(`sbb-menu`, () => {
  let element: SbbMenuElement, trigger: SbbButtonElement;
  describe(`default`, () => {
    beforeEach(async () => {
      const root = await fixture(html`
        <div>
          <sbb-button id="menu-trigger">Menu trigger</sbb-button>
          <sbb-menu id="menu" trigger="menu-trigger">
            <sbb-block-link id="menu-link" href="#" size="xs">Profile</sbb-block-link>
            <sbb-menu-button id="menu-action-1" icon-name="tick-small">View</sbb-menu-button>
            <sbb-menu-button id="menu-action-2" icon-name="pen-small" sbb-badge="1" disabled>
              Edit
            </sbb-menu-button>
            <sbb-menu-button id="menu-action-3" icon-name="swisspass-small" sbb-badge="2">
              Details
            </sbb-menu-button>
            <sbb-divider id="menu-divider"></sbb-divider>
            <sbb-menu-button id="menu-action-4" icon-name="cross-small">Cancel</sbb-menu-button>
          </sbb-menu>
        </div>
      `);
      trigger = root.querySelector<SbbButtonElement>('sbb-button')!;
      element = root.querySelector<SbbMenuElement>('sbb-menu')!;
    });

    it('renders', () => {
      assert.instanceOf(element, SbbMenuElement);
    });

    it('opens on trigger click', async () => {
      const beforeOpenSpy = new EventSpy(SbbMenuElement.events.beforeopen, element);
      const openSpy = new EventSpy(SbbMenuElement.events.open, element);

      trigger.click();
      await waitForLitRender(element);
      await beforeOpenSpy.calledOnce();
      expect(beforeOpenSpy.count).to.be.equal(1);

      await openSpy.calledOnce();
      expect(openSpy.count).to.be.equal(1);

      expect(element).to.match(':state(state-opened)');
      expect(element).to.match(':popover-open');
    });

    it('closes on Esc keypress', async () => {
      const beforeOpenSpy = new EventSpy(SbbMenuElement.events.beforeopen, element);
      const openSpy = new EventSpy(SbbMenuElement.events.open, element);
      const beforeCloseSpy = new EventSpy(SbbMenuElement.events.beforeclose, element);
      const closeSpy = new EventSpy(SbbMenuElement.events.close, element);

      trigger.click();
      await waitForLitRender(element);

      await beforeOpenSpy.calledOnce();
      expect(beforeOpenSpy.count).to.be.equal(1);

      await openSpy.calledOnce();
      expect(openSpy.count).to.be.equal(1);
      expect(element).to.match(':state(state-opened)');

      await sendKeys({ press: tabKey });
      await waitForLitRender(element);

      await sendKeys({ press: 'Escape' });
      await waitForLitRender(element);

      await beforeCloseSpy.calledOnce();
      expect(beforeCloseSpy.count).to.be.equal(1);

      await closeSpy.calledOnce();
      expect(closeSpy.count).to.be.equal(1);

      expect(element).to.match(':state(state-closed)');
      expect(element).not.to.match(':popover-open');
    });

    it('keyboard navigation', async () => {
      const openSpy = new EventSpy(SbbMenuElement.events.open, element);
      trigger.click();
      await waitForLitRender(element);
      await openSpy.calledOnce();
      expect(openSpy.count).to.be.equal(1);
      expect(element).to.match(':state(state-opened)');

      // First element focused by default.
      expect(document.activeElement!.id).to.be.equal('menu-link');

      // Pressing an invalid key would not change the focus
      await sendKeys({ press: 'A' });
      await waitForLitRender(element);
      expect(document.activeElement!.id).to.be.equal('menu-link');

      // Move down with down arrow
      await sendKeys({ press: 'ArrowDown' });
      await waitForLitRender(element);
      expect(document.activeElement!.id).to.be.equal('menu-action-1');

      // Move down with down arrow; menu-action-2 is disabled, so the next focusable is menu-action-3
      await sendKeys({ press: 'ArrowDown' });
      await waitForLitRender(element);
      expect(document.activeElement!.id).to.be.equal('menu-action-3');

      // Move up with up arrow
      await sendKeys({ press: 'ArrowUp' });
      await waitForLitRender(element);
      expect(document.activeElement!.id).to.be.equal('menu-action-1');

      // Move up with up arrow will go to the last element due wrap
      await sendKeys({ press: 'ArrowUp' });
      await waitForLitRender(element);
      expect(document.activeElement!.id).to.be.equal('menu-action-4');

      // Move to first; the sbb-block-link is not a supported element, so move to the first sbb-menu-button
      await sendKeys({ press: 'PageUp' });
      await waitForLitRender(element);
      expect(document.activeElement!.id).to.be.equal('menu-action-1');

      // Move to last
      await sendKeys({ press: 'PageDown' });
      await waitForLitRender(element);
      expect(document.activeElement!.id).to.be.equal('menu-action-4');

      // Move to first
      await sendKeys({ press: 'Home' });
      await waitForLitRender(element);
      expect(document.activeElement!.id).to.be.equal('menu-action-1');

      // Move to last
      await sendKeys({ press: 'End' });
      await waitForLitRender(element);
      expect(document.activeElement!.id).to.be.equal('menu-action-4');
    });

    it('closes on menu action click', async () => {
      const beforeOpenSpy = new EventSpy(SbbMenuElement.events.beforeopen, element);
      const openSpy = new EventSpy(SbbMenuElement.events.open, element);
      const beforeCloseSpy = new EventSpy(SbbMenuElement.events.beforeclose, element);
      const closeSpy = new EventSpy(SbbMenuElement.events.close, element);
      const menuAction = element.querySelector(':scope > sbb-menu-button') as HTMLElement;

      trigger.click();
      await waitForLitRender(element);

      await beforeOpenSpy.calledOnce();
      expect(beforeOpenSpy.count).to.be.equal(1);

      await openSpy.calledOnce();
      expect(openSpy.count).to.be.equal(1);

      expect(element).to.match(':state(state-opened)');
      expect(menuAction).not.to.be.null;

      menuAction.click();
      await waitForLitRender(element);
      await beforeCloseSpy.calledOnce();
      expect(beforeCloseSpy.count).to.be.equal(1);

      await closeSpy.calledOnce();
      expect(closeSpy.count).to.be.equal(1);
      expect(element).to.match(':state(state-closed)');
    });

    it('closes on interactive element click', async () => {
      const beforeOpenSpy = new EventSpy(SbbMenuElement.events.beforeopen, element);
      const openSpy = new EventSpy(SbbMenuElement.events.open, element);
      const beforeCloseSpy = new EventSpy(SbbMenuElement.events.beforeclose, element);
      const closeSpy = new EventSpy(SbbMenuElement.events.close, element);
      const menuLink = element.querySelector(':scope > sbb-block-link') as HTMLElement;

      trigger.click();
      await waitForLitRender(element);

      await beforeOpenSpy.calledOnce();
      expect(beforeOpenSpy.count).to.be.equal(1);

      await openSpy.calledOnce();
      expect(openSpy.count).to.be.equal(1);

      expect(element).to.match(':state(state-opened)');
      expect(menuLink).not.to.be.null;

      menuLink.click();
      await waitForLitRender(element);

      await beforeCloseSpy.calledOnce();
      expect(beforeCloseSpy.count).to.be.equal(1);

      await closeSpy.calledOnce();
      expect(closeSpy.count).to.be.equal(1);

      expect(element).to.match(':state(state-closed)');
    });

    it('opens and closes with non-zero animation duration', async function (this: Context) {
      (globalThis as { disableAnimation?: boolean }).disableAnimation = false;

      element.style.setProperty('--sbb-menu-animation-duration', '1ms');
      const openSpy = new EventSpy(SbbMenuElement.events.open, element);
      const closeSpy = new EventSpy(SbbMenuElement.events.close, element);
      const menuLink = element.querySelector(':scope > sbb-block-link') as HTMLElement;

      trigger.click();
      await waitForLitRender(element);

      await openSpy.calledOnce();

      menuLink.click();
      await waitForLitRender(element);

      await closeSpy.calledOnce();

      expect(element).to.match(':state(state-closed)');
    });

    it('is correctly positioned on desktop', async () => {
      const beforeOpenSpy = new EventSpy(SbbMenuElement.events.beforeopen, element);
      const openSpy = new EventSpy(SbbMenuElement.events.open, element);
      await setViewport({ width: sbbBreakpointLargeMinPx, height: 800 });
      if (isWebkit) {
        // Needed to let media queries get applied on Webkit
        // TODO: Figure out why
        await aTimeout(50);
      }

      const menu: HTMLDivElement = element.shadowRoot!.querySelector<HTMLDivElement>('.sbb-menu')!;

      trigger.click();
      await waitForLitRender(element);

      await beforeOpenSpy.calledOnce();
      expect(beforeOpenSpy.count).to.be.equal(1);

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

      // Expect menu offsetTop to be equal to the trigger height + the menu offset (8px)
      expect(menu.offsetTop).to.be.equal(buttonHeightPx + 8);
      expect(menu.offsetLeft).to.be.equal(0);
    });

    it('is correctly positioned on mobile', async () => {
      const beforeOpenSpy = new EventSpy(SbbMenuElement.events.beforeopen, element);
      const openSpy = new EventSpy(SbbMenuElement.events.open, element);

      await setViewport({ width: sbbBreakpointSmallMinPx, height: 600 });
      const menu: HTMLDivElement = element.shadowRoot!.querySelector<HTMLDivElement>('.sbb-menu')!;

      trigger.click();
      await waitForLitRender(element);

      await beforeOpenSpy.calledOnce();
      expect(beforeOpenSpy.count).to.be.equal(1);

      await openSpy.calledOnce();
      expect(openSpy.count).to.be.equal(1);

      expect(element).to.match(':state(state-opened)');

      const menuOffsetTop = menu.offsetTop;
      const menuHeight = menu.offsetHeight;
      const pageHeight = window.innerHeight;

      expect(menuOffsetTop).to.be.equal(pageHeight - menuHeight);
    });

    it('sets the focus to the first focusable element when the menu is opened by keyboard', async () => {
      const beforeOpenSpy = new EventSpy(SbbMenuElement.events.beforeopen, element);
      const openSpy = new EventSpy(SbbMenuElement.events.open, element);

      trigger.focus();

      await sendKeys({ press: 'Enter' });
      await waitForLitRender(element);

      await beforeOpenSpy.calledOnce();
      expect(beforeOpenSpy.count).to.be.equal(1);

      await openSpy.calledOnce();
      expect(openSpy.count).to.be.equal(1);
      expect(element).to.match(':state(state-opened)');

      expect(document.activeElement!.id).to.be.equal('menu-link');
    });

    it('does not open if prevented', async () => {
      const beforeOpenSpy = new EventSpy(SbbMenuElement.events.beforeopen, element);

      element.addEventListener(SbbMenuElement.events.beforeopen, (ev) => ev.preventDefault());
      element.open();

      await beforeOpenSpy.calledOnce();
      expect(beforeOpenSpy.count).to.be.equal(1);
      await waitForLitRender(element);

      expect(element).to.match(':state(state-closed)');
    });

    it('does not close if prevented', async () => {
      const openSpy = new EventSpy(SbbMenuElement.events.open, element);
      const beforeCloseSpy = new EventSpy(SbbMenuElement.events.beforeclose, element);

      element.open();
      await waitForLitRender(element);
      await openSpy.calledOnce();

      element.addEventListener(SbbMenuElement.events.beforeclose, (ev) => ev.preventDefault());
      element.close();

      await waitForLitRender(element);
      await beforeCloseSpy.calledOnce();

      expect(element).to.match(':state(state-opened)');
    });

    it('does forward scroll event to document', async () => {
      const openSpy = new EventSpy(SbbMenuElement.events.open, element);

      element.open();
      await waitForLitRender(element);
      await openSpy.calledOnce();

      await setViewport({ width: 320, height: 300 });

      const scrollSpy = new EventSpy('scroll', document);
      const scrollContext = element.shadowRoot!.querySelector('.sbb-menu__content')!;

      scrollContext.scrollTo(0, 400);

      await scrollSpy.calledOnce();
      expect(scrollSpy.count).to.be.equal(1);
    });

    it('updates trigger connected by id', async () => {
      trigger.id = '';
      await waitForLitRender(element);
      expect(trigger.ariaHasPopup).to.be.null;

      trigger.id = 'menu-trigger';
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
      trigger = await fixture(html`<sbb-button id="menu-trigger">Menu trigger</sbb-button>`);
      element = await fixture(html`
        <sbb-menu id="menu" .trigger=${trigger}>
          <sbb-block-link id="menu-link" href="#" size="xs">Profile</sbb-block-link>
          <sbb-menu-button id="menu-action-1" icon-name="tick-small">View</sbb-menu-button>
        </sbb-menu>
      `);

      const beforeOpenSpy = new EventSpy(SbbMenuElement.events.beforeopen, element);
      const openSpy = new EventSpy(SbbMenuElement.events.open, element);

      trigger.click();

      await beforeOpenSpy.calledOnce();
      expect(beforeOpenSpy.count).to.be.equal(1);

      await openSpy.calledOnce();
      expect(openSpy.count).to.be.equal(1);

      expect(element).to.match(':state(state-opened)');
      expect(element).to.match(':popover-open');
    });

    it('it syncs slotted negative property', async () => {
      const link = element.querySelector('sbb-block-link')!;

      expect(link.negative).to.be.true;

      await emulateMedia({ colorScheme: 'dark' });
      await waitForCondition(() => !link.negative);

      expect(element).to.match(':state(dark)');
      expect(link.negative).to.be.false;

      await emulateMedia({ colorScheme: 'light' });
      await waitForCondition(() => link.negative);

      expect(link.negative).to.be.true;
    });
  });

  describe(`nested`, () => {
    let root: HTMLElement, nestedMenu: SbbMenuElement, nestedTrigger: SbbMenuButtonElement;

    beforeEach(async () => {
      root = await fixture(html`
        <div>
          <sbb-button id="menu-trigger">Menu trigger</sbb-button>
          <sbb-menu id="menu" trigger="menu-trigger">
            <sbb-block-link id="menu-link" href="#" size="xs">Profile</sbb-block-link>
            <sbb-menu-button id="menu-action-1" icon-name="tick-small">View</sbb-menu-button>
            <sbb-menu-button id="menu-action-2" icon-name="pen-small" sbb-badge="1" disabled>
              Edit
            </sbb-menu-button>
            <sbb-menu-button id="sub-menu-trigger"> More </sbb-menu-button>
            <sbb-menu-button id="menu-action-3" icon-name="swisspass-small" sbb-badge="2">
              Details
            </sbb-menu-button>
            <sbb-divider id="menu-divider"></sbb-divider>
            <sbb-menu-button id="menu-action-4" icon-name="cross-small">Cancel</sbb-menu-button>
          </sbb-menu>
          <sbb-menu id="sub-menu" trigger="sub-menu-trigger">
            <sbb-block-link id="menu-link" href="#" size="xs">Profile</sbb-block-link>
            <sbb-menu-button id="menu-action-1" icon-name="tick-small">View</sbb-menu-button>
            <sbb-menu-button id="menu-action-2" icon-name="pen-small" sbb-badge="1" disabled>
              Edit
            </sbb-menu-button>
            <sbb-menu-button id="menu-action-3" icon-name="swisspass-small" sbb-badge="2">
              Details
            </sbb-menu-button>
            <sbb-divider id="menu-divider"></sbb-divider>
            <sbb-menu-button id="menu-action-4" icon-name="cross-small">Cancel</sbb-menu-button>
          </sbb-menu>
        </div>
      `);
      trigger = root.querySelector<SbbButtonElement>('sbb-button')!;
      element = root.querySelector<SbbMenuElement>('sbb-menu#menu')!;
      nestedMenu = root.querySelector<SbbMenuElement>('sbb-menu#sub-menu')!;
      nestedTrigger = root.querySelector<SbbMenuButtonElement>('#sub-menu-trigger')!;
    });

    it('open nested menu on mouse hover', async () => {
      const openSpy = new EventSpy(SbbMenuElement.events.open, element);
      const nestedOpenSpy = new EventSpy(SbbMenuElement.events.open, nestedMenu);
      const closeSpy = new EventSpy(SbbMenuElement.events.close, nestedMenu);
      const otherButton = element.querySelector('#menu-action-1')!;

      await setViewport({ width: 1280, height: 800 });

      element.open();
      await waitForLitRender(element);
      await openSpy.calledOnce();

      nestedTrigger.dispatchEvent(new Event('mouseover', { bubbles: true }));
      await waitForLitRender(nestedMenu);

      await nestedOpenSpy.calledOnce();

      otherButton.dispatchEvent(new Event('mouseover', { bubbles: true }));
      await waitForLitRender(nestedMenu);

      await closeSpy.calledOnce();
    });

    it('shows back button in mobile mode', async () => {
      const openSpy = new EventSpy(SbbMenuElement.events.open, root, { capture: true });
      const backButton = nestedMenu.shadowRoot?.querySelector('#sbb-menu__back-button');
      await setViewport({ width: 1280, height: 800 });

      element.open();
      await waitForLitRender(element);
      await openSpy.calledOnce();

      nestedTrigger.dispatchEvent(new Event('mouseover', { bubbles: true }));
      await waitForLitRender(nestedMenu);

      await openSpy.calledTimes(2);
      expect(getComputedStyle(backButton!).display).to.be.equal('none');

      await setViewport({ width: 500, height: 300 });
      await waitForLitRender(nestedMenu);
      expect(getComputedStyle(backButton!).display).to.be.equal('block');
    });

    it('keyboard navigation', async () => {
      const openSpy = new EventSpy(SbbMenuElement.events.open, root, { capture: true });
      const closeSpy = new EventSpy(SbbMenuElement.events.close, root, { capture: true });
      await setViewport({ width: 1280, height: 800 });

      element.open();
      await waitForLitRender(element);
      await openSpy.calledOnce();

      // First element focused by default.
      expect(document.activeElement!.id).to.be.equal('menu-link');

      // Move down with down arrow
      await sendKeys({ press: 'ArrowDown' });
      await sendKeys({ press: 'ArrowDown' });

      expect(document.activeElement!.id).to.be.equal('sub-menu-trigger');

      // Open nested with right arrow
      await sendKeys({ press: 'ArrowRight' });
      await waitForLitRender(nestedMenu);

      await openSpy.calledTimes(2);
      // Should focus the first element of nested menu
      expect(document.activeElement!.id).to.be.equal('menu-link');

      // Wrap to last element with up arrow
      await sendKeys({ press: 'ArrowUp' });
      expect(document.activeElement!.id).to.be.equal('menu-action-4');

      // Close nested with left arrow
      await sendKeys({ press: 'ArrowLeft' });
      await waitForLitRender(nestedMenu);
      await closeSpy.calledOnce();

      expect(document.activeElement!.id).to.be.equal('sub-menu-trigger');

      // Open nested with right arrow
      await sendKeys({ press: 'ArrowRight' });
      await waitForLitRender(nestedMenu);
      await openSpy.calledTimes(3);

      // Close all menus with Esc
      await sendKeys({ press: 'Escape' });
      await closeSpy.calledTimes(3);
    });

    it('removed inert from nested menu upon opening', async () => {
      const openSpy = new EventSpy(SbbMenuElement.events.open, root, { capture: true });
      const closeSpy = new EventSpy(SbbMenuElement.events.close, root, { capture: true });

      expect(nestedMenu.inert).to.be.equal(false);

      // Opening outermost menu should inert every other element in dom
      element.open();
      await waitForLitRender(element);
      await openSpy.calledOnce();

      expect(nestedMenu.inert).to.be.equal(true);

      nestedMenu.open();
      await waitForLitRender(nestedMenu);
      await openSpy.calledTimes(2);

      // Open nested menus should be temporarily exempted from inert mechanism
      expect(nestedMenu.inert).to.be.equal(false);

      nestedMenu.close();
      await waitForLitRender(element);
      await closeSpy.calledOnce();

      // After closing inert should be restored
      expect(nestedMenu.inert).to.be.equal(true);
    });

    it('closeAll on nested menu should close outer menus too', async () => {
      const openSpy = new EventSpy(SbbMenuElement.events.open, root, { capture: true });
      const closeSpy = new EventSpy(SbbMenuElement.events.close, root, { capture: true });

      element.open();
      await waitForLitRender(element);
      await openSpy.calledOnce();

      nestedMenu.open();
      await waitForLitRender(nestedMenu);
      await openSpy.calledTimes(2);

      nestedMenu.closeAll();

      await waitForLitRender(element);
      await closeSpy.calledTimes(2);
    });

    it('closes all menus on backdrop click', async () => {
      const openSpy = new EventSpy(SbbMenuElement.events.open, root, { capture: true });
      const closeSpy = new EventSpy(SbbMenuElement.events.close, root, { capture: true });

      element.open();
      await waitForLitRender(element);
      await openSpy.calledOnce();

      nestedMenu.open();
      await waitForLitRender(nestedMenu);
      await openSpy.calledTimes(2);

      await sendMouse({
        type: 'click',
        position: [0, 0],
      });

      await waitForLitRender(element);
      await closeSpy.calledTimes(2);

      expect(element).to.match(':state(state-closed)');
      expect(nestedMenu).to.match(':state(state-closed)');

      element.open();
      await waitForLitRender(element);
      await openSpy.calledTimes(3);

      // If multiple menus are closed at the same time, when opening
      // the outermost menu again the nested ones should stay closed
      expect(element).to.match(':state(state-opened)');
      expect(nestedMenu).to.match(':state(state-closed)');
    });

    it('clicks need to start and end on backdrop to close menu', async () => {
      const openSpy = new EventSpy(SbbMenuElement.events.open, root, { capture: true });
      const firstElement = element.shadowRoot!.querySelector('.sbb-menu__content')!;
      const firstElementNested = nestedMenu.querySelector('sbb-block-link')!;
      await setViewport({ width: 1280, height: 800 });

      element.open();
      await waitForLitRender(element);
      await openSpy.calledOnce();

      nestedMenu.open();
      await waitForLitRender(nestedMenu);
      await openSpy.calledTimes(2);

      firstElementNested.dispatchEvent(new Event('pointerdown', { bubbles: true }));
      await waitForLitRender(element);

      root.dispatchEvent(new Event('pointerup', { bubbles: true }));
      await waitForLitRender(element);

      expect(element).to.match(':state(state-opened)');
      expect(nestedMenu).to.match(':state(state-opened)');

      root.dispatchEvent(new Event('pointerdown', { bubbles: true }));
      await waitForLitRender(element);

      firstElement.dispatchEvent(new Event('pointerup', { bubbles: true }));
      await waitForLitRender(element);

      expect(element).to.match(':state(state-opened)');
      expect(nestedMenu).to.match(':state(state-opened)');
    });
  });
});

import { assert, aTimeout, expect } from '@open-wc/testing';
import { sendKeys, setViewport } from '@web/test-runner-commands';
import { html } from 'lit/static-html.js';

import { fixture, sbbBreakpointLargeMinPx, tabKey } from '../../core/testing/private.ts';
import { EventSpy, waitForLitRender } from '../../core/testing.ts';
import { SbbMenuElement } from '../../menu.ts';
import type { SbbHeaderButtonElement } from '../header-button.ts';

import { SbbHeaderElement } from './header.component.ts';
import '../header-button.ts';

describe(`sbb-header`, () => {
  let element: SbbHeaderElement;

  beforeEach(async () => {
    await setViewport({ width: sbbBreakpointLargeMinPx, height: 600 });
  });

  it('renders', async () => {
    element = await fixture(html`<sbb-header></sbb-header>`);
    assert.instanceOf(element, SbbHeaderElement);
  });

  it('should be fixed on scroll', async () => {
    const root = await fixture(html`
      <div>
        <sbb-header></sbb-header>
        <div style="height: 2000px;"></div>
      </div>
    `);
    element = root.querySelector<SbbHeaderElement>('sbb-header')!;

    const scrollEventSpy = new EventSpy('scroll', document, { passive: true });
    window.scrollTo({ top: 200, behavior: 'instant' });
    await scrollEventSpy.calledOnce();

    expect(element).to.match(':state(shadow)');
  });

  it('should hide/show on scroll', async () => {
    const root = await fixture(html`
      <div>
        <sbb-header hide-on-scroll>
          <sbb-header-button id="action-1">Action 1</sbb-header-button>
          <sbb-header-button id="action-2">Action 2</sbb-header-button>
        </sbb-header>
        <div style="height: 2000px;"></div>
      </div>
    `);

    element = root.querySelector('sbb-header')!;
    const scrollEventSpy = new EventSpy('scroll', document, { passive: true });

    expect(element.scrollOrigin).not.to.be.undefined;
    expect(element.offsetHeight).to.be.equal(96);
    expect(root.offsetHeight).to.be.equal(2096);

    // Scroll bottom (0px to 400px): header fixed.
    window.scrollTo({ top: 400, behavior: 'instant' });
    await scrollEventSpy.calledOnce();

    // Scroll top (400px to 200px): header fixed and visible, with shadow and animated.
    window.scrollTo({ top: 200, behavior: 'instant' });
    await scrollEventSpy.calledTimes(2);

    await waitForLitRender(element);

    expect(element).to.match(':state(shadow)');
    expect(element).to.match(':state(animated)');
    expect(element).to.match(':state(fixed)');
    expect(element).to.match(':state(visible)');

    // Scroll bottom (0px to 400px): header fixed.
    window.scrollTo({ top: 400, behavior: 'instant' });
    await scrollEventSpy.calledTimes(3);

    expect(element).to.match(':state(animated)');
    expect(element).to.match(':state(fixed)');
    expect(element).not.to.match(':state(shadow)');
    expect(element).not.to.match(':state(visible)');
    expect(element).not.to.match(':state(has-visible-focus-within)');
    expect(window.getComputedStyle(element).getPropertyValue('--sbb-header-transform')).to.equal(
      'translate3d(0, -100%, 0)',
    );

    // Focus an element inside the header
    await sendKeys({ press: tabKey });
    expect(element).to.match(':state(has-visible-focus-within)');
    expect(window.getComputedStyle(element).getPropertyValue('--sbb-header-transform')).to.equal(
      'translate3d(0, 0, 0)',
    );

    // Scroll top (100 to 0px): initial situation.
    window.scrollTo({ top: 0, behavior: 'instant' });
    await scrollEventSpy.calledTimes(4);

    expect(element).not.to.match(':state(shadow)');
    expect(element).not.to.match(':state(animated)');
    expect(element).not.to.match(':state(fixed)');
    expect(element).not.to.match(':state(visible)');
  });

  it('should work with custom scrollOrigin', async () => {
    const root = await fixture(html`
      <div>
        <sbb-header hide-on-scroll scroll-origin="container">
          <sbb-header-button id="action-1">Action 1</sbb-header-button>
          <sbb-header-button id="action-2">Action 2</sbb-header-button>
        </sbb-header>
        <div
          id="container"
          style="position:fixed; inset: var(--sbb-header-height) 0 0 0; width: 100vw; overflow: auto;"
        >
          <div style="height: 2000px">Content</div>
        </div>
      </div>
    `);

    element = root.querySelector<SbbHeaderElement>('sbb-header')!;
    const scrollContext = root.querySelector<HTMLDivElement>('#container')!;
    expect(element.scrollOrigin).to.be.equal(scrollContext);
    expect(element.offsetHeight).to.be.equal(96);

    const scrollEventSpy = new EventSpy('scroll', scrollContext, { passive: true });

    // Scroll bottom (0px to 400px): header fixed.
    scrollContext.scrollTo({ top: 400, behavior: 'instant' });
    await scrollEventSpy.calledOnce();

    // Scroll top (400px to 200px): header fixed and visible, with shadow and animated.
    scrollContext.scrollTo({ top: 200, behavior: 'instant' });
    await scrollEventSpy.calledTimes(2);

    expect(scrollContext.scrollTop).to.be.equal(200);
    expect(element).to.match(':state(shadow)');
  });

  it('should respect custom scrollOrigin appearing in DOM after initialization', async () => {
    const root = await fixture(html`
      <div>
        <sbb-header hide-on-scroll scroll-origin="container">
          <sbb-header-button id="action-1">Action 1</sbb-header-button>
          <sbb-header-button id="action-2">Action 2</sbb-header-button>
        </sbb-header>
        <div
          style="position:fixed; inset: var(--sbb-header-height) 0 0 0; width: 100vw; overflow: auto;"
        >
          <div style="height: 2000px">Content</div>
        </div>
      </div>
    `);

    element = root.querySelector<SbbHeaderElement>('sbb-header')!;

    const scrollContext = root.querySelector<HTMLDivElement>('div > div')!;
    expect(element.scrollOrigin).to.be.null;
    expect(element.offsetHeight).to.be.equal(96);

    scrollContext.id = 'container';
    await aTimeout(100);
    await waitForLitRender(root);
    expect(element.scrollOrigin).to.be.equal(scrollContext);
    const scrollEventSpy = new EventSpy('scroll', scrollContext, { passive: true });

    // Scroll bottom (0px to 400px): header fixed.
    scrollContext.scrollTo({ top: 400, behavior: 'instant' });
    await scrollEventSpy.calledOnce();

    // Scroll top (400px to 200px): header fixed and visible, with shadow and animated.
    scrollContext.scrollTo({ top: 200, behavior: 'instant' });
    await scrollEventSpy.calledTimes(2);

    expect(scrollContext.scrollTop).to.be.equal(200);
    expect(element).to.match(':state(shadow)');
  });

  it('should close menu on scroll', async () => {
    const root = await fixture(html`
      <div>
        <sbb-header hide-on-scroll>
          <sbb-header-button id="language-menu-trigger">English</sbb-header-button>
          <sbb-menu trigger="language-menu-trigger">
            <sbb-menu-button>Deutsch</sbb-menu-button>
            <sbb-menu-button>Français</sbb-menu-button>
          </sbb-menu>
        </sbb-header>
        <div style="height: 2000px;"></div>
      </div>
    `);
    element = root.querySelector<SbbHeaderElement>('sbb-header')!;
    const scrollEventSpy = new EventSpy('scroll', document, { passive: true });

    // Scroll down a little bit
    window.scrollTo({ top: 250, behavior: 'instant' });
    await scrollEventSpy.calledTimes(1);

    // Scroll up to show header
    window.scrollTo({ top: 200, behavior: 'instant' });
    await scrollEventSpy.calledTimes(2);
    expect(element).to.match(':state(visible)');

    // Open menu
    const beforeOpenSpy = new EventSpy(SbbMenuElement.events.beforeopen, null, {
      capture: true,
    });
    const openSpy = new EventSpy(SbbMenuElement.events.open, null, { capture: true });
    const menuTrigger = root.querySelector<SbbHeaderButtonElement>('sbb-header-button')!;
    menuTrigger.click();
    await waitForLitRender(element);
    await beforeOpenSpy.calledOnce();
    expect(beforeOpenSpy.count).to.be.equal(1);
    await waitForLitRender(element);
    await openSpy.calledOnce();
    expect(openSpy.count).to.be.equal(1);
    await waitForLitRender(element);
    const menuId = menuTrigger.getAttribute('aria-controls');
    const menu = root.querySelector(`#${menuId}`);

    // Assert menu opened
    expect(menuTrigger).to.have.attribute('aria-controls');
    expect(menuTrigger).to.have.attribute('aria-expanded', 'true');
    expect(menu).to.match(':state(state-opened)');

    // Scroll down to hide header.
    window.scrollTo({ top: 250, behavior: 'instant' });
    await scrollEventSpy.calledTimes(3);
    await waitForLitRender(element);

    // Assert menu closed
    expect(element).not.to.match(':state(visible)');
    expect(menu).not.to.match(':state(state-opened)');
    expect(menuTrigger).to.have.attribute('aria-expanded', 'false');
  });
});

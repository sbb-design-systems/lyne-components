import { assert, aTimeout, expect } from '@open-wc/testing';
import { sendKeys, setViewport } from '@web/test-runner-commands';
import { html } from 'lit/static-html.js';

import { fixture, sbbBreakpointLargeMinPx, tabKey } from '../../core/testing/private.ts';
import { EventSpy, waitForCondition, waitForLitRender } from '../../core/testing.ts';
import { SbbMenuElement } from '../../menu.ts';
import type { SbbHeaderButtonElement } from '../header-button/header-button.component.ts';

import { SbbHeaderElement } from './header.component.ts';
import '../../header.ts';

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

  describe('sbb-header-scroll-origin attribute', () => {
    it('should use element with sbb-header-scroll-origin attribute as scroll origin', async () => {
      const root = await fixture(html`
        <div>
          <sbb-header></sbb-header>
          <div sbb-header-scroll-origin style="height: 300px; overflow: auto;">
            <div style="height: 2000px">Content</div>
          </div>
        </div>
      `);

      element = root.querySelector<SbbHeaderElement>('sbb-header')!;
      const scrollContainer = root.querySelector<HTMLDivElement>('[sbb-header-scroll-origin]')!;
      const scrollEventSpy = new EventSpy('scroll', scrollContainer, { passive: true });

      scrollContainer.scrollTo({ top: 200, behavior: 'instant' });
      await scrollEventSpy.calledOnce();

      await waitForCondition(() => element.matches(':state(shadow)'));
      expect(element).to.match(':state(shadow)');
    });

    it('should use the last sbb-header-scroll-origin element in DOM order when multiple exist', async () => {
      const root = await fixture(html`
        <div>
          <sbb-header></sbb-header>
          <div id="first" sbb-header-scroll-origin style="height: 300px; overflow: auto;">
            <div style="height: 2000px">
              <div id="last" sbb-header-scroll-origin style="height: 300px; overflow: auto;">
                <div style="height: 2000px">Last</div>
              </div>
            </div>
          </div>
        </div>
      `);

      element = root.querySelector<SbbHeaderElement>('sbb-header')!;
      const firstContainer = root.querySelector<HTMLDivElement>('#first')!;
      const lastContainer = root.querySelector<HTMLDivElement>('#last')!;

      // Scroll in the first container – header should NOT react (last one takes priority)
      const scrollOnFirstSpy = new EventSpy('scroll', firstContainer, { passive: true });
      firstContainer.scrollTo({ top: 200, behavior: 'instant' });
      await scrollOnFirstSpy.calledOnce();

      await waitForCondition(() => !element.matches(':state(shadow)'));

      // Scroll in the last container – header should react
      const scrollOnLastSpy = new EventSpy('scroll', lastContainer, { passive: true });
      lastContainer.scrollTo({ top: 200, behavior: 'instant' });
      await scrollOnLastSpy.calledOnce();

      await waitForCondition(() => element.matches(':state(shadow)'));
      expect(element).to.match(':state(shadow)');
    });

    it('should react when sbb-header-scroll-origin attribute is added dynamically', async () => {
      const root = await fixture(html`
        <div>
          <sbb-header></sbb-header>
          <div id="container" style="height: 300px; overflow: auto;">
            <div style="height: 2000px">Content</div>
          </div>
        </div>
      `);

      element = root.querySelector<SbbHeaderElement>('sbb-header')!;
      const scrollContainer = root.querySelector<HTMLDivElement>('#container')!;

      // Before adding the attribute, scrolling in the container should have no effect on the header.
      const scrollSpy = new EventSpy('scroll', scrollContainer, { passive: true });
      scrollContainer.scrollTo({ top: 200, behavior: 'instant' });
      await scrollSpy.calledOnce();
      await waitForCondition(() => !element.matches(':state(shadow)'));

      // Reset scroll position
      scrollContainer.scrollTo({ top: 0, behavior: 'instant' });
      await scrollSpy.calledTimes(2);

      // Dynamically add the attribute
      scrollContainer.setAttribute('sbb-header-scroll-origin', '');
      await aTimeout(30);
      await waitForLitRender(element);

      // Now the container should be the scroll origin
      scrollContainer.scrollTo({ top: 200, behavior: 'instant' });
      await scrollSpy.calledTimes(3);

      await waitForCondition(() => element.matches(':state(shadow)'));
      expect(element).to.match(':state(shadow)');
    });

    it('should fall back to document when sbb-header-scroll-origin attribute is removed dynamically', async () => {
      const root = await fixture(html`
        <div>
          <sbb-header></sbb-header>
          <div id="container" sbb-header-scroll-origin style="height: 300px; overflow: auto;">
            <div style="height: 2000px">Content</div>
          </div>
        </div>
      `);

      element = root.querySelector<SbbHeaderElement>('sbb-header')!;
      const scrollContainer = root.querySelector<HTMLDivElement>('#container')!;

      // Verify it is active
      const scrollSpy = new EventSpy('scroll', scrollContainer, { passive: true });
      scrollContainer.scrollTo({ top: 200, behavior: 'instant' });
      await scrollSpy.calledOnce();
      await waitForCondition(() => element.matches(':state(shadow)'));

      // Reset
      scrollContainer.scrollTo({ top: 0, behavior: 'instant' });
      await scrollSpy.calledTimes(2);

      await waitForCondition(() => !element.matches(':state(shadow)'));

      // Remove the attribute
      scrollContainer.removeAttribute('sbb-header-scroll-origin');
      await aTimeout(50);
      await waitForLitRender(element);

      // Scroll in the container should no longer affect the header
      scrollContainer.scrollTo({ top: 200, behavior: 'instant' });
      await scrollSpy.calledTimes(3);

      await waitForCondition(() => !element.matches(':state(shadow)'));
      expect(element).not.to.match(':state(shadow)');
    });

    it('should react when an element with sbb-header-scroll-origin is added to the DOM dynamically', async () => {
      const root = await fixture(html`
        <div>
          <sbb-header></sbb-header>
          <div style="height: 2000px">Content</div>
        </div>
      `);

      element = root.querySelector<SbbHeaderElement>('sbb-header')!;

      // Dynamically insert element with the attribute
      const scrollContainer = document.createElement('div');
      scrollContainer.setAttribute('sbb-header-scroll-origin', '');
      scrollContainer.style.cssText = 'height: 300px; overflow: auto;';
      scrollContainer.innerHTML = '<div style="height: 2000px">Content</div>';
      root.appendChild(scrollContainer);
      await aTimeout(50);
      await waitForLitRender(element);

      const scrollSpy = new EventSpy('scroll', scrollContainer, { passive: true });
      scrollContainer.scrollTo({ top: 200, behavior: 'instant' });
      await scrollSpy.calledOnce();

      await waitForCondition(() => element.matches(':state(shadow)'));
      expect(element).to.match(':state(shadow)');
    });

    it('should not consider a disconnected element as scroll origin when a connected one exists', async () => {
      const root = await fixture(html`
        <div>
          <sbb-header></sbb-header>
          <div id="remaining" sbb-header-scroll-origin style="height: 300px; overflow: auto;">
            <div style="height: 2000px">Remaining container</div>
          </div>
          <div id="removed-parent">
            <div id="removed-child" sbb-header-scroll-origin style="height: 300px; overflow: auto;">
              <div style="height: 2000px">Removed child container</div>
            </div>
          </div>
        </div>
      `);

      element = root.querySelector<SbbHeaderElement>('sbb-header')!;
      const removedParent = root.querySelector<HTMLDivElement>('#removed-parent')!;
      const remainingContainer = root.querySelector<HTMLDivElement>('#remaining')!;

      // Remove the parent.
      removedParent.remove();
      await aTimeout(30);

      // The remaining connected container must now be the sole active scroll origin.
      remainingContainer.scrollTo({ top: 200, behavior: 'instant' });

      await waitForCondition(() => element.matches(':state(shadow)'));
      expect(element).to.match(':state(shadow)');
    });

    it('scroll-origin property should take priority over sbb-header-scroll-origin attribute', async () => {
      const root = await fixture(html`
        <div>
          <sbb-header scroll-origin="prop-container"></sbb-header>
          <div id="prop-container" style="height: 300px; overflow: auto;">
            <div style="height: 2000px">Prop container</div>
          </div>
          <div id="attr-container" sbb-header-scroll-origin style="height: 300px; overflow: auto;">
            <div style="height: 2000px">Attr container</div>
          </div>
        </div>
      `);

      element = root.querySelector<SbbHeaderElement>('sbb-header')!;
      const propContainer = root.querySelector<HTMLDivElement>('#prop-container')!;
      const attrContainer = root.querySelector<HTMLDivElement>('#attr-container')!;

      // Scrolling in attr-container should NOT set shadow (prop-container takes priority)
      const attrScrollSpy = new EventSpy('scroll', attrContainer, { passive: true });
      attrContainer.scrollTo({ top: 200, behavior: 'instant' });
      await attrScrollSpy.calledOnce();

      await waitForCondition(() => !element.matches(':state(shadow)'));

      // Scrolling in prop-container should set shadow
      const propScrollSpy = new EventSpy('scroll', propContainer, { passive: true });
      propContainer.scrollTo({ top: 200, behavior: 'instant' });
      await propScrollSpy.calledOnce();

      await waitForCondition(() => element.matches(':state(shadow)'));
      expect(element).to.match(':state(shadow)');
    });
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
    const menu = root.querySelector(`sbb-menu`);

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

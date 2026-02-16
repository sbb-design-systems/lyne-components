import { assert, aTimeout, expect } from '@open-wc/testing';
import { sendKeys, sendMouse, setViewport } from '@web/test-runner-commands';
import { html } from 'lit/static-html.js';
import type { Context } from 'mocha';

import {
  fixture,
  sbbBreakpointLargeMinPx,
  sbbBreakpointSmallMinPx,
  sbbBreakpointUltraMinPx,
  tabKey,
} from '../../core/testing/private.ts';
import { EventSpy, waitForCondition, waitForLitRender } from '../../core/testing.ts';
import type { SbbNavigationButtonElement } from '../navigation-button.ts';
import { SbbNavigationElement } from '../navigation.ts';

import { SbbNavigationSectionElement } from './navigation-section.component.ts';

import '../navigation-list.ts';
import '../navigation-button.ts';

describe(`sbb-navigation-section`, () => {
  let element: SbbNavigationSectionElement,
    trigger: SbbNavigationButtonElement,
    root: SbbNavigationElement;

  beforeEach(async () => {
    root = await fixture(html`
      <sbb-navigation>
        <sbb-navigation-button id="navigation-section-trigger">Trigger</sbb-navigation-button>
        <sbb-navigation-button id="navigation-button-2">
          Other element beside trigger
        </sbb-navigation-button>
        <sbb-navigation-button id="navigation-button-3">
          Last beside trigger
        </sbb-navigation-button>
        <sbb-navigation-section trigger="navigation-section-trigger">
          <sbb-navigation-list>
            <sbb-navigation-button id="first-navigation-section-button" size="m">
              Tickets & Offers
            </sbb-navigation-button>
            <sbb-navigation-button id="navigation-section-button-2" size="m">
              Vacations & Recreation
            </sbb-navigation-button>
            <sbb-navigation-button id="navigation-section-button-3" size="m">
              Travel information
            </sbb-navigation-button>
            <sbb-navigation-button id="last-navigation-section-button" size="m">
              Help & Contact
            </sbb-navigation-button>
          </sbb-navigation-list>
        </sbb-navigation-section>
      </sbb-navigation>
    `);
    element = root.querySelector('sbb-navigation-section')!;
    trigger = root.querySelector('sbb-navigation-button')!;
    const openSpy = new EventSpy(SbbNavigationElement.events.open, root);

    // Open surrounding navigation
    root.open();
    await openSpy.calledOnce();

    // Start with closed navigation section for all the tests
    element.close();
    await waitForCondition(() => element.matches(':state(state-closed)'));
    expect(element).to.match(':state(state-closed)');
  });

  it('renders', async () => {
    assert.instanceOf(element, SbbNavigationSectionElement);
  });

  it('opens the section', async () => {
    element.open();
    await waitForLitRender(element);

    await waitForCondition(() => element.matches(':state(state-opened)'));
    expect(element).to.match(':state(state-opened)');
  });

  it('closes the section', async () => {
    element.open();
    await waitForLitRender(element);

    await waitForCondition(() => element.matches(':state(state-opened)'));
    expect(element).to.match(':state(state-opened)');
    expect(element).not.to.have.attribute('inert');

    element.close();
    await waitForLitRender(element);

    await waitForCondition(() => element.matches(':state(state-closed)'));
    expect(element).to.match(':state(state-closed)');
    expect(element).to.have.attribute('inert');
  });

  it('opens and closes with non-zero animation duration', async function (this: Context) {
    (globalThis as { disableAnimation?: boolean }).disableAnimation = false;

    element.style.setProperty('--sbb-navigation-section-animation-duration', '1ms');

    element.open();
    await waitForLitRender(element);
    await waitForCondition(() => element.matches(':state(state-opened)'));
    expect(element).to.match(':state(state-opened)');
    element.close();
    await waitForLitRender(element);

    await waitForCondition(() => element.matches(':state(state-closed)'));
    expect(element).to.match(':state(state-closed)');
  });

  it('should update trigger connected by id', async () => {
    trigger.id = '';
    await waitForLitRender(element);
    expect(trigger.ariaHasPopup).to.be.null;

    trigger.id = 'navigation-section-trigger';
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

  it('add and remove inert on navigation content when switching breakpoints', async function () {
    // Flaky on Webkit
    this.retries(3);

    element.open();
    await waitForLitRender(element);

    await waitForCondition(() => element.matches(':state(state-opened)'));
    expect(element).to.match(':state(state-opened)');

    await setViewport({ width: sbbBreakpointLargeMinPx, height: 600 });
    await aTimeout(200);
    expect(
      root.shadowRoot!.querySelector<HTMLElement>('.sbb-navigation__content')!.inert,
      'large viewport',
    ).to.be.false;

    await setViewport({ width: sbbBreakpointSmallMinPx, height: 600 });
    await aTimeout(200);
    expect(
      root.shadowRoot!.querySelector<HTMLElement>('.sbb-navigation__content')!.inert,
      'small viewport',
    ).to.be.true;
  });

  describe('on desktop viewport', () => {
    beforeEach(async () => {
      await setViewport({ width: sbbBreakpointUltraMinPx, height: 600 });
    });

    it('should wrap around tabbing forwards', async () => {
      trigger.focus();
      await sendKeys({ press: 'Enter' });
      expect(document.activeElement!.id).to.be.equal('first-navigation-section-button');

      // Should stay inside section
      await sendKeys({ press: tabKey });
      expect(document.activeElement!.id).to.be.equal('navigation-section-button-2');

      // Skip to last
      element.querySelector<SbbNavigationButtonElement>('#last-navigation-section-button')!.focus();
      await sendKeys({ press: tabKey });
      // Should land in navigation on next element beside trigger
      expect(document.activeElement!.id).to.be.equal('navigation-button-2');
    });

    it('should wrap around tabbing backwards', async () => {
      trigger.focus();
      await sendKeys({ press: 'Enter' });
      expect(document.activeElement!.id).to.be.equal('first-navigation-section-button');

      await sendKeys({ press: `Shift+${tabKey}` });
      expect(document.activeElement!.id).to.be.equal('navigation-section-trigger');

      await sendKeys({ press: tabKey });
      // Should land in navigation on next element beside trigger
      expect(document.activeElement!.id).to.be.equal('navigation-button-2');
    });

    it('should wrap around tabbing backwards and land on close button when trigger is last element', async () => {
      trigger = root.querySelector('#navigation-button-3')!;
      element.trigger = trigger;
      await waitForLitRender(root);

      trigger.focus();
      await sendKeys({ press: 'Enter' });
      expect(document.activeElement!.id).to.be.equal('first-navigation-section-button');

      // Skip to last
      element.querySelector<SbbNavigationButtonElement>('#last-navigation-section-button')!.focus();
      expect(document.activeElement!.id).to.be.equal('last-navigation-section-button');

      await sendKeys({ press: tabKey });
      expect(document.activeElement!.shadowRoot!.activeElement!.id).to.be.equal(
        'sbb-navigation-close-button',
      );
    });

    it('should not manipulate focus when using mouse', async () => {
      element.open();
      expect(document.activeElement!.id).to.be.equal('first-navigation-section-button');

      // Should stay inside section
      await sendKeys({ press: tabKey });
      expect(document.activeElement!.id).to.be.equal('navigation-section-button-2');

      const positionRect = root.querySelector('#navigation-button-3')!.getBoundingClientRect();
      await sendMouse({
        type: 'click',
        position: [
          Math.round(positionRect.x + window.scrollX + positionRect.width / 2),
          Math.round(positionRect.y + window.scrollY + positionRect.height / 2),
        ],
      });
      expect(document.activeElement!.id).to.be.equal('navigation-button-3');
    });

    it('should close and move focus on Escape key press', async function (this: Context) {
      // Flaky on Webkit
      this.retries(3);
      const closeSpy = new EventSpy(SbbNavigationElement.events.close, root);

      trigger.focus();
      await sendKeys({ press: 'Enter' });
      expect(document.activeElement!.id).to.be.equal('first-navigation-section-button');

      await sendKeys({ press: 'Escape' });
      await closeSpy.calledOnce();
      await aTimeout(30);

      expect(root.contains(document.activeElement)).to.be.false;
    });
  });

  describe('on mobile viewport', () => {
    beforeEach(async () => {
      await setViewport({ width: sbbBreakpointSmallMinPx, height: 400 });
    });

    it('should wrap around tabbing', async () => {
      // Open by keyboard
      trigger.focus();
      await sendKeys({ press: 'Enter' });
      expect(document.activeElement!.shadowRoot!.activeElement).to.have.attribute(
        'sbb-navigation-section-close',
      );

      // Should land on first navigation section button
      await sendKeys({ press: tabKey });
      expect(document.activeElement!.id).to.be.equal('first-navigation-section-button');

      // Should stay inside section
      await sendKeys({ press: tabKey });
      expect(document.activeElement!.id).to.be.equal('navigation-section-button-2');

      // Skip to last
      element.querySelector<SbbNavigationButtonElement>('#last-navigation-section-button')!.focus();

      // Should land on close button
      await sendKeys({ press: tabKey });
      expect(document.activeElement!.shadowRoot!.activeElement).to.have.attribute(
        'sbb-navigation-close',
      );

      // Should land on back button
      await sendKeys({ press: tabKey });
      expect(document.activeElement!.shadowRoot!.activeElement).to.have.attribute(
        'sbb-navigation-section-close',
      );

      // Should land on first section element
      await sendKeys({ press: tabKey });
      expect(document.activeElement!.id).to.be.equal('first-navigation-section-button');
    });
  });

  it('should update inert state on viewport change', async () => {
    const navigationContent = root.shadowRoot!.querySelector<HTMLDivElement>(
      '.sbb-navigation__content',
    )!;

    // Start on mobile
    await setViewport({ width: sbbBreakpointSmallMinPx, height: 400 });
    await aTimeout(200);

    element.open();
    await waitForCondition(() => element.matches(':state(state-opened)'));

    // Navigation should be inert
    await waitForCondition(() => navigationContent.inert);
    expect(navigationContent).to.have.attribute('inert');

    // Switch to desktop
    await setViewport({ width: sbbBreakpointUltraMinPx, height: 400 });

    // Navigation should not be inert
    await waitForCondition(() => !navigationContent.inert);
    expect(navigationContent).not.to.have.attribute('inert');
  });
});

import { assert, expect, nextFrame } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import { html } from 'lit/static-html.js';

import type { SbbButtonElement } from '../../button.ts';
import { pageScrollDisabled } from '../../core/dom.ts';
import { fixture, tabKey } from '../../core/testing/private.ts';
import { EventSpy, waitForCondition, waitForLitRender } from '../../core/testing.ts';
import type { SbbNavigationButtonElement } from '../navigation-button.ts';
import type { SbbNavigationSectionElement } from '../navigation-section.ts';

import { SbbNavigationElement } from './navigation.component.ts';

import '../navigation-button.ts';
import '../navigation-marker.ts';
import '../navigation-section.ts';

describe(`sbb-navigation`, () => {
  let element: SbbNavigationElement, trigger: HTMLElement;

  beforeEach(async () => {
    const root = await fixture(
      html`<div>
        <button id="navigation-trigger"></button>
        <sbb-navigation trigger="navigation-trigger">
          <sbb-navigation-marker>
            <sbb-navigation-button id="action-1">Tickets & Offers</sbb-navigation-button>
            <sbb-navigation-button id="action-2">Vacations & Recreation</sbb-navigation-button>
            <sbb-navigation-button>Travel information</sbb-navigation-button>
            <sbb-navigation-button sbb-navigation-close>Help & Contact</sbb-navigation-button>
          </sbb-navigation-marker>

          <sbb-navigation-section trigger="action-1" id="first-section">
            <sbb-navigation-button sbb-navigation-section-close>Label</sbb-navigation-button>
            <sbb-navigation-button>Label</sbb-navigation-button>
          </sbb-navigation-section>
          <sbb-navigation-section trigger="action-2" id="second-section">
            <sbb-navigation-button>Label</sbb-navigation-button>
            <sbb-navigation-button>Label</sbb-navigation-button>
          </sbb-navigation-section>
        </sbb-navigation>
      </div> `,
    );

    element = root.querySelector('sbb-navigation')!;
    trigger = root.querySelector('button')!;
  });

  it('renders', () => {
    assert.instanceOf(element, SbbNavigationElement);
  });

  it('opens the navigation', async () => {
    const openSpy = new EventSpy(SbbNavigationElement.events.open, element);

    element.open();
    await waitForLitRender(element);

    await openSpy.calledOnce();
    expect(openSpy.count).to.be.equal(1);
    await waitForLitRender(element);

    expect(element).to.match(':state(state-opened)');
    expect(element).to.match(':popover-open');
  });

  it('focuses the element with sbb-focus-initial', async () => {
    const openSpy = new EventSpy(SbbNavigationElement.events.open, element);

    const action2 = element.querySelector('#action-2')!;
    action2.toggleAttribute('sbb-focus-initial', true);

    element.open();
    await openSpy.calledOnce();

    expect(document.activeElement).to.be.equal(action2);
  });

  it('sets the initial active actions and focuses on the close button', async () => {
    element = await fixture(html`
      <sbb-navigation>
        <sbb-navigation-marker>
          <sbb-navigation-button>Tickets & Offers</sbb-navigation-button>
          <sbb-navigation-button id="action-active-1" class="sbb-active">
            Vacations & Recreation
          </sbb-navigation-button>
        </sbb-navigation-marker>

        <sbb-navigation-marker>
          <sbb-navigation-button id="action-active-2" class="sbb-active">
            English
          </sbb-navigation-button>
          <sbb-navigation-button>German</sbb-navigation-button>
        </sbb-navigation-marker>
      </sbb-navigation>
    `);

    const openSpy = new EventSpy(SbbNavigationElement.events.open, element);
    const action2 = element.querySelector<SbbNavigationButtonElement>(
      ':scope > sbb-navigation-marker > sbb-navigation-button#action-active-1',
    )!;
    const action3 = element.querySelector<SbbNavigationButtonElement>(
      ':scope > sbb-navigation-marker > sbb-navigation-button#action-active-2',
    )!;

    element.open();
    await waitForLitRender(element);

    await openSpy.calledOnce();
    expect(openSpy.count).to.be.equal(1);
    expect(element).to.match(':state(state-opened)');
    expect(action2).to.match(':state(action-active)');
    expect(action3).to.match(':state(action-active)');
    expect(element.shadowRoot?.activeElement?.id).to.be.equal('sbb-navigation-close-button');
  });

  it('sets the initial active action and opens the connected section', async () => {
    element = await fixture(html`
      <sbb-navigation>
        <sbb-navigation-marker>
          <sbb-navigation-button>Tickets & Offers</sbb-navigation-button>
          <sbb-navigation-button id="action-active" class="sbb-active">
            Vacations & Recreation
          </sbb-navigation-button>
        </sbb-navigation-marker>

        <sbb-navigation-section trigger="action-active" id="active-section">
          <sbb-navigation-button>Label</sbb-navigation-button>
          <sbb-navigation-button id="section-action-active" class="sbb-active">
            Label
          </sbb-navigation-button>
        </sbb-navigation-section>
      </sbb-navigation>
    `);

    const openSpy = new EventSpy(SbbNavigationElement.events.open, element);
    const actionActive = element.querySelector<SbbNavigationButtonElement>(
      ':scope > sbb-navigation-marker > sbb-navigation-button#action-active',
    )!;
    const sectionActionActive = element.querySelector<SbbNavigationButtonElement>(
      ':scope > sbb-navigation-section > sbb-navigation-button#section-action-active',
    )!;
    const activeSection = element.querySelector<SbbNavigationButtonElement>(
      ':scope > sbb-navigation-section#active-section',
    )!;

    element.open();
    await waitForLitRender(element);

    await openSpy.calledOnce();
    expect(openSpy.count).to.be.equal(1);
    expect(element).to.match(':state(state-opened)');
    expect(actionActive).to.match(':state(action-active)');
    expect(sectionActionActive).to.match(':state(action-active)');
    expect(activeSection).to.match(':state(state-opened)');
  });

  it('resets the markers on navigation close', async () => {
    element = await fixture(html`
      <sbb-navigation>
        <sbb-navigation-marker>
          <sbb-navigation-button id="first-action">Tickets & Offers</sbb-navigation-button>
          <sbb-navigation-button id="second-action" class="sbb-active"
            >Vacations & Recreation</sbb-navigation-button
          >
        </sbb-navigation-marker>

        <sbb-navigation-marker>
          <sbb-navigation-button id="third-action" class="sbb-active"
            >English</sbb-navigation-button
          >
          <sbb-navigation-button id="forth-action">German</sbb-navigation-button>
        </sbb-navigation-marker>
      </sbb-navigation>
    `);

    const closeSpy = new EventSpy(SbbNavigationElement.events.close, element);
    const openSpy = new EventSpy(SbbNavigationElement.events.open, element);
    const action1 = element.querySelector<SbbNavigationButtonElement>('#first-action')!;
    const action2 = element.querySelector<SbbNavigationButtonElement>('#second-action')!;
    const action3 = element.querySelector<SbbNavigationButtonElement>('#third-action')!;
    const action4 = element.querySelector<SbbNavigationButtonElement>('#forth-action')!;

    element.open();
    await waitForLitRender(element);

    await openSpy.calledOnce();
    expect(openSpy.count).to.be.equal(1);
    expect(element).to.match(':state(state-opened)');
    expect(action2).to.match(':state(action-active)');
    expect(action3).to.match(':state(action-active)');

    action1.click();
    action4.click();

    await waitForLitRender(element);

    expect(action1).to.match(':state(action-active)');
    expect(action4).to.match(':state(action-active)');

    expect(action2).not.to.match(':state(action-active)');
    expect(action3).not.to.match(':state(action-active)');

    element.close();
    await waitForLitRender(element);

    await closeSpy.calledOnce();
    expect(closeSpy.count).to.be.equal(1);
    expect(element).to.match(':state(state-closed)');

    element.open();
    await waitForLitRender(element);

    await openSpy.calledTimes(2);
    expect(openSpy.count).to.be.equal(2);
    expect(element).to.match(':state(state-opened)');
    expect(action1).not.to.match(':state(action-active)');
    expect(action4).not.to.match(':state(action-active)');
  });

  it('closes the navigation', async () => {
    const openSpy = new EventSpy(SbbNavigationElement.events.open, element);
    const closeSpy = new EventSpy(SbbNavigationElement.events.close, element);

    element.open();
    await waitForLitRender(element);

    await openSpy.calledOnce();
    expect(openSpy.count).to.be.equal(1);
    expect(element).to.match(':state(state-opened)');

    element.close();
    await waitForLitRender(element);

    await closeSpy.calledOnce();
    expect(closeSpy.count).to.be.equal(1);
    expect(element).to.match(':state(state-closed)');
    expect(element).not.to.match(':popover-open');
  });

  it('closes the navigation on close button click', async () => {
    const openSpy = new EventSpy(SbbNavigationElement.events.open, element);
    const closeSpy = new EventSpy(SbbNavigationElement.events.close, element);
    const closeButton: SbbButtonElement =
      element.shadowRoot!.querySelector<SbbButtonElement>('.sbb-navigation__close')!;

    element.open();
    await waitForLitRender(element);

    await openSpy.calledOnce();
    expect(openSpy.count).to.be.equal(1);
    expect(element).to.match(':state(state-opened)');

    closeButton.click();
    await waitForLitRender(element);

    await closeSpy.calledOnce();
    expect(closeSpy.count).to.be.equal(1);
    expect(element).to.match(':state(state-closed)');
  });

  it('closes the navigation on Esc key press', async () => {
    const openSpy = new EventSpy(SbbNavigationElement.events.open, element);
    const closeSpy = new EventSpy(SbbNavigationElement.events.close, element);

    element.open();
    await waitForLitRender(element);

    await openSpy.calledOnce();
    expect(openSpy.count).to.be.equal(1);
    await waitForLitRender(element);

    expect(element).to.match(':state(state-opened)');

    await sendKeys({ press: tabKey });
    await waitForLitRender(element);

    await sendKeys({ press: 'Escape' });
    await waitForLitRender(element);

    await closeSpy.calledOnce();
    expect(closeSpy.count).to.be.equal(1);
    expect(element).to.match(':state(state-closed)');
  });

  it('closes navigation with sbb-navigation-close', async () => {
    const openSpy = new EventSpy(SbbNavigationElement.events.open, element);
    const closeSpy = new EventSpy(SbbNavigationElement.events.close, element);
    const section = element.querySelector<SbbNavigationSectionElement>('#first-section')!;
    const action = element.querySelector<SbbNavigationButtonElement>(
      'sbb-navigation-marker > sbb-navigation-button#action-1',
    )!;
    const closeEl = element.querySelector<SbbNavigationButtonElement>(
      'sbb-navigation-marker > sbb-navigation-button[sbb-navigation-close]',
    )!;

    element.open();
    await waitForLitRender(element);

    action.click();
    await waitForLitRender(element);

    await openSpy.calledOnce();
    expect(openSpy.count).to.be.equal(1);
    await waitForLitRender(element);

    expect(element).to.match(':state(state-opened)');
    expect(section).to.match(':state(state-opened)');

    closeEl.click();
    await waitForLitRender(element);

    await closeSpy.calledOnce();
    expect(closeSpy.count).to.be.equal(1);
    expect(element).to.match(':state(state-closed)');
    expect(section).to.match(':state(state-closed)');
  });

  it('opens and closes navigation with non-zero animation duration', async () => {
    (globalThis as { disableAnimation?: boolean }).disableAnimation = false;

    element.style.setProperty('--sbb-navigation-animation-duration', '1ms');

    const openSpy = new EventSpy(SbbNavigationElement.events.open, element);
    const closeSpy = new EventSpy(SbbNavigationElement.events.close, element);

    element.open();
    await waitForLitRender(element);

    await openSpy.calledOnce();
    expect(openSpy.count).to.be.equal(1);
    expect(element).to.match(':state(state-opened)');

    element.close();
    await waitForLitRender(element);

    await closeSpy.calledOnce();
    expect(closeSpy.count).to.be.equal(1);
    expect(element).to.match(':state(state-closed)');
  });

  it('opens navigation and opens section', async () => {
    const openSpy = new EventSpy(SbbNavigationElement.events.open, element);
    const section = element.querySelector<SbbNavigationSectionElement>('#first-section')!;
    const action = element.querySelector<SbbNavigationButtonElement>(
      ':scope > sbb-navigation-marker > sbb-navigation-button#action-1',
    )!;

    element.open();
    await waitForLitRender(element);

    await openSpy.calledOnce();
    expect(openSpy.count).to.be.equal(1);
    expect(element).to.match(':state(state-opened)');
    expect(section).to.match(':state(state-closed)');

    action.click();
    await waitForLitRender(element);

    await waitForCondition(() => section.matches(':state(state-opened)'));
    expect(element).to.match(':state(state-opened)');
    expect(section).to.match(':state(state-opened)');
  });

  it('opens navigation and toggles sections', async () => {
    const openSpy = new EventSpy(SbbNavigationElement.events.open, element);
    const firstSection = element.querySelector<SbbNavigationSectionElement>('#first-section')!;
    const secondSection = element.querySelector<SbbNavigationSectionElement>('#second-section')!;
    const firstAction = element.querySelector<SbbNavigationButtonElement>(
      'sbb-navigation-marker > sbb-navigation-button#action-1',
    )!;
    const secondAction = element.querySelector<SbbNavigationButtonElement>(
      'sbb-navigation-marker > sbb-navigation-button#action-2',
    )!;

    element.open();
    await waitForLitRender(element);

    await openSpy.calledOnce();
    expect(openSpy.count).to.be.equal(1);
    await waitForLitRender(element);

    expect(element).to.match(':state(state-opened)');
    expect(firstSection).to.match(':state(state-closed)');
    expect(secondSection).to.match(':state(state-closed)');

    firstAction.click();

    await waitForCondition(() => firstSection.matches(':state(state-opened)'));
    expect(firstSection).to.match(':state(state-opened)');
    expect(secondSection).to.match(':state(state-closed)');

    secondAction.click();

    await waitForCondition(() => secondSection.matches(':state(state-opened)'));
    expect(firstSection).to.match(':state(state-closed)');
    expect(secondSection).to.match(':state(state-opened)');
  });

  it('closes the navigation and the section on close button click', async () => {
    const openSpy = new EventSpy(SbbNavigationElement.events.open, element);
    const closeSpy = new EventSpy(SbbNavigationElement.events.close, element);
    const section = element.querySelector<SbbNavigationSectionElement>('#first-section')!;
    const action = element.querySelector<SbbNavigationButtonElement>(
      ':scope > sbb-navigation-marker > sbb-navigation-button#action-1',
    )!;
    const closeButton =
      element.shadowRoot!.querySelector<SbbButtonElement>('.sbb-navigation__close')!;

    element.open();
    await waitForLitRender(element);
    await nextFrame();

    action.click();
    await waitForLitRender(element);
    await nextFrame();

    await openSpy.calledOnce();
    await waitForCondition(() => section.matches(':state(state-opened)'));
    expect(openSpy.count).to.be.equal(1);
    await waitForLitRender(element);

    expect(element).to.match(':state(state-opened)');
    expect(section).to.match(':state(state-opened)');

    closeButton.click();

    await closeSpy.calledOnce();
    await waitForCondition(() => section.matches(':state(state-closed)'));
    expect(closeSpy.count).to.be.equal(1);
    await waitForLitRender(element);

    expect(element).to.match(':state(state-closed)');
    expect(section).to.match(':state(state-closed)');
  });

  it('closes the navigation and the section on Esc key press', async () => {
    const openSpy = new EventSpy(SbbNavigationElement.events.open, element);
    const closeSpy = new EventSpy(SbbNavigationElement.events.close, element);
    const section = element.querySelector<SbbNavigationSectionElement>('#first-section')!;
    const action = element.querySelector<SbbNavigationButtonElement>(
      ':scope > sbb-navigation-marker > sbb-navigation-button#action-1',
    )!;

    element.open();
    await waitForLitRender(element);

    action.click();
    await waitForLitRender(element);

    await openSpy.calledOnce();
    expect(openSpy.count).to.be.equal(1);
    await waitForLitRender(element);

    expect(element).to.match(':state(state-opened)');
    expect(section).to.match(':state(state-opened)');

    await sendKeys({ press: tabKey });
    await waitForLitRender(element);

    await sendKeys({ press: 'Escape' });
    await waitForLitRender(element);

    await closeSpy.calledOnce();
    expect(closeSpy.count).to.be.equal(1);
    await waitForLitRender(element);

    expect(element).to.match(':state(state-closed)');
    expect(section).to.match(':state(state-closed)');
  });

  it('closes section with sbb-navigation-section-close', async () => {
    const openSpy = new EventSpy(SbbNavigationElement.events.open, element);
    const section = element.querySelector<SbbNavigationSectionElement>('#first-section')!;
    const action = element.querySelector<SbbNavigationButtonElement>(
      ':scope > sbb-navigation-marker > sbb-navigation-button#action-1',
    )!;
    const closeEl = element.querySelector<SbbNavigationButtonElement>(
      ':scope > sbb-navigation-section > sbb-navigation-button[sbb-navigation-section-close]',
    )!;

    element.open();
    await waitForLitRender(element);

    action.click();
    await waitForLitRender(element);

    await openSpy.calledOnce();
    expect(openSpy.count).to.be.equal(1);
    await waitForLitRender(element);

    expect(element).to.match(':state(state-opened)');
    expect(section).to.match(':state(state-opened)');

    closeEl.click();
    await waitForLitRender(element);
    await waitForCondition(() => section.matches(':state(state-closed)'));

    expect(element).to.match(':state(state-opened)');
    expect(section).to.match(':state(state-closed)');
  });

  it('does not open if prevented', async () => {
    const beforeOpenSpy = new EventSpy(SbbNavigationElement.events.beforeopen, element);

    element.addEventListener(SbbNavigationElement.events.beforeopen, (ev) => ev.preventDefault());
    element.open();

    await beforeOpenSpy.calledOnce();
    expect(beforeOpenSpy.count).to.be.equal(1);
    await waitForLitRender(element);

    expect(element).to.match(':state(state-closed)');
  });

  it('does not close if prevented', async () => {
    const openSpy = new EventSpy(SbbNavigationElement.events.open, element);
    const beforeCloseSpy = new EventSpy(SbbNavigationElement.events.beforeclose, element);

    element.open();
    await openSpy.calledOnce();
    await waitForLitRender(element);

    element.addEventListener(SbbNavigationElement.events.beforeclose, (ev) => ev.preventDefault());
    element.close();

    await beforeCloseSpy.calledOnce();
    await waitForLitRender(element);

    expect(element).to.match(':state(state-opened)');
  });

  it('should re-enable scrolling when removed from the DOM', async () => {
    const openSpy = new EventSpy(SbbNavigationElement.events.open, element);

    element.open();
    await openSpy.calledOnce();

    expect(pageScrollDisabled()).to.be.true;

    element.remove();
    expect(pageScrollDisabled()).to.be.false;
  });

  it('should update trigger connected by id', async () => {
    trigger.id = '';
    await waitForLitRender(element);
    expect(trigger.ariaHasPopup).to.be.null;

    trigger.id = 'navigation-trigger';
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

  it('init with HtmlElement as trigger', async () => {
    trigger = await fixture(html`<button>Trigger</button>`);
    element = await fixture(html`
      <sbb-navigation id="menu" .trigger=${trigger}>
        <sbb-navigation-marker>
          <sbb-navigation-button id="action-1">Tickets & Offers</sbb-navigation-button>
          <sbb-navigation-button id="action-2">Vacations & Recreation</sbb-navigation-button>
        </sbb-navigation-marker>
      </sbb-navigation>
    `);

    const beforeOpenSpy = new EventSpy(SbbNavigationElement.events.beforeopen, element);
    const openSpy = new EventSpy(SbbNavigationElement.events.open, element);

    trigger.click();

    await beforeOpenSpy.calledOnce();
    expect(beforeOpenSpy.count).to.be.equal(1);

    await openSpy.calledOnce();
    expect(openSpy.count).to.be.equal(1);

    expect(element).to.match(':state(state-opened)');
    expect(element).to.match(':popover-open');
  });
});

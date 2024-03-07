import { assert, expect, fixture, nextFrame } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import { html } from 'lit/static-html.js';

import '../navigation-marker';
import type { SbbButtonElement } from '../../button';
import { waitForCondition, waitForLitRender, EventSpy } from '../../core/testing';
import type { SbbNavigationButtonElement } from '../navigation-button';
import '../navigation-button';
import type { SbbNavigationSectionElement } from '../navigation-section';
import '../navigation-section';

import { SbbNavigationElement } from './navigation';

describe('sbb-navigation', () => {
  let element: SbbNavigationElement;

  beforeEach(async () => {
    element = await fixture(html`
      <sbb-navigation id="navigation" disable-animation>
        <sbb-navigation-marker>
          <sbb-navigation-button id="action-1">Tickets & Offers</sbb-navigation-button>
          <sbb-navigation-button id="action-2">Vacations & Recreation</sbb-navigation-button>
          <sbb-navigation-button>Travel information</sbb-navigation-button>
          <sbb-navigation-button sbb-navigation-close>Help & Contact</sbb-navigation-button>
        </sbb-navigation-marker>

        <sbb-navigation-section trigger="action-1" id="first-section" disable-animation>
          <sbb-navigation-button sbb-navigation-section-close>Label</sbb-navigation-button>
          <sbb-navigation-button>Label</sbb-navigation-button>
        </sbb-navigation-section>
        <sbb-navigation-section trigger="action-2" id="second-section" disable-animation>
          <sbb-navigation-button>Label</sbb-navigation-button>
          <sbb-navigation-button>Label</sbb-navigation-button>
        </sbb-navigation-section>
      </sbb-navigation>
    `);
  });

  it('renders', () => {
    assert.instanceOf(element, SbbNavigationElement);
  });

  it('opens the navigation', async () => {
    const didOpenEventSpy = new EventSpy(SbbNavigationElement.events.didOpen);

    element.open();
    await waitForLitRender(element);

    await waitForCondition(() => didOpenEventSpy.events.length === 1);
    expect(didOpenEventSpy.count).to.be.equal(1);
    await waitForLitRender(element);

    expect(element).to.have.attribute('data-state', 'opened');
  });

  it('sets the initial active actions and focuses on the first one', async () => {
    element = await fixture(html`
      <sbb-navigation id="navigation" disable-animation>
        <sbb-navigation-marker>
          <sbb-navigation-button>Tickets & Offers</sbb-navigation-button>
          <sbb-navigation-button id="action-active-1" class="sbb-active"
            >Vacations & Recreation</sbb-navigation-button
          >
        </sbb-navigation-marker>

        <sbb-navigation-marker>
          <sbb-navigation-button id="action-active-2" class="sbb-active"
            >English</sbb-navigation-button
          >
          <sbb-navigation-button>German</sbb-navigation-button>
        </sbb-navigation-marker>
      </sbb-navigation>
    `);

    const didOpenEventSpy = new EventSpy(SbbNavigationElement.events.didOpen);
    const action2: SbbNavigationButtonElement = document.querySelector<SbbNavigationButtonElement>(
      'sbb-navigation > sbb-navigation-marker > sbb-navigation-button#action-active-1',
    )!;
    const action3: SbbNavigationButtonElement = document.querySelector<SbbNavigationButtonElement>(
      'sbb-navigation > sbb-navigation-marker > sbb-navigation-button#action-active-2',
    )!;

    element.open();
    await waitForLitRender(element);

    await waitForCondition(() => didOpenEventSpy.events.length === 1);
    expect(didOpenEventSpy.count).to.be.equal(1);
    await waitForLitRender(element);

    expect(element).to.have.attribute('data-state', 'opened');

    await waitForLitRender(element);

    expect(action2).to.have.attribute('data-action-active');
    expect(action3).to.have.attribute('data-action-active');
    expect(document.activeElement?.id).to.be.equal('action-active-1');
  });

  it('sets the initial active action, opens the connected section and focuses on the first active action in the section', async () => {
    element = await fixture(html`
      <sbb-navigation id="navigation" disable-animation>
        <sbb-navigation-marker>
          <sbb-navigation-button>Tickets & Offers</sbb-navigation-button>
          <sbb-navigation-button id="action-active" class="sbb-active"
            >Vacations & Recreation</sbb-navigation-button
          >
        </sbb-navigation-marker>

        <sbb-navigation-section trigger="action-active" id="active-section" disable-animation>
          <sbb-navigation-button>Label</sbb-navigation-button>
          <sbb-navigation-button id="section-action-active" class="sbb-active"
            >Label</sbb-navigation-button
          >
        </sbb-navigation-section>
      </sbb-navigation>
    `);

    const didOpenEventSpy = new EventSpy(SbbNavigationElement.events.didOpen);
    const actionActive: SbbNavigationButtonElement =
      document.querySelector<SbbNavigationButtonElement>(
        'sbb-navigation > sbb-navigation-marker > sbb-navigation-button#action-active',
      )!;
    const sectionActionActive: SbbNavigationButtonElement =
      document.querySelector<SbbNavigationButtonElement>(
        'sbb-navigation > sbb-navigation-section > sbb-navigation-button#section-action-active',
      )!;
    const activeSection: SbbNavigationButtonElement =
      document.querySelector<SbbNavigationButtonElement>(
        'sbb-navigation > sbb-navigation-section#active-section',
      )!;

    element.open();
    await waitForLitRender(element);

    await waitForCondition(() => didOpenEventSpy.events.length === 1);
    expect(didOpenEventSpy.count).to.be.equal(1);
    await waitForLitRender(element);

    expect(element).to.have.attribute('data-state', 'opened');

    await waitForLitRender(element);

    expect(actionActive).to.have.attribute('data-action-active');
    expect(sectionActionActive).to.have.attribute('data-action-active');
    expect(activeSection).to.have.attribute('data-state', 'opened');
    expect(document.activeElement?.id).to.be.equal('section-action-active');
  });

  it('closes the navigation', async () => {
    const didOpenEventSpy = new EventSpy(SbbNavigationElement.events.didOpen);
    const didCloseEventSpy = new EventSpy(SbbNavigationElement.events.didClose);

    element.open();
    await waitForLitRender(element);

    await waitForCondition(() => didOpenEventSpy.events.length === 1);
    expect(didOpenEventSpy.count).to.be.equal(1);
    await waitForLitRender(element);

    expect(element).to.have.attribute('data-state', 'opened');

    element.close();
    await waitForLitRender(element);

    await waitForCondition(() => didCloseEventSpy.events.length === 1);
    expect(didCloseEventSpy.count).to.be.equal(1);
    await waitForLitRender(element);

    expect(element).to.have.attribute('data-state', 'closed');
  });

  it('closes the navigation on close button click', async () => {
    const didOpenEventSpy = new EventSpy(SbbNavigationElement.events.didOpen);
    const didCloseEventSpy = new EventSpy(SbbNavigationElement.events.didClose);
    const closeButton: SbbButtonElement =
      element.shadowRoot!.querySelector<SbbButtonElement>('.sbb-navigation__close')!;

    element.open();
    await waitForLitRender(element);

    await waitForCondition(() => didOpenEventSpy.events.length === 1);
    expect(didOpenEventSpy.count).to.be.equal(1);
    await waitForLitRender(element);

    expect(element).to.have.attribute('data-state', 'opened');

    closeButton.click();
    await waitForLitRender(element);

    await waitForCondition(() => didCloseEventSpy.events.length === 1);
    expect(didCloseEventSpy.count).to.be.equal(1);
    await waitForLitRender(element);

    expect(element).to.have.attribute('data-state', 'closed');
  });

  it('closes the navigation on Esc key press', async () => {
    const didOpenEventSpy = new EventSpy(SbbNavigationElement.events.didOpen);
    const didCloseEventSpy = new EventSpy(SbbNavigationElement.events.didClose);

    element.open();
    await waitForLitRender(element);

    await waitForCondition(() => didOpenEventSpy.events.length === 1);
    expect(didOpenEventSpy.count).to.be.equal(1);
    await waitForLitRender(element);

    expect(element).to.have.attribute('data-state', 'opened');

    await sendKeys({ down: 'Tab' });
    await waitForLitRender(element);

    await sendKeys({ down: 'Escape' });
    await waitForLitRender(element);

    await waitForCondition(() => didCloseEventSpy.events.length === 1);
    expect(didCloseEventSpy.count).to.be.equal(1);
    await waitForLitRender(element);

    expect(element).to.have.attribute('data-state', 'closed');
  });

  it('closes navigation with sbb-navigation-close', async () => {
    const didOpenEventSpy = new EventSpy(SbbNavigationElement.events.didOpen);
    const didCloseEventSpy = new EventSpy(SbbNavigationElement.events.didClose);
    const section: SbbNavigationSectionElement =
      element.querySelector<SbbNavigationSectionElement>('#first-section')!;
    const action: SbbNavigationButtonElement = element.querySelector<SbbNavigationButtonElement>(
      'sbb-navigation-marker > sbb-navigation-button#action-1',
    )!;
    const closeEl: SbbNavigationButtonElement = element.querySelector<SbbNavigationButtonElement>(
      'sbb-navigation-marker > sbb-navigation-button[sbb-navigation-close]',
    )!;

    element.open();
    await waitForLitRender(element);

    action.click();
    await waitForLitRender(element);

    await waitForCondition(() => didOpenEventSpy.events.length === 1);
    expect(didOpenEventSpy.count).to.be.equal(1);
    await waitForLitRender(element);

    expect(element).to.have.attribute('data-state', 'opened');
    expect(section).to.have.attribute('data-state', 'opened');

    closeEl.click();
    await waitForLitRender(element);

    await waitForCondition(() => didCloseEventSpy.events.length === 1);
    expect(didCloseEventSpy.count).to.be.equal(1);
    await waitForLitRender(element);

    expect(element).to.have.attribute('data-state', 'closed');
    expect(section).to.have.attribute('data-state', 'closed');
  });

  it('opens navigation and opens section', async () => {
    const didOpenEventSpy = new EventSpy(SbbNavigationElement.events.didOpen);
    const section: SbbNavigationSectionElement =
      element.querySelector<SbbNavigationSectionElement>('#first-section')!;
    const action: SbbNavigationButtonElement = document.querySelector<SbbNavigationButtonElement>(
      'sbb-navigation > sbb-navigation-marker > sbb-navigation-button#action-1',
    )!;

    element.open();
    await waitForLitRender(element);

    await waitForCondition(() => didOpenEventSpy.events.length === 1);
    expect(didOpenEventSpy.count).to.be.equal(1);
    await waitForLitRender(element);

    expect(element).to.have.attribute('data-state', 'opened');
    expect(section).to.have.attribute('data-state', 'closed');

    action.click();
    await waitForLitRender(element);

    await waitForCondition(() => section.getAttribute('data-state') === 'opened');
    expect(element).to.have.attribute('data-state', 'opened');
    expect(section).to.have.attribute('data-state', 'opened');
  });

  it('opens navigation and toggles sections', async () => {
    const didOpenEventSpy = new EventSpy(SbbNavigationElement.events.didOpen);
    const firstSection: SbbNavigationSectionElement =
      document.querySelector<SbbNavigationSectionElement>('#first-section')!;
    const secondSection: SbbNavigationSectionElement =
      document.querySelector<SbbNavigationSectionElement>('#second-section')!;
    const firstAction: SbbNavigationButtonElement =
      document.querySelector<SbbNavigationButtonElement>(
        'sbb-navigation-marker > sbb-navigation-button#action-1',
      )!;
    const secondAction: SbbNavigationButtonElement =
      document.querySelector<SbbNavigationButtonElement>(
        'sbb-navigation-marker > sbb-navigation-button#action-2',
      )!;

    element.open();
    await waitForLitRender(element);

    await waitForCondition(() => didOpenEventSpy.events.length === 1);
    expect(didOpenEventSpy.count).to.be.equal(1);
    await waitForLitRender(element);

    expect(element).to.have.attribute('data-state', 'opened');
    expect(firstSection).to.have.attribute('data-state', 'closed');
    expect(secondSection).to.have.attribute('data-state', 'closed');

    firstAction.click();

    await waitForCondition(() => firstSection.getAttribute('data-state') === 'opened');
    expect(firstSection).to.have.attribute('data-state', 'opened');
    expect(secondSection).to.have.attribute('data-state', 'closed');

    secondAction.click();

    await waitForCondition(() => secondSection.getAttribute('data-state') === 'opened');
    expect(firstSection).to.have.attribute('data-state', 'closed');
    expect(secondSection).to.have.attribute('data-state', 'opened');
  });

  it('closes the navigation and the section on close button click', async () => {
    const didOpenEventSpy = new EventSpy(SbbNavigationElement.events.didOpen);
    const didCloseEventSpy = new EventSpy(SbbNavigationElement.events.didClose);
    const section: SbbNavigationSectionElement =
      element.querySelector<SbbNavigationSectionElement>('#first-section')!;
    const action: SbbNavigationButtonElement = document.querySelector<SbbNavigationButtonElement>(
      'sbb-navigation > sbb-navigation-marker > sbb-navigation-button#action-1',
    )!;
    const closeButton: SbbButtonElement =
      element.shadowRoot!.querySelector<SbbButtonElement>('.sbb-navigation__close')!;

    element.open();
    await waitForLitRender(element);
    await nextFrame();

    action.click();
    await waitForLitRender(element);
    await nextFrame();

    await waitForCondition(() => didOpenEventSpy.events.length === 1);
    await waitForCondition(() => section.getAttribute('data-state') === 'opened');
    expect(didOpenEventSpy.count).to.be.equal(1);
    await waitForLitRender(element);

    expect(element).to.have.attribute('data-state', 'opened');
    expect(section).to.have.attribute('data-state', 'opened');

    closeButton.click();

    await waitForCondition(() => didCloseEventSpy.events.length === 1);
    await waitForCondition(() => section.getAttribute('data-state') === 'closed');
    expect(didCloseEventSpy.count).to.be.equal(1);
    await waitForLitRender(element);

    expect(element).to.have.attribute('data-state', 'closed');
    expect(section).to.have.attribute('data-state', 'closed');
  });

  it('closes the navigation and the section on Esc key press', async () => {
    const didOpenEventSpy = new EventSpy(SbbNavigationElement.events.didOpen);
    const didCloseEventSpy = new EventSpy(SbbNavigationElement.events.didClose);
    const section: SbbNavigationSectionElement =
      element.querySelector<SbbNavigationSectionElement>('#first-section')!;
    const action: SbbNavigationButtonElement = document.querySelector<SbbNavigationButtonElement>(
      'sbb-navigation > sbb-navigation-marker > sbb-navigation-button#action-1',
    )!;

    element.open();
    await waitForLitRender(element);

    action.click();
    await waitForLitRender(element);

    await waitForCondition(() => didOpenEventSpy.events.length === 1);
    expect(didOpenEventSpy.count).to.be.equal(1);
    await waitForLitRender(element);

    expect(element).to.have.attribute('data-state', 'opened');
    expect(section).to.have.attribute('data-state', 'opened');

    await sendKeys({ down: 'Tab' });
    await waitForLitRender(element);

    await sendKeys({ down: 'Escape' });
    await waitForLitRender(element);

    await waitForCondition(() => didCloseEventSpy.events.length === 1);
    expect(didCloseEventSpy.count).to.be.equal(1);
    await waitForLitRender(element);

    expect(element).to.have.attribute('data-state', 'closed');
    expect(section).to.have.attribute('data-state', 'closed');
  });

  it('closes section with sbb-navigation-section-close', async () => {
    const didOpenEventSpy = new EventSpy(SbbNavigationElement.events.didOpen);
    const section: SbbNavigationSectionElement =
      document.querySelector<SbbNavigationSectionElement>('#first-section')!;
    const action: SbbNavigationButtonElement = document.querySelector<SbbNavigationButtonElement>(
      'sbb-navigation > sbb-navigation-marker > sbb-navigation-button#action-1',
    )!;
    const closeEl: SbbNavigationButtonElement = document.querySelector<SbbNavigationButtonElement>(
      'sbb-navigation > sbb-navigation-section > sbb-navigation-button[sbb-navigation-section-close]',
    )!;

    element.open();
    await waitForLitRender(element);

    action.click();
    await waitForLitRender(element);

    await waitForCondition(() => didOpenEventSpy.events.length === 1);
    expect(didOpenEventSpy.count).to.be.equal(1);
    await waitForLitRender(element);

    expect(element).to.have.attribute('data-state', 'opened');
    expect(section).to.have.attribute('data-state', 'opened');

    closeEl.click();
    await waitForLitRender(element);
    await waitForCondition(() => section.getAttribute('data-state') === 'closed');

    expect(element).to.have.attribute('data-state', 'opened');
    expect(section).to.have.attribute('data-state', 'closed');
  });

  it('does not open if prevented', async () => {
    const willOpenEventSpy = new EventSpy(SbbNavigationElement.events.willOpen);

    element.addEventListener(SbbNavigationElement.events.willOpen, (ev) => ev.preventDefault());
    element.open();

    await waitForCondition(() => willOpenEventSpy.events.length === 1);
    expect(willOpenEventSpy.count).to.be.equal(1);
    await waitForLitRender(element);

    expect(element).to.have.attribute('data-state', 'closed');
  });

  it('does not close if prevented', async () => {
    const didOpenEventSpy = new EventSpy(SbbNavigationElement.events.didOpen);
    const willCloseEventSpy = new EventSpy(SbbNavigationElement.events.willClose);

    element.open();
    await waitForCondition(() => didOpenEventSpy.events.length === 1);
    await waitForLitRender(element);

    element.addEventListener(SbbNavigationElement.events.willClose, (ev) => ev.preventDefault());
    element.close();

    await waitForCondition(() => willCloseEventSpy.events.length === 1);
    await waitForLitRender(element);

    expect(element).to.have.attribute('data-state', 'opened');
  });
});

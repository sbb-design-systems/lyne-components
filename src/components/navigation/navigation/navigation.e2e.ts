import { assert, expect, fixture, nextFrame } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import { html } from 'lit/static-html.js';

import '../navigation-marker';
import { SbbButtonElement } from '../../button';
import { waitForCondition, waitForLitRender, EventSpy } from '../../core/testing';
import type { SbbNavigationActionElement } from '../navigation-action';
import '../navigation-action';
import type { SbbNavigationSectionElement } from '../navigation-section';
import '../navigation-section';

import { SbbNavigationElement } from './navigation';

describe('sbb-navigation', () => {
  let element: SbbNavigationElement;

  beforeEach(async () => {
    element = await fixture(html`
      <sbb-navigation id="navigation" disable-animation>
        <sbb-navigation-marker>
          <sbb-navigation-action id="action-1">Tickets & Offers</sbb-navigation-action>
          <sbb-navigation-action id="action-2">Vacations & Recreation</sbb-navigation-action>
          <sbb-navigation-action>Travel information</sbb-navigation-action>
          <sbb-navigation-action sbb-navigation-close>Help & Contact</sbb-navigation-action>
        </sbb-navigation-marker>

        <sbb-navigation-section trigger="action-1" id="first-section" disable-animation>
          <sbb-navigation-action sbb-navigation-section-close>Label</sbb-navigation-action>
          <sbb-navigation-action>Label</sbb-navigation-action>
        </sbb-navigation-section>
        <sbb-navigation-section trigger="action-2" id="second-section" disable-animation>
          <sbb-navigation-action>Label</sbb-navigation-action>
          <sbb-navigation-action>Label</sbb-navigation-action>
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
      element.shadowRoot.querySelector('.sbb-navigation__close');

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
    const section: SbbNavigationSectionElement = element.querySelector('#first-section');
    const action: SbbNavigationActionElement = element.querySelector(
      'sbb-navigation-marker > sbb-navigation-action#action-1',
    );
    const closeEl: SbbNavigationActionElement = element.querySelector(
      'sbb-navigation-marker > sbb-navigation-action[sbb-navigation-close]',
    );

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
    const section: SbbNavigationSectionElement = element.querySelector('#first-section');
    const action: SbbNavigationActionElement = document.querySelector(
      'sbb-navigation > sbb-navigation-marker > sbb-navigation-action#action-1',
    );

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
    const firstSection: SbbNavigationSectionElement = document.querySelector('#first-section');
    const secondSection: SbbNavigationSectionElement = document.querySelector('#second-section');
    const firstAction: SbbNavigationActionElement = document.querySelector(
      'sbb-navigation-marker > sbb-navigation-action#action-1',
    );
    const secondAction: SbbNavigationActionElement = document.querySelector(
      'sbb-navigation-marker > sbb-navigation-action#action-2',
    );

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
    const section: SbbNavigationSectionElement = element.querySelector('#first-section');
    const action: SbbNavigationActionElement = document.querySelector(
      'sbb-navigation > sbb-navigation-marker > sbb-navigation-action#action-1',
    );
    const closeButton: SbbButtonElement =
      element.shadowRoot.querySelector('.sbb-navigation__close');

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
    const section: SbbNavigationSectionElement = element.querySelector('#first-section');
    const action: SbbNavigationActionElement = document.querySelector(
      'sbb-navigation > sbb-navigation-marker > sbb-navigation-action#action-1',
    );

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
    const section: SbbNavigationSectionElement = document.querySelector('#first-section');
    const action: SbbNavigationActionElement = document.querySelector(
      'sbb-navigation > sbb-navigation-marker > sbb-navigation-action#action-1',
    );
    const closeEl: SbbNavigationActionElement = document.querySelector(
      'sbb-navigation > sbb-navigation-section > sbb-navigation-action[sbb-navigation-section-close]',
    );

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

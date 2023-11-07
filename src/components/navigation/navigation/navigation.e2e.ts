import { waitForCondition, waitForLitRender, EventSpy } from '../../core/testing';
import { assert, expect, fixture, nextFrame } from '@open-wc/testing';
import { html } from 'lit/static-html.js';
import { sendKeys } from '@web/test-runner-commands';
import { SbbNavigation } from './navigation';
import '../navigation';
import '../navigation-marker';
import '../navigation-action';
import '../navigation-section';
import { SbbNavigationSection } from '../navigation-section';
import { SbbNavigationAction } from '../navigation-action';
import { SbbButton } from '../../button';

describe('sbb-navigation', () => {
  let element: SbbNavigation;

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
    assert.instanceOf(element, SbbNavigation);
  });

  it('opens the navigation', async () => {
    const didOpenEventSpy = new EventSpy(SbbNavigation.events.didOpen);

    element.open();
    await waitForLitRender(element);

    await waitForCondition(() => didOpenEventSpy.events.length === 1);
    expect(didOpenEventSpy.count).to.be.equal(1);
    await waitForLitRender(element);

    expect(element).to.have.attribute('data-state', 'opened');
  });

  it('closes the navigation', async () => {
    const didOpenEventSpy = new EventSpy(SbbNavigation.events.didOpen);
    const didCloseEventSpy = new EventSpy(SbbNavigation.events.didClose);

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
    const didOpenEventSpy = new EventSpy(SbbNavigation.events.didOpen);
    const didCloseEventSpy = new EventSpy(SbbNavigation.events.didClose);
    const closeButton: SbbButton = element.shadowRoot.querySelector('.sbb-navigation__close');

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
    const didOpenEventSpy = new EventSpy(SbbNavigation.events.didOpen);
    const didCloseEventSpy = new EventSpy(SbbNavigation.events.didClose);

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
    const didOpenEventSpy = new EventSpy(SbbNavigation.events.didOpen);
    const didCloseEventSpy = new EventSpy(SbbNavigation.events.didClose);
    const section: SbbNavigationSection = element.querySelector('#first-section');
    const action: SbbNavigationAction = element.querySelector(
      'sbb-navigation-marker > sbb-navigation-action#action-1',
    );
    const closeEl: SbbNavigationAction = element.querySelector(
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
    const didOpenEventSpy = new EventSpy(SbbNavigation.events.didOpen);
    const section: SbbNavigationSection = element.querySelector('#first-section');
    const action: SbbNavigationAction = document.querySelector(
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
    const didOpenEventSpy = new EventSpy(SbbNavigation.events.didOpen);
    const firstSection: SbbNavigationSection = document.querySelector('#first-section');
    const secondSection: SbbNavigationSection = document.querySelector('#second-section');
    const firstAction: SbbNavigationAction = document.querySelector(
      'sbb-navigation-marker > sbb-navigation-action#action-1',
    );
    const secondAction: SbbNavigationAction = document.querySelector(
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
    const didOpenEventSpy = new EventSpy(SbbNavigation.events.didOpen);
    const didCloseEventSpy = new EventSpy(SbbNavigation.events.didClose);
    const section: SbbNavigationSection = element.querySelector('#first-section');
    const action: SbbNavigationAction = document.querySelector(
      'sbb-navigation > sbb-navigation-marker > sbb-navigation-action#action-1',
    );
    const closeButton: SbbButton = element.shadowRoot.querySelector('.sbb-navigation__close');

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
    const didOpenEventSpy = new EventSpy(SbbNavigation.events.didOpen);
    const didCloseEventSpy = new EventSpy(SbbNavigation.events.didClose);
    const section: SbbNavigationSection = element.querySelector('#first-section');
    const action: SbbNavigationAction = document.querySelector(
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
    const didOpenEventSpy = new EventSpy(SbbNavigation.events.didOpen);
    const section: SbbNavigationSection = document.querySelector('#first-section');
    const action: SbbNavigationAction = document.querySelector(
      'sbb-navigation > sbb-navigation-marker > sbb-navigation-action#action-1',
    );
    const closeEl: SbbNavigationAction = document.querySelector(
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
});

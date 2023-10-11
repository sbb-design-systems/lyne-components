import { events } from './sbb-navigation';
import { waitForCondition, waitForLitRender } from '../../global/testing';
import { assert, expect, fixture, nextFrame } from '@open-wc/testing';
import { html } from 'lit/static-html.js';
import { sendKeys } from '@web/test-runner-commands';
import { EventSpy } from '../../global/testing/event-spy';
import { SbbNavigation } from './sbb-navigation';
import '../sbb-navigation';
import '../sbb-navigation-marker';
import '../sbb-navigation-action';
import '../sbb-navigation-section';

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
    const didOpenEventSpy = new EventSpy(events.didOpen);
    const dialog = element.shadowRoot.querySelector('dialog');

    element.open();
    await waitForLitRender(element);

    await waitForCondition(() => didOpenEventSpy.events.length === 1);
    expect(didOpenEventSpy.count).to.be.equal(1);
    await waitForLitRender(element);

    expect(element).to.have.attribute('data-state', 'opened');
    expect(dialog).to.have.attribute('open');
  });

  it('closes the navigation', async () => {
    const didOpenEventSpy = new EventSpy(events.didOpen);
    const didCloseEventSpy = new EventSpy(events.didClose);
    const dialog = element.shadowRoot.querySelector('dialog');

    element.open();
    await waitForLitRender(element);

    await waitForCondition(() => didOpenEventSpy.events.length === 1);
    expect(didOpenEventSpy.count).to.be.equal(1);
    await waitForLitRender(element);

    expect(dialog).to.have.attribute('open');

    element.close();
    await waitForLitRender(element);

    await waitForCondition(() => didCloseEventSpy.events.length === 1);
    expect(didCloseEventSpy.count).to.be.equal(1);
    await waitForLitRender(element);

    expect(dialog).not.to.have.attribute('open');
  });

  it('closes the navigation on close button click', async () => {
    const didOpenEventSpy = new EventSpy(events.didOpen);
    const didCloseEventSpy = new EventSpy(events.didClose);
    const dialog = element.shadowRoot.querySelector('dialog');
    const closeButton = element.shadowRoot.querySelector('.sbb-navigation__close') as HTMLElement;

    element.open();
    await waitForLitRender(element);

    await waitForCondition(() => didOpenEventSpy.events.length === 1);
    expect(didOpenEventSpy.count).to.be.equal(1);
    await waitForLitRender(element);

    expect(dialog).to.have.attribute('open');

    closeButton.click();
    await waitForLitRender(element);

    await waitForCondition(() => didCloseEventSpy.events.length === 1);
    expect(didCloseEventSpy.count).to.be.equal(1);
    await waitForLitRender(element);

    expect(dialog).not.to.have.attribute('open');
  });

  it('closes the navigation on Esc key press', async () => {
    const didOpenEventSpy = new EventSpy(events.didOpen);
    const didCloseEventSpy = new EventSpy(events.didClose);
    const dialog = element.shadowRoot.querySelector('dialog');

    element.open();
    await waitForLitRender(element);

    await waitForCondition(() => didOpenEventSpy.events.length === 1);
    expect(didOpenEventSpy.count).to.be.equal(1);
    await waitForLitRender(element);

    expect(dialog).to.have.attribute('open');

    await sendKeys({ down: 'Tab' });
    await waitForLitRender(element);

    await sendKeys({ down: 'Escape' });
    await waitForLitRender(element);

    await waitForCondition(() => didCloseEventSpy.events.length === 1);
    expect(didCloseEventSpy.count).to.be.equal(1);
    await waitForLitRender(element);

    expect(dialog).not.to.have.attribute('open');
  });

  it('closes navigation with sbb-navigation-close', async () => {
    const didOpenEventSpy = new EventSpy(events.didOpen);
    const didCloseEventSpy = new EventSpy(events.didClose);
    const dialog = element.shadowRoot.querySelector('dialog');
    const sectionDialog = document
      .querySelector('sbb-navigation-section#first-section')
      .shadowRoot.querySelector('dialog');
    const action = element.querySelector(
      'sbb-navigation-marker > sbb-navigation-action#action-1',
    ) as HTMLElement;
    const closeEl = element.querySelector(
      'sbb-navigation-marker > sbb-navigation-action[sbb-navigation-close]',
    ) as HTMLElement;

    element.open();
    await waitForLitRender(element);

    action.click();
    await waitForLitRender(element);

    await waitForCondition(() => didOpenEventSpy.events.length === 1);
    expect(didOpenEventSpy.count).to.be.equal(1);
    await waitForLitRender(element);

    expect(dialog).to.have.attribute('open');
    expect(sectionDialog).to.have.attribute('open');

    closeEl.click();
    await waitForLitRender(element);

    await waitForCondition(() => didCloseEventSpy.events.length === 1);
    expect(didCloseEventSpy.count).to.be.equal(1);
    await waitForLitRender(element);

    expect(dialog).not.to.have.attribute('open');
    expect(sectionDialog).not.to.have.attribute('open');
  });

  it('opens navigation and opens section', async () => {
    const didOpenEventSpy = new EventSpy(events.didOpen);
    const navDialog = element.shadowRoot.querySelector('dialog');
    const sectionDialog = document
      .querySelector('sbb-navigation-section#first-section')
      .shadowRoot.querySelector('dialog');
    const action = document.querySelector(
      'sbb-navigation > sbb-navigation-marker > sbb-navigation-action#action-1',
    ) as HTMLElement;

    element.open();
    await waitForLitRender(element);

    await waitForCondition(() => didOpenEventSpy.events.length === 1);
    expect(didOpenEventSpy.count).to.be.equal(1);
    await waitForLitRender(element);

    expect(navDialog).to.have.attribute('open');
    expect(sectionDialog).not.to.have.attribute('open');

    action.click();
    await waitForLitRender(element);

    expect(navDialog).to.have.attribute('open');
    expect(sectionDialog).to.have.attribute('open');
  });

  it('opens navigation and toggles sections', async () => {
    const didOpenEventSpy = new EventSpy(events.didOpen);
    const navDialog = element.shadowRoot.querySelector('dialog');
    const firstSection = document.querySelector('#first-section');
    const secondSection = document.querySelector('#second-section');
    const firstSectionDialog = firstSection.shadowRoot.querySelector('dialog');
    const secondSectionDialog = secondSection.shadowRoot.querySelector('dialog');
    const firstAction = document.querySelector(
      'sbb-navigation-marker > sbb-navigation-action#action-1',
    ) as HTMLElement;
    const secondAction = document.querySelector(
      'sbb-navigation-marker > sbb-navigation-action#action-2',
    ) as HTMLElement;

    element.open();
    await waitForLitRender(element);

    await waitForCondition(() => didOpenEventSpy.events.length === 1);
    expect(didOpenEventSpy.count).to.be.equal(1);
    await waitForLitRender(element);

    expect(navDialog).to.have.attribute('open');
    expect(firstSectionDialog).not.to.have.attribute('open');
    expect(secondSectionDialog).not.to.have.attribute('open');

    console.log('before first click');
    firstAction.click();
    console.log('after first click');

    await waitForCondition(() => firstSection.getAttribute('data-state') === 'opened');
    expect(firstSectionDialog).to.have.attribute('open');
    expect(secondSectionDialog).not.to.have.attribute('open');

    console.log('before second click');
    secondAction.click();
    console.log('after second click');

    await waitForCondition(() => secondSection.getAttribute('data-state') === 'opened');
    expect(firstSection.getAttribute('data-state')).not.to.be.equal('opened');
    expect(secondSectionDialog).to.have.attribute('open');
    await nextFrame();
  });

  it('closes the navigation and the section on close button click', async () => {
    const didOpenEventSpy = new EventSpy(events.didOpen);
    const didCloseEventSpy = new EventSpy(events.didClose);
    const dialog = element.shadowRoot.querySelector('dialog');
    const sectionDialog = document
      .querySelector('sbb-navigation-section#first-section')
      .shadowRoot.querySelector('dialog');
    const action = document.querySelector(
      'sbb-navigation > sbb-navigation-marker > sbb-navigation-action#action-1',
    ) as HTMLElement;
    const closeButton = element.shadowRoot.querySelector('.sbb-navigation__close') as HTMLElement;

    element.open();
    await waitForLitRender(element);
    await nextFrame();

    action.click();
    await waitForLitRender(element);
    await nextFrame();

    await waitForCondition(() => didOpenEventSpy.events.length === 1);
    expect(didOpenEventSpy.count).to.be.equal(1);
    await waitForLitRender(element);

    expect(dialog).to.have.attribute('open');
    expect(sectionDialog).to.have.attribute('open');

    closeButton.click();
    await waitForLitRender(element);

    await waitForCondition(() => didCloseEventSpy.events.length === 1);
    expect(didCloseEventSpy.count).to.be.equal(1);
    await waitForLitRender(element);

    expect(dialog).not.to.have.attribute('open');
    expect(sectionDialog).not.to.have.attribute('open');
  });

  it('closes the navigation and the section on Esc key press', async () => {
    const didOpenEventSpy = new EventSpy(events.didOpen);
    const didCloseEventSpy = new EventSpy(events.didClose);
    const dialog = element.shadowRoot.querySelector('dialog');
    const sectionDialog = document
      .querySelector('sbb-navigation-section#first-section')
      .shadowRoot.querySelector('dialog');
    const action = document.querySelector(
      'sbb-navigation > sbb-navigation-marker > sbb-navigation-action#action-1',
    ) as HTMLElement;

    element.open();
    await waitForLitRender(element);

    action.click();
    await waitForLitRender(element);

    await waitForCondition(() => didOpenEventSpy.events.length === 1);
    expect(didOpenEventSpy.count).to.be.equal(1);
    await waitForLitRender(element);

    expect(dialog).to.have.attribute('open');
    expect(sectionDialog).to.have.attribute('open');

    await sendKeys({ down: 'Tab' });
    await waitForLitRender(element);

    await sendKeys({ down: 'Escape' });
    await waitForLitRender(element);

    await waitForCondition(() => didCloseEventSpy.events.length === 1);
    expect(didCloseEventSpy.count).to.be.equal(1);
    await waitForLitRender(element);

    expect(dialog).not.to.have.attribute('open');
    expect(sectionDialog).not.to.have.attribute('open');
  });

  it('closes section with sbb-navigation-section-close', async () => {
    const didOpenEventSpy = new EventSpy(events.didOpen);
    const dialog = element.shadowRoot.querySelector('dialog');
    const section = document.querySelector('#first-section');
    const sectionDialog = section.shadowRoot.querySelector('dialog');
    const action = document.querySelector(
      'sbb-navigation > sbb-navigation-marker > sbb-navigation-action#action-1',
    ) as HTMLElement;
    const closeEl = document.querySelector(
      'sbb-navigation > sbb-navigation-section > sbb-navigation-action[sbb-navigation-section-close]',
    ) as HTMLElement;

    element.open();
    await waitForLitRender(element);

    action.click();
    await waitForLitRender(element);

    await waitForCondition(() => didOpenEventSpy.events.length === 1);
    expect(didOpenEventSpy.count).to.be.equal(1);
    await waitForLitRender(element);

    expect(dialog).to.have.attribute('open');
    expect(sectionDialog).to.have.attribute('open');

    closeEl.click();
    await waitForLitRender(element);

    expect(dialog).to.have.attribute('open');
    expect(section).not.to.have.attribute('data-state', 'opened');
  });
});

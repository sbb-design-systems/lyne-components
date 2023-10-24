import events from './sbb-navigation.events';
import { E2EElement, E2EPage, newE2EPage } from '@stencil/core/testing';
import { waitForCondition } from '../../global/testing';

describe('sbb-navigation', () => {
  let element: E2EElement, page: E2EPage;

  beforeEach(async () => {
    page = await newE2EPage();
    await page.setContent(`
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
    element = await page.find('sbb-navigation');
  });

  it('renders', () => {
    expect(element).toHaveClass('hydrated');
  });

  it('opens the navigation', async () => {
    const didOpenEventSpy = await page.spyOnEvent(events.didOpen);

    await element.callMethod('open');
    await page.waitForChanges();

    await waitForCondition(() => didOpenEventSpy.events.length === 1);
    expect(didOpenEventSpy).toHaveReceivedEventTimes(1);
    await page.waitForChanges();

    expect(element).toEqualAttribute('data-state', 'opened');
  });

  it('closes the navigation', async () => {
    const didOpenEventSpy = await page.spyOnEvent(events.didOpen);
    const didCloseEventSpy = await page.spyOnEvent(events.didClose);

    await element.callMethod('open');
    await page.waitForChanges();

    await waitForCondition(() => didOpenEventSpy.events.length === 1);
    expect(didOpenEventSpy).toHaveReceivedEventTimes(1);
    await page.waitForChanges();

    expect(element).toEqualAttribute('data-state', 'opened');

    await element.callMethod('close');
    await page.waitForChanges();

    await waitForCondition(() => didCloseEventSpy.events.length === 1);
    expect(didCloseEventSpy).toHaveReceivedEventTimes(1);
    await page.waitForChanges();

    expect(element).toEqualAttribute('data-state', 'closed');
  });

  it('closes the navigation on close button click', async () => {
    const didOpenEventSpy = await page.spyOnEvent(events.didOpen);
    const didCloseEventSpy = await page.spyOnEvent(events.didClose);
    const closeButton = await page.find('sbb-navigation >>> .sbb-navigation__close');

    await element.callMethod('open');
    await page.waitForChanges();

    await waitForCondition(() => didOpenEventSpy.events.length === 1);
    expect(didOpenEventSpy).toHaveReceivedEventTimes(1);
    await page.waitForChanges();

    expect(element).toEqualAttribute('data-state', 'opened');

    await closeButton.click();
    await page.waitForChanges();

    await waitForCondition(() => didCloseEventSpy.events.length === 1);
    expect(didCloseEventSpy).toHaveReceivedEventTimes(1);
    await page.waitForChanges();

    expect(element).toEqualAttribute('data-state', 'closed');
  });

  it('closes the navigation on Esc key press', async () => {
    const didOpenEventSpy = await page.spyOnEvent(events.didOpen);
    const didCloseEventSpy = await page.spyOnEvent(events.didClose);

    await element.callMethod('open');
    await page.waitForChanges();

    await waitForCondition(() => didOpenEventSpy.events.length === 1);
    expect(didOpenEventSpy).toHaveReceivedEventTimes(1);
    await page.waitForChanges();

    expect(element).toEqualAttribute('data-state', 'opened');

    await page.keyboard.down('Tab');
    await page.waitForChanges();

    await page.keyboard.down('Escape');
    await page.waitForChanges();

    await waitForCondition(() => didCloseEventSpy.events.length === 1);
    expect(didCloseEventSpy).toHaveReceivedEventTimes(1);
    await page.waitForChanges();

    expect(element).toEqualAttribute('data-state', 'closed');
  });

  it('closes navigation with sbb-navigation-close', async () => {
    const didOpenEventSpy = await page.spyOnEvent(events.didOpen);
    const didCloseEventSpy = await page.spyOnEvent(events.didClose);
    const section = await page.find('sbb-navigation-section#first-section');
    const action = await page.find(
      'sbb-navigation > sbb-navigation-marker > sbb-navigation-action#action-1',
    );
    const closeEl = await page.find(
      'sbb-navigation > sbb-navigation-marker > sbb-navigation-action[sbb-navigation-close]',
    );

    await element.callMethod('open');
    await page.waitForChanges();

    action.triggerEvent('click');
    await page.waitForChanges();

    await waitForCondition(() => didOpenEventSpy.events.length === 1);
    expect(didOpenEventSpy).toHaveReceivedEventTimes(1);
    await page.waitForChanges();

    expect(element).toEqualAttribute('data-state', 'opened');
    expect(section).toEqualAttribute('data-state', 'opened');

    closeEl.triggerEvent('click');
    await page.waitForChanges();

    await waitForCondition(() => didCloseEventSpy.events.length === 1);
    expect(didCloseEventSpy).toHaveReceivedEventTimes(1);
    await page.waitForChanges();

    expect(element).toEqualAttribute('data-state', 'closed');
    expect(section).toEqualAttribute('data-state', 'closed');
  });

  it('opens navigation and opens section', async () => {
    const didOpenEventSpy = await page.spyOnEvent(events.didOpen);
    const section = await page.find('sbb-navigation-section#first-section');
    const action = await page.find(
      'sbb-navigation > sbb-navigation-marker > sbb-navigation-action#action-1',
    );

    await element.callMethod('open');
    await page.waitForChanges();

    await waitForCondition(() => didOpenEventSpy.events.length === 1);
    expect(didOpenEventSpy).toHaveReceivedEventTimes(1);
    await page.waitForChanges();

    expect(element).toEqualAttribute('data-state', 'opened');
    expect(section).toEqualAttribute('data-state', 'closed');

    action.triggerEvent('click');
    await page.waitForChanges();

    expect(element).toEqualAttribute('data-state', 'opened');
    expect(section).toEqualAttribute('data-state', 'opened');
  });

  it('opens navigation and toggles sections', async () => {
    const didOpenEventSpy = await page.spyOnEvent(events.didOpen);
    const firstSection = await page.find('sbb-navigation-section#first-section');
    const secondSection = await page.find('sbb-navigation-section#second-section');
    const firstAction = await page.find('sbb-navigation-marker > sbb-navigation-action#action-1');
    const secondAction = await page.find('sbb-navigation-marker > sbb-navigation-action#action-2');

    await element.callMethod('open');
    await page.waitForChanges();

    await waitForCondition(() => didOpenEventSpy.events.length === 1);
    expect(didOpenEventSpy).toHaveReceivedEventTimes(1);
    await page.waitForChanges();

    expect(element).toEqualAttribute('data-state', 'opened');
    expect(firstSection).toEqualAttribute('data-state', 'closed');
    expect(secondSection).toEqualAttribute('data-state', 'closed');

    firstAction.triggerEvent('click');
    await page.waitForChanges();

    expect(firstSection).toEqualAttribute('data-state', 'opened');
    expect(secondSection).toEqualAttribute('data-state', 'closed');

    secondAction.triggerEvent('click');
    await page.waitForChanges();

    expect(firstSection).toEqualAttribute('data-state', 'closed');
    expect(secondSection).toEqualAttribute('data-state', 'opened');
  });

  it('closes the navigation and the section on close button click', async () => {
    const didOpenEventSpy = await page.spyOnEvent(events.didOpen);
    const didCloseEventSpy = await page.spyOnEvent(events.didClose);
    const section = await page.find('sbb-navigation-section#first-section');
    const action = await page.find(
      'sbb-navigation > sbb-navigation-marker > sbb-navigation-action#action-1',
    );
    const closeButton = await page.find('sbb-navigation >>> .sbb-navigation__close');

    await element.callMethod('open');
    await page.waitForChanges();

    action.triggerEvent('click');
    await page.waitForChanges();

    await waitForCondition(() => didOpenEventSpy.events.length === 1);
    expect(didOpenEventSpy).toHaveReceivedEventTimes(1);
    await page.waitForChanges();

    expect(element).toEqualAttribute('data-state', 'opened');
    expect(section).toEqualAttribute('data-state', 'opened');

    await closeButton.click();
    await page.waitForChanges();

    await waitForCondition(() => didCloseEventSpy.events.length === 1);
    expect(didCloseEventSpy).toHaveReceivedEventTimes(1);
    await page.waitForChanges();

    expect(element).toEqualAttribute('data-state', 'closed');
    expect(section).toEqualAttribute('data-state', 'closed');
  });

  it('closes the navigation and the section on Esc key press', async () => {
    const didOpenEventSpy = await page.spyOnEvent(events.didOpen);
    const didCloseEventSpy = await page.spyOnEvent(events.didClose);
    const section = await page.find('sbb-navigation-section#first-section');
    const action = await page.find(
      'sbb-navigation > sbb-navigation-marker > sbb-navigation-action#action-1',
    );

    await element.callMethod('open');
    await page.waitForChanges();

    action.triggerEvent('click');
    await page.waitForChanges();

    await waitForCondition(() => didOpenEventSpy.events.length === 1);
    expect(didOpenEventSpy).toHaveReceivedEventTimes(1);
    await page.waitForChanges();

    expect(element).toEqualAttribute('data-state', 'opened');
    expect(section).toEqualAttribute('data-state', 'opened');

    await page.keyboard.down('Tab');
    await page.waitForChanges();

    await page.keyboard.down('Escape');
    await page.waitForChanges();

    await waitForCondition(() => didCloseEventSpy.events.length === 1);
    expect(didCloseEventSpy).toHaveReceivedEventTimes(1);
    await page.waitForChanges();

    expect(element).toEqualAttribute('data-state', 'closed');
    expect(section).toEqualAttribute('data-state', 'closed');
  });

  it('closes section with sbb-navigation-section-close', async () => {
    const didOpenEventSpy = await page.spyOnEvent(events.didOpen);
    const section = await page.find('sbb-navigation-section#first-section');
    const action = await page.find(
      'sbb-navigation > sbb-navigation-marker > sbb-navigation-action#action-1',
    );
    const closeEl = await page.find(
      'sbb-navigation > sbb-navigation-section > sbb-navigation-action[sbb-navigation-section-close]',
    );

    await element.callMethod('open');
    await page.waitForChanges();

    action.triggerEvent('click');
    await page.waitForChanges();

    await waitForCondition(() => didOpenEventSpy.events.length === 1);
    expect(didOpenEventSpy).toHaveReceivedEventTimes(1);
    await page.waitForChanges();

    expect(element).toEqualAttribute('data-state', 'opened');
    expect(section).toEqualAttribute('data-state', 'opened');

    await closeEl.click();
    await page.waitForChanges();

    expect(element).toEqualAttribute('data-state', 'opened');
    expect(section).toEqualAttribute('data-state', 'closed');
  });
});

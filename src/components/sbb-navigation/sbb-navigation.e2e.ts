import events from './sbb-navigation.events';
import { E2EElement, E2EPage, newE2EPage } from '@stencil/core/testing';
import { waitForCondition } from '../../global/helpers/testing/wait-for-condition';

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
    const dialog = await page.find('sbb-navigation >>> dialog');

    await element.callMethod('open');
    await page.waitForChanges();

    await waitForCondition(() => didOpenEventSpy.events.length === 1);
    expect(didOpenEventSpy).toHaveReceivedEventTimes(1);
    await page.waitForChanges();

    expect(element).toEqualAttribute('data-state', 'opened');
    expect(dialog).toHaveAttribute('open');
  });

  it('closes the navigation', async () => {
    const didOpenEventSpy = await page.spyOnEvent(events.didOpen);
    const didCloseEventSpy = await page.spyOnEvent(events.didClose);
    const dialog = await page.find('sbb-navigation >>> dialog');

    await element.callMethod('open');
    await page.waitForChanges();

    await waitForCondition(() => didOpenEventSpy.events.length === 1);
    expect(didOpenEventSpy).toHaveReceivedEventTimes(1);
    await page.waitForChanges();

    expect(dialog).toHaveAttribute('open');

    await element.callMethod('close');
    await page.waitForChanges();

    await waitForCondition(() => didCloseEventSpy.events.length === 1);
    expect(didCloseEventSpy).toHaveReceivedEventTimes(1);
    await page.waitForChanges();

    expect(dialog).not.toHaveAttribute('open');
  });

  it('closes the navigation on close button click', async () => {
    const didOpenEventSpy = await page.spyOnEvent(events.didOpen);
    const didCloseEventSpy = await page.spyOnEvent(events.didClose);
    const dialog = await page.find('sbb-navigation >>> dialog');
    const closeButton = await page.find('sbb-navigation >>> .sbb-navigation__close');

    await element.callMethod('open');
    await page.waitForChanges();

    await waitForCondition(() => didOpenEventSpy.events.length === 1);
    expect(didOpenEventSpy).toHaveReceivedEventTimes(1);
    await page.waitForChanges();

    expect(dialog).toHaveAttribute('open');

    closeButton.triggerEvent('click', { bubbles: true, cancelable: true, composed: true });
    await page.waitForChanges();

    await waitForCondition(() => didCloseEventSpy.events.length === 1);
    expect(didCloseEventSpy).toHaveReceivedEventTimes(1);
    await page.waitForChanges();

    expect(dialog).not.toHaveAttribute('open');
  });

  it('closes the navigation on Esc key press', async () => {
    const didOpenEventSpy = await page.spyOnEvent(events.didOpen);
    const didCloseEventSpy = await page.spyOnEvent(events.didClose);
    const dialog = await page.find('sbb-navigation >>> dialog');

    await element.callMethod('open');
    await page.waitForChanges();

    await waitForCondition(() => didOpenEventSpy.events.length === 1);
    expect(didOpenEventSpy).toHaveReceivedEventTimes(1);
    await page.waitForChanges();

    expect(dialog).toHaveAttribute('open');

    await page.keyboard.down('Tab');
    await page.waitForChanges();

    await page.keyboard.down('Escape');
    await page.waitForChanges();

    await waitForCondition(() => didCloseEventSpy.events.length === 1);
    expect(didCloseEventSpy).toHaveReceivedEventTimes(1);
    await page.waitForChanges();

    expect(dialog).not.toHaveAttribute('open');
  });

  it('closes navigation with sbb-navigation-close', async () => {
    const didOpenEventSpy = await page.spyOnEvent(events.didOpen);
    const didCloseEventSpy = await page.spyOnEvent(events.didClose);
    const dialog = await page.find('sbb-navigation >>> dialog');
    const sectionDialog = await page.find('sbb-navigation-section#first-section >>> dialog');
    const action = await page.find(
      'sbb-navigation > sbb-navigation-marker > sbb-navigation-action#action-1'
    );
    const closeEl = await page.find(
      'sbb-navigation > sbb-navigation-marker > sbb-navigation-action[sbb-navigation-close]'
    );

    await element.callMethod('open');
    await page.waitForChanges();

    action.triggerEvent('click', { bubbles: true, cancelable: true, composed: true });
    await page.waitForChanges();

    await waitForCondition(() => didOpenEventSpy.events.length === 1);
    expect(didOpenEventSpy).toHaveReceivedEventTimes(1);
    await page.waitForChanges();

    expect(dialog).toHaveAttribute('open');
    expect(sectionDialog).toHaveAttribute('open');

    closeEl.triggerEvent('click', { bubbles: true, cancelable: true, composed: true });
    await page.waitForChanges();

    await waitForCondition(() => didCloseEventSpy.events.length === 1);
    expect(didCloseEventSpy).toHaveReceivedEventTimes(1);
    await page.waitForChanges();

    expect(dialog).not.toHaveAttribute('open');
    expect(sectionDialog).not.toHaveAttribute('open');
  });

  it('opens navigation and opens section', async () => {
    const didOpenEventSpy = await page.spyOnEvent(events.didOpen);
    const navDialog = await page.find('sbb-navigation >>> dialog');
    const sectionDialog = await page.find('sbb-navigation-section#first-section >>> dialog');
    const action = await page.find(
      'sbb-navigation > sbb-navigation-marker > sbb-navigation-action#action-1'
    );

    await element.callMethod('open');
    await page.waitForChanges();

    await waitForCondition(() => didOpenEventSpy.events.length === 1);
    expect(didOpenEventSpy).toHaveReceivedEventTimes(1);
    await page.waitForChanges();

    expect(navDialog).toHaveAttribute('open');
    expect(sectionDialog).not.toHaveAttribute('open');

    action.triggerEvent('click', { bubbles: true, cancelable: true, composed: true });
    await page.waitForChanges();

    expect(navDialog).toHaveAttribute('open');
    expect(sectionDialog).toHaveAttribute('open');
  });

  it('opens navigation and toggles sections', async () => {
    const didOpenEventSpy = await page.spyOnEvent(events.didOpen);
    const navDialog = await page.find('sbb-navigation >>> dialog');
    const firstSectionDialog = await page.find('sbb-navigation-section#first-section >>> dialog');
    const secondSectionDialog = await page.find('sbb-navigation-section#second-section >>> dialog');
    const firstAction = await page.find('sbb-navigation-marker > sbb-navigation-action#action-1');
    const secondAction = await page.find('sbb-navigation-marker > sbb-navigation-action#action-2');

    await element.callMethod('open');
    await page.waitForChanges();

    await waitForCondition(() => didOpenEventSpy.events.length === 1);
    expect(didOpenEventSpy).toHaveReceivedEventTimes(1);
    await page.waitForChanges();

    expect(navDialog).toHaveAttribute('open');
    expect(firstSectionDialog).not.toHaveAttribute('open');
    expect(secondSectionDialog).not.toHaveAttribute('open');

    firstAction.triggerEvent('click', { bubbles: true, cancelable: true, composed: true });
    await page.waitForChanges();

    expect(firstSectionDialog).toHaveAttribute('open');
    expect(secondSectionDialog).not.toHaveAttribute('open');

    secondAction.triggerEvent('click', { bubbles: true, cancelable: true, composed: true });
    await page.waitForChanges();

    expect(firstSectionDialog).not.toHaveAttribute('open');
    expect(secondSectionDialog).toHaveAttribute('open');
  });

  it('closes the navigation and the section on close button click', async () => {
    const didOpenEventSpy = await page.spyOnEvent(events.didOpen);
    const didCloseEventSpy = await page.spyOnEvent(events.didClose);
    const dialog = await page.find('sbb-navigation >>> dialog');
    const sectionDialog = await page.find('sbb-navigation-section#first-section >>> dialog');
    const action = await page.find(
      'sbb-navigation > sbb-navigation-marker > sbb-navigation-action#action-1'
    );
    const closeButton = await page.find('sbb-navigation >>> .sbb-navigation__close');

    await element.callMethod('open');
    await page.waitForChanges();

    action.triggerEvent('click', { bubbles: true, cancelable: true, composed: true });
    await page.waitForChanges();

    await waitForCondition(() => didOpenEventSpy.events.length === 1);
    expect(didOpenEventSpy).toHaveReceivedEventTimes(1);
    await page.waitForChanges();

    expect(dialog).toHaveAttribute('open');
    expect(sectionDialog).toHaveAttribute('open');

    closeButton.triggerEvent('click', { bubbles: true, cancelable: true, composed: true });
    await page.waitForChanges();

    await waitForCondition(() => didCloseEventSpy.events.length === 1);
    expect(didCloseEventSpy).toHaveReceivedEventTimes(1);
    await page.waitForChanges();

    expect(dialog).not.toHaveAttribute('open');
    expect(sectionDialog).not.toHaveAttribute('open');
  });

  it('closes the navigation and the section on Esc key press', async () => {
    const didOpenEventSpy = await page.spyOnEvent(events.didOpen);
    const didCloseEventSpy = await page.spyOnEvent(events.didClose);
    const dialog = await page.find('sbb-navigation >>> dialog');
    const sectionDialog = await page.find('sbb-navigation-section#first-section >>> dialog');
    const action = await page.find(
      'sbb-navigation > sbb-navigation-marker > sbb-navigation-action#action-1'
    );

    await element.callMethod('open');
    await page.waitForChanges();

    action.triggerEvent('click', { bubbles: true, cancelable: true, composed: true });
    await page.waitForChanges();

    await waitForCondition(() => didOpenEventSpy.events.length === 1);
    expect(didOpenEventSpy).toHaveReceivedEventTimes(1);
    await page.waitForChanges();

    expect(dialog).toHaveAttribute('open');
    expect(sectionDialog).toHaveAttribute('open');

    await page.keyboard.down('Tab');
    await page.waitForChanges();

    await page.keyboard.down('Escape');
    await page.waitForChanges();

    await waitForCondition(() => didCloseEventSpy.events.length === 1);
    expect(didCloseEventSpy).toHaveReceivedEventTimes(1);
    await page.waitForChanges();

    expect(dialog).not.toHaveAttribute('open');
    expect(sectionDialog).not.toHaveAttribute('open');
  });

  it('closes section with sbb-navigation-section-close', async () => {
    const didOpenEventSpy = await page.spyOnEvent(events.didOpen);
    const dialog = await page.find('sbb-navigation >>> dialog');
    const sectionDialog = await page.find('sbb-navigation-section#first-section >>> dialog');
    const action = await page.find(
      'sbb-navigation > sbb-navigation-marker > sbb-navigation-action#action-1'
    );
    const closeEl = await page.find(
      'sbb-navigation > sbb-navigation-section > sbb-navigation-action[sbb-navigation-section-close]'
    );

    await element.callMethod('open');
    await page.waitForChanges();

    action.triggerEvent('click', { bubbles: true, cancelable: true, composed: true });
    await page.waitForChanges();

    await waitForCondition(() => didOpenEventSpy.events.length === 1);
    expect(didOpenEventSpy).toHaveReceivedEventTimes(1);
    await page.waitForChanges();

    expect(dialog).toHaveAttribute('open');
    expect(sectionDialog).toHaveAttribute('open');

    closeEl.triggerEvent('click', { bubbles: true, cancelable: true, composed: true });
    await page.waitForChanges();

    expect(dialog).toHaveAttribute('open');
    expect(sectionDialog).not.toHaveAttribute('open');
  });
});

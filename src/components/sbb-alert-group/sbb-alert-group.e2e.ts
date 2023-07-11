import { newE2EPage } from '@stencil/core/testing';
import events from './sbb-alert-group.events';
import { waitForCondition } from '../../global/helpers/testing/wait-for-condition';

describe('sbb-alert-group', () => {
  it('should handle events ond states on interacting with alerts', async () => {
    const alertGroupId = 'alertgroup';
    const accessibilityTitle = 'Disruptions';
    const accessibilityTitleLevel = '3';

    // Given sbb-alert-group with two alerts
    const page = await newE2EPage();
    await page.setContent(`
  <sbb-alert-group id='${alertGroupId}' accessibility-title='${accessibilityTitle}' accessibility-title-level='${accessibilityTitleLevel}'>
    <sbb-alert title-content='Interruption' href='www.sbb.ch'>First</sbb-alert>
    <sbb-alert title-content='Interruption' href='www.sbb.ch'>Second</sbb-alert>
  </sbb-alert-group>
`);
    const didDismissAlertSpy = await page.spyOnEvent(events.didDismissAlert);
    const emptySpy = await page.spyOnEvent(events.empty);

    // When rendering initially
    await page.waitForChanges();

    // Then two alerts should be rendered and accessibility title should be displayed
    expect((await page.findAll('sbb-alert')).length).toBe(2);
    const alertGroupTitle = await page.find('sbb-alert-group >>> .sbb-alert-group__title');
    expect(alertGroupTitle.textContent).toBe(accessibilityTitle);
    expect(alertGroupTitle.tagName).toBe(`H${accessibilityTitleLevel}`);

    // When clicking on close button of the first alert
    await (await page.find('sbb-alert >>> .sbb-alert__close-button-wrapper sbb-button')).click();
    await page.waitForChanges();

    // Then one alert should be removed from sbb-alert-group, tabindex should be set to 0,
    // focus should be on sbb-alert-group and accessibility title should still be rendered.
    // Moreover, didDismissAlert event should have been fired.
    expect((await page.findAll('sbb-alert')).length).toBe(1);
    expect((await page.find('sbb-alert-group')).tabIndex).toBe(0);
    expect(await page.evaluate(() => document.activeElement.id)).toBe(alertGroupId);
    expect((await page.find('sbb-alert-group >>> .sbb-alert-group__title')).textContent).toBe(
      accessibilityTitle,
    );
    expect(didDismissAlertSpy).toHaveReceivedEvent();
    expect(emptySpy).not.toHaveReceivedEvent();

    // When clicking on close button of the second alert
    await (await page.find('sbb-alert >>> .sbb-alert__close-button-wrapper sbb-button')).click();
    await page.waitForChanges();

    // Then the alert should be removed from sbb-alert-group, tabindex should be set to 0,
    // focus should be on sbb-alert-group, accessibility title should be removed and empty event should be fired.
    expect((await page.findAll('sbb-alert')).length).toBe(0);
    expect((await page.find('sbb-alert-group')).tabIndex).toBe(0);
    expect(await page.evaluate(() => document.activeElement.id)).toBe(alertGroupId);
    expect(await page.find('sbb-alert-group >>> .sbb-alert-group__title')).toBeNull();
    await waitForCondition(() => didDismissAlertSpy.events.length === 2);
    expect(didDismissAlertSpy).toHaveReceivedEventTimes(2);
    expect(emptySpy).toHaveReceivedEvent();

    // When clicking away (simulated by blur event)
    (await page.find('sbb-alert-group')).triggerEvent('blur');
    await page.waitForChanges();

    // Then the active element id should be unset and tabindex should be removed
    expect(await page.evaluate(() => document.activeElement.id)).toBe('');
    expect((await page.find('sbb-alert-group')).tabIndex).toBe(-1);
  });

  it('should not trigger empty event after initializing with empty sbb-alert-group', async () => {
    // Given empty sbb-alert-group
    const page = await newE2EPage();
    const emptySpy = await page.spyOnEvent(events.empty);

    await page.setContent(`<sbb-alert-group accessibility-title='Disruptions'></sbb-alert-group>`);
    await page.waitForChanges();

    // Then no title should be rendered and no empty event fired
    expect(await page.find('sbb-alert-group >>> .sbb-alert-group__title')).toBeNull();
    expect(emptySpy).not.toHaveReceivedEvent();
  });
});

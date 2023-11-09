import { expect, fixture } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { SbbButton } from '../../button';
import { waitForCondition, EventSpy, waitForLitRender } from '../../core/testing';

import { SbbAlertGroup } from './alert-group';

import '.';
import '../alert';

describe('sbb-alert-group', () => {
  let element: SbbAlertGroup;

  it('should handle events ond states on interacting with alerts', async () => {
    const alertGroupId = 'alertgroup';
    const accessibilityTitle = 'Disruptions';
    const accessibilityTitleLevel = '3';

    // Given sbb-alert-group with two alerts
    element = await fixture(html`
      <sbb-alert-group
        id="${alertGroupId}"
        accessibility-title="${accessibilityTitle}"
        accessibility-title-level="${accessibilityTitleLevel}"
      >
        <sbb-alert title-content="Interruption" href="www.sbb.ch">First</sbb-alert>
        <sbb-alert title-content="Interruption" href="www.sbb.ch">Second</sbb-alert>
      </sbb-alert-group>
    `);
    const didDismissAlertSpy = new EventSpy(SbbAlertGroup.events.didDismissAlert);
    const emptySpy = new EventSpy(SbbAlertGroup.events.empty);

    // When rendering initially
    await waitForLitRender(element);

    // Then two alerts should be rendered and accessibility title should be displayed
    expect(element.querySelectorAll('sbb-alert').length).to.be.equal(2);
    const alertGroupTitle = element.shadowRoot.querySelector('.sbb-alert-group__title');
    expect(alertGroupTitle.textContent.trim()).to.be.equal(accessibilityTitle);
    expect(alertGroupTitle.tagName).to.be.equal(`H${accessibilityTitleLevel}`);

    // When clicking on close button of the first alert
    const closeButton = element
      .querySelector('sbb-alert')
      .shadowRoot.querySelector('.sbb-alert__close-button-wrapper sbb-button') as SbbButton;

    closeButton.focus();
    closeButton.click();
    await waitForLitRender(element);

    // Then one alert should be removed from sbb-alert-group, tabindex should be set to 0,
    // focus should be on sbb-alert-group and accessibility title should still be rendered.
    // Moreover, didDismissAlert event should have been fired.
    await waitForCondition(() => didDismissAlertSpy.events.length === 1);
    expect(didDismissAlertSpy.count).to.be.equal(1);
    expect(element.querySelectorAll('sbb-alert').length).to.be.equal(1);
    expect(element.tabIndex).to.be.equal(0);
    expect(document.activeElement.id).to.be.equal(alertGroupId);
    expect(
      element.shadowRoot.querySelector('.sbb-alert-group__title').textContent.trim(),
    ).to.be.equal(accessibilityTitle);
    expect(emptySpy.count).not.to.be.greaterThan(0);

    // When clicking on close button of the second alert
    (
      element
        .querySelector('sbb-alert')
        .shadowRoot.querySelector('.sbb-alert__close-button-wrapper sbb-button') as SbbButton
    ).click();
    await waitForLitRender(element);

    // Then the alert should be removed from sbb-alert-group, tabindex should be set to 0,
    // focus should be on sbb-alert-group, accessibility title should be removed and empty event should be fired.
    expect(element.querySelectorAll('sbb-alert').length).to.be.equal(0);
    expect(element.tabIndex).to.be.equal(0);
    expect(document.activeElement.id).to.be.equal(alertGroupId);
    expect(element.shadowRoot.querySelector('.sbb-alert-group__title')).to.be.null;
    await waitForCondition(() => didDismissAlertSpy.events.length === 2);
    expect(didDismissAlertSpy.count).to.be.equal(2);
    expect(emptySpy.count).to.be.greaterThan(0);

    // When clicking away (simulated by blur event)
    element.dispatchEvent(new CustomEvent('blur'));
    await waitForLitRender(element);

    // Then the active element id should be unset and tabindex should be removed
    await waitForCondition(() => document.activeElement.id === '');
    expect(document.activeElement.id).to.be.equal('');
    expect(element.tabIndex).to.be.equal(-1);
  });

  it('should not trigger empty event after initializing with empty sbb-alert-group', async () => {
    // Given empty sbb-alert-group
    element = await fixture(
      html`<sbb-alert-group accessibility-title="Disruptions"></sbb-alert-group>`,
    );
    const emptySpy = new EventSpy(SbbAlertGroup.events.empty);

    // Then no title should be rendered and no empty event fired
    expect(element.shadowRoot.querySelector('.sbb-alert-group__title')).to.be.null;
    expect(emptySpy.count).not.to.be.greaterThan(0);
  });
});

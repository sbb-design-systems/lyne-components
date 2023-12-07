import { assert, expect, fixture } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { waitForCondition, EventSpy } from '../../core/testing';

import { SbbAlertElement } from './alert';

describe('sbb-alert', () => {
  let alert: SbbAlertElement;

  it('renders', async () => {
    alert = await fixture(html`<sbb-alert></sbb-alert>`);
    assert.instanceOf(alert, SbbAlertElement);
  });

  it('should fire animation events', async () => {
    const willPresentSpy = new EventSpy(SbbAlertElement.events.willPresent);
    const didPresentSpy = new EventSpy(SbbAlertElement.events.didPresent);

    await fixture(html`<sbb-alert title-content="disruption">Interruption</sbb-alert>`);

    await waitForCondition(() => willPresentSpy.events.length === 1);
    expect(willPresentSpy.count).to.be.equal(1);
    await waitForCondition(() => didPresentSpy.events.length === 1);
    expect(didPresentSpy.count).to.be.equal(1);
  });
});

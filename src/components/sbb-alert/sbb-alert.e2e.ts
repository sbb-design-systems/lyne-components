import { waitForCondition } from '../../global/testing';
import { assert, expect, fixture } from '@open-wc/testing';
import { html } from 'lit/static-html.js';
import { EventSpy } from '../../global/testing';
import { SbbAlert } from './sbb-alert';

describe('sbb-alert', () => {
  let alert: SbbAlert;

  it('renders', async () => {
    alert = await fixture(html`<sbb-alert></sbb-alert>`);
    assert.instanceOf(alert, SbbAlert);
  });

  it('should fire animation events', async () => {
    const willPresentSpy = new EventSpy(SbbAlert.events.willPresent);
    const didPresentSpy = new EventSpy(SbbAlert.events.didPresent);

    await fixture(html`<sbb-alert title-content="disruption">Interruption</sbb-alert>`);

    await waitForCondition(() => willPresentSpy.events.length === 1);
    expect(willPresentSpy.count).to.be.equal(1);
    await waitForCondition(() => didPresentSpy.events.length === 1);
    expect(didPresentSpy.count).to.be.equal(1);
  });
});

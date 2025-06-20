import { assert, aTimeout, expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { fixture } from '../../core/testing/private.js';
import { EventSpy } from '../../core/testing.js';

import { SbbAlertElement } from './alert.component.js';

describe(`sbb-alert`, () => {
  let alert: SbbAlertElement;

  it('renders', async () => {
    alert = await fixture(html`<sbb-alert></sbb-alert>`);
    assert.instanceOf(alert, SbbAlertElement);
  });

  it('should fire animation events', async () => {
    const beforeOpenSpy = new EventSpy(SbbAlertElement.events.beforeopen, null, { capture: true });
    const openSpy = new EventSpy(SbbAlertElement.events.open, null, { capture: true });
    const beforeCloseSpy = new EventSpy(SbbAlertElement.events.beforeclose, null, {
      capture: true,
    });
    const closeSpy = new EventSpy(SbbAlertElement.events.close, null, { capture: true });

    const alert: SbbAlertElement = await fixture(
      html`<sbb-alert title-content="disruption">Interruption</sbb-alert>`,
    );

    await beforeOpenSpy.calledOnce();
    expect(beforeOpenSpy.count).to.be.equal(1);
    await openSpy.calledOnce();
    expect(openSpy.count).to.be.equal(1);

    alert.close();

    await closeSpy.calledOnce();
    expect(beforeCloseSpy.count).to.be.equal(1);
    expect(closeSpy.count).to.be.equal(1);
  });

  it('should fire animation events with non-zero animation duration', async () => {
    const openSpy = new EventSpy(SbbAlertElement.events.open, null, { capture: true });
    const closeSpy = new EventSpy(SbbAlertElement.events.close, null, { capture: true });

    const alert: SbbAlertElement = await fixture(
      html`<sbb-alert title-content="disruption" style="--sbb-alert-animation-duration: 1ms">
        Interruption
      </sbb-alert>`,
    );

    await openSpy.calledOnce();

    alert.close();

    await closeSpy.calledOnce();
    expect(closeSpy.count).to.be.equal(1);
  });

  it('should respect canceled beforeClose event', async () => {
    const openSpy = new EventSpy(SbbAlertElement.events.open, null, { capture: true });
    const beforeCloseSpy = new EventSpy(SbbAlertElement.events.beforeclose, null, {
      capture: true,
    });
    const closeSpy = new EventSpy(SbbAlertElement.events.close, null, { capture: true });

    const alert: SbbAlertElement = await fixture(
      html`<sbb-alert title-content="disruption">Interruption</sbb-alert>`,
    );

    alert.addEventListener(SbbAlertElement.events.beforeclose, (ev) => ev.preventDefault());

    await openSpy.calledOnce();

    alert.close();

    await beforeCloseSpy.calledOnce();
    expect(beforeCloseSpy.count).to.be.equal(1);

    // Wait a period to ensure the 'close' event is not dispatched.
    await aTimeout(10);
    expect(closeSpy.count).to.be.equal(0);
  });

  it('should hide close button in readonly mode', async () => {
    alert = await fixture(
      html`<sbb-alert title-content="Interruption" readonly>Alert content</sbb-alert>`,
    );

    expect(alert.shadowRoot!.querySelector('.sbb-alert__close-button-wrapper')).to.be.null;
  });
});

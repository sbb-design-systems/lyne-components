import { assert, aTimeout, expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { fixture } from '../../core/testing/private.js';
import { EventSpy, waitForLitRender } from '../../core/testing.js';

import { SbbAlertElement } from './alert.component.js';

import '../../title.js';

describe(`sbb-alert`, () => {
  let alert: SbbAlertElement,
    beforeOpenSpy: EventSpy<CustomEvent<void>>,
    openSpy: EventSpy<CustomEvent<void>>,
    beforeCloseSpy: EventSpy<CustomEvent<void>>,
    closeSpy: EventSpy<CustomEvent<void>>;

  beforeEach(async () => {
    beforeOpenSpy = new EventSpy(SbbAlertElement.events.beforeopen, null, { capture: true });
    openSpy = new EventSpy(SbbAlertElement.events.open, null, { capture: true });
    beforeCloseSpy = new EventSpy(SbbAlertElement.events.beforeclose, null, {
      capture: true,
    });
    closeSpy = new EventSpy(SbbAlertElement.events.close, null, { capture: true });

    alert = await fixture(
      html`<sbb-alert>
        <sbb-title level="3">Disruption</sbb-title>
        Interruption
      </sbb-alert>`,
    );
  });

  it('renders', async () => {
    assert.instanceOf(alert, SbbAlertElement);
  });

  it('should fire animation events', async () => {
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
    const alert: SbbAlertElement = await fixture(
      html`<sbb-alert style="--sbb-alert-animation-duration: 1ms">
        <sbb-title level="3">Disruption</sbb-title>
        Interruption
      </sbb-alert>`,
    );

    await openSpy.calledOnce();

    alert.close();

    await closeSpy.calledOnce();
    expect(closeSpy.count).to.be.equal(1);
  });

  it('should respect canceled willClose event', async () => {
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
    alert.readOnly = true;
    await waitForLitRender(alert);

    expect(alert.shadowRoot!.querySelector('.sbb-alert__close-button-wrapper')).to.be.null;
  });

  it('should sync title size', async () => {
    expect(alert.querySelector('sbb-title')!.visualLevel).to.be.equal('5');
    alert.size = 'l';
    await waitForLitRender(alert);

    expect(alert.querySelector('sbb-title')!.visualLevel).to.be.equal('3');
  });
});

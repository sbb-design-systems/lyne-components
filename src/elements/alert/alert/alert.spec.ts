import { assert, aTimeout, expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { fixture } from '../../core/testing/private.js';
import { EventSpy, waitForLitRender } from '../../core/testing.js';

import { SbbAlertElement } from './alert.component.js';

import '../../title.js';

describe(`sbb-alert`, () => {
  let alert: SbbAlertElement,
    willOpenSpy: EventSpy<CustomEvent<void>>,
    didOpenSpy: EventSpy<CustomEvent<void>>,
    willCloseSpy: EventSpy<CustomEvent<void>>,
    didCloseSpy: EventSpy<CustomEvent<void>>;

  beforeEach(async () => {
    willOpenSpy = new EventSpy(SbbAlertElement.events.willOpen, null, { capture: true });
    didOpenSpy = new EventSpy(SbbAlertElement.events.didOpen, null, { capture: true });
    willCloseSpy = new EventSpy(SbbAlertElement.events.willClose, null, { capture: true });
    didCloseSpy = new EventSpy(SbbAlertElement.events.didClose, null, { capture: true });

    alert = await fixture(
      html`<sbb-alert>
        <sbb-title level="3">Disruption</sbb-title>
        <p>Interruption</p>
      </sbb-alert>`,
    );
  });

  it('renders', async () => {
    assert.instanceOf(alert, SbbAlertElement);
  });

  it('should fire animation events', async () => {
    await willOpenSpy.calledOnce();
    expect(willOpenSpy.count).to.be.equal(1);
    await didOpenSpy.calledOnce();
    expect(didOpenSpy.count).to.be.equal(1);

    alert.close();

    await didCloseSpy.calledOnce();
    expect(willCloseSpy.count).to.be.equal(1);
    expect(didCloseSpy.count).to.be.equal(1);
  });

  it('should fire animation events with non-zero animation duration', async () => {
    const didOpenSpy = new EventSpy(SbbAlertElement.events.didOpen, null, { capture: true });

    const alert: SbbAlertElement = await fixture(
      html`<sbb-alert style="--sbb-alert-animation-duration: 1ms">
        <sbb-title level="3">Disruption</sbb-title>
        <p>Interruption</p>
      </sbb-alert>`,
    );

    await didOpenSpy.calledOnce();

    alert.close();

    await didCloseSpy.calledOnce();
    expect(didCloseSpy.count).to.be.equal(1);
  });

  it('should respect canceled willClose event', async () => {
    alert.addEventListener(SbbAlertElement.events.willClose, (ev) => ev.preventDefault());

    await didOpenSpy.calledOnce();

    alert.close();

    await willCloseSpy.calledOnce();
    expect(willCloseSpy.count).to.be.equal(1);

    // Wait a period to ensure the  didCLose event was not dispatched.
    await aTimeout(10);
    expect(didCloseSpy.count).to.be.equal(0);
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

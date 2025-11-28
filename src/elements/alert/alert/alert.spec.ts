import { assert, aTimeout, expect } from '@open-wc/testing';
import { emulateMedia } from '@web/test-runner-commands';
import { html } from 'lit/static-html.js';

import { SbbDarkModeController } from '../../core/controllers.ts';
import { fixture } from '../../core/testing/private.ts';
import { EventSpy, waitForCondition, waitForLitRender } from '../../core/testing.ts';

import { SbbAlertElement } from './alert.component.ts';

import '../../title.ts';
import '../../link.ts';

describe(`sbb-alert`, () => {
  let alert: SbbAlertElement,
    beforeOpenSpy: EventSpy<Event>,
    openSpy: EventSpy<Event>,
    beforeCloseSpy: EventSpy<Event>,
    closeSpy: EventSpy<Event>;

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
        Interruption <sbb-link href="#">Link</sbb-link>
      </sbb-alert>`,
    );

    await emulateMedia({ colorScheme: 'light' });
    SbbDarkModeController.requestUpdate();
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
    (globalThis as { disableAnimation?: boolean }).disableAnimation = false;

    const alert: SbbAlertElement = await fixture(
      html`<sbb-alert style="--sbb-alert-animation-duration: 1ms">
        <sbb-title level="3">Disruption</sbb-title>
        Interruption
      </sbb-alert>`,
    );

    openSpy = new EventSpy(SbbAlertElement.events.open, alert, { capture: true });
    closeSpy = new EventSpy(SbbAlertElement.events.close, alert, { capture: true });

    await openSpy.calledOnce();

    await aTimeout(10);
    alert.close();

    await closeSpy.calledOnce();
    expect(closeSpy.count).to.be.equal(1);
  });

  it('should respect canceled beforeclose event', async () => {
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

  it('should sync negative property when color scheme changes', async () => {
    const link = alert.querySelector('sbb-link')!;
    const title = alert.querySelector('sbb-title')!;
    const divider = alert.shadowRoot!.querySelector('sbb-divider')!;
    const button = alert.shadowRoot!.querySelector('sbb-transparent-button')!;

    expect(alert).not.to.match(':state(dark)');
    expect(link.negative, 'link negative').to.be.true;
    expect(title.negative, 'title negative').to.be.true;
    expect(divider.negative, 'divider negative').to.be.true;
    expect(button.negative, 'button negative').to.be.true;

    await emulateMedia({ colorScheme: 'dark' });
    await waitForCondition(() => !link.negative);

    expect(alert).to.match(':state(dark)');
    expect(link.negative, 'link not negative').to.be.false;
    expect(title.negative, 'title not negative').to.be.false;
    expect(divider.negative, 'divider not negative').to.be.false;
    expect(button.negative, 'button not negative').to.be.false;
  });

  it('should sync negative property when calling SbbDarkModeController.requestUpdate()', async () => {
    const button = alert.shadowRoot!.querySelector('sbb-transparent-button')!;
    expect(button.negative, 'button negative').to.be.true;
    expect(alert).not.to.match(':state(dark)');

    alert.style.colorScheme = 'dark';
    SbbDarkModeController.requestUpdate();
    await waitForLitRender(alert);

    expect(button.negative, 'button not negative').to.be.false;
    expect(alert).to.match(':state(dark)');
  });

  it('should sync negative property when removed from DOM and re-added', async () => {
    const button = alert.shadowRoot!.querySelector('sbb-transparent-button')!;
    expect(button.negative, 'button negative').to.be.true;
    expect(alert).not.to.match(':state(dark)');

    alert.remove();

    await emulateMedia({ colorScheme: 'dark' });

    document.documentElement.appendChild(alert);
    await waitForLitRender(alert);

    expect(button.negative, 'button not negative').to.be.false;
    expect(alert).to.match(':state(dark)');
  });

  it('should sync negative property changing sbb-dark class', async () => {
    document.documentElement.classList.add('sbb-light');

    const button = alert.shadowRoot!.querySelector('sbb-transparent-button')!;
    expect(button.negative, 'button negative').to.be.true;
    expect(alert).not.to.match(':state(dark)');

    document.documentElement.classList.remove('sbb-light');
    document.documentElement.classList.add('sbb-dark');
    await waitForLitRender(alert);

    expect(button.negative, 'button not negative').to.be.false;
    expect(alert).to.match(':state(dark)');
    document.documentElement.classList.remove('sbb-dark');
  });
});

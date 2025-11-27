import { assert, expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';
import type { Context } from 'mocha';

import type { SbbTransparentButtonElement } from '../button.ts';
import { elementInternalsSpy, fixture } from '../core/testing/private.ts';
import { EventSpy, waitForCondition, waitForLitRender } from '../core/testing.ts';

import { SbbToastElement } from './toast.component.ts';

import '../button/transparent-button.ts';
import '../link/link-button.ts';

describe(`sbb-toast`, () => {
  let element: SbbToastElement;
  const elementInternals = elementInternalsSpy();

  beforeEach(async () => {
    element = await fixture(html`<sbb-toast></sbb-toast>`);
  });

  it('renders and sets the correct attributes', async () => {
    assert.instanceOf(element, SbbToastElement);
    expect(element).not.to.match(':state(has-action)');
    expect(element).not.to.match(':state(has-icon)');
    expect(element).to.match(':state(state-closed)');
    expect(elementInternals.get(element)!.ariaLive).to.equal(element.politeness);
  });

  it('opens and closes after timeout', async function (this: Context) {
    // Flaky on WebKit
    this.retries(3);
    const beforeOpenSpy = new EventSpy(SbbToastElement.events.beforeopen, element);
    const openSpy = new EventSpy(SbbToastElement.events.open, element);
    const beforeCloseSpy = new EventSpy(SbbToastElement.events.beforeclose, element);
    const closeSpy = new EventSpy(SbbToastElement.events.close, element);

    element.setAttribute('timeout', '50');
    await waitForLitRender(element);
    element.open();
    await waitForLitRender(element);

    await beforeOpenSpy.calledOnce();
    expect(beforeOpenSpy.count).to.be.equal(1);
    await waitForLitRender(element);

    await openSpy.calledOnce();
    expect(openSpy.count).to.be.equal(1);
    await waitForLitRender(element);
    expect(element).to.match(':state(state-opened)');
    expect(element).to.match(':popover-open');

    // Will wait for timeout and then close itself

    await waitForLitRender(element);
    await beforeCloseSpy.calledOnce();
    expect(beforeCloseSpy.count).to.be.equal(1);

    await waitForLitRender(element);
    await closeSpy.calledOnce();
    expect(closeSpy.count).to.be.equal(1);

    await waitForLitRender(element);
    expect(element).to.match(':state(state-closed)');
    expect(element).not.to.match(':popover-open');
  });

  it('closes by dismiss button click', async () => {
    const openSpy = new EventSpy(SbbToastElement.events.open, element);
    const beforeCloseSpy = new EventSpy(SbbToastElement.events.beforeclose, element);
    const closeSpy = new EventSpy(SbbToastElement.events.close, element);

    await waitForLitRender(element);
    element.open();
    await waitForLitRender(element);

    await openSpy.calledOnce();

    const dismissBtn =
      element.shadowRoot!.querySelector<SbbTransparentButtonElement>('sbb-transparent-button')!;
    dismissBtn.click();

    await waitForLitRender(element);
    await beforeCloseSpy.calledOnce();
    expect(beforeCloseSpy.count).to.be.equal(1);

    await waitForLitRender(element);
    await closeSpy.calledOnce();
    expect(closeSpy.count).to.be.equal(1);

    await waitForLitRender(element);
    expect(element).to.match(':state(state-closed)');
  });

  it('closes by marked action element', async () => {
    element = await fixture(html`
      <sbb-toast>
        <sbb-transparent-button slot="action" sbb-toast-close></sbb-transparent-button>
      </sbb-toast>
    `);
    const actionBtn = element.querySelector('sbb-transparent-button') as HTMLElement;

    const openSpy = new EventSpy(SbbToastElement.events.open, element);
    const beforeCloseSpy = new EventSpy(SbbToastElement.events.beforeclose, element);
    const closeSpy = new EventSpy(SbbToastElement.events.close, element);

    element.open();
    await waitForLitRender(element);
    await openSpy.calledOnce();

    actionBtn.click();

    await waitForLitRender(element);
    await beforeCloseSpy.calledOnce();
    expect(beforeCloseSpy.count).to.be.equal(1);

    await waitForLitRender(element);
    await closeSpy.calledOnce();
    expect(closeSpy.count).to.be.equal(1);

    await waitForLitRender(element);
    expect(element).to.match(':state(state-closed)');
  });

  it('forces state on button actions', async () => {
    element = await fixture(html`
      <sbb-toast>
        <sbb-transparent-button slot="action"></sbb-transparent-button>
      </sbb-toast>
    `);

    const actionBtn = element.querySelector('sbb-transparent-button');

    expect(actionBtn).to.have.attribute('size', 'm');
    expect(actionBtn).to.have.attribute('negative');
  });

  it('forces state on link actions', async () => {
    element = await fixture(html`
      <sbb-toast>
        <sbb-link-button slot="action"></sbb-link-button>
      </sbb-toast>
    `);
    const actionLink = element.querySelector('sbb-link-button');

    expect(actionLink).to.have.attribute('negative');
  });

  it('closes other toasts on open', async () => {
    element = await fixture<SbbToastElement>(html`
      <div>
        <sbb-toast id="toast1"></sbb-toast>
        <sbb-toast id="toast2"></sbb-toast>
      </div>
    `);

    const [toast1, toast2] = Array.from(element.querySelectorAll('sbb-toast'));

    // Open the first toast
    toast1.open();
    await waitForLitRender(element);

    await waitForCondition(() => toast1.matches(':state(state-opened)'));
    expect(toast1).to.match(':state(state-opened)');

    // Open the second toast and expect the first to be closed
    toast2.open();
    await waitForLitRender(element);

    await waitForCondition(() => toast1.matches(':state(state-closed)'));
    await waitForCondition(() => toast2.matches(':state(state-opened)'));
    expect(toast1).to.match(':state(state-closed)');
    expect(toast2).to.match(':state(state-opened)');
  });

  it('does not open if prevented', async () => {
    const beforeOpenSpy = new EventSpy(SbbToastElement.events.beforeopen, element);

    element.addEventListener(SbbToastElement.events.beforeopen, (ev) => ev.preventDefault());
    element.open();

    await beforeOpenSpy.calledOnce();
    expect(beforeOpenSpy.count).to.be.equal(1);
    await waitForLitRender(element);

    expect(element).to.match(':state(state-closed)');
  });

  it('does not close if prevented', async () => {
    const openSpy = new EventSpy(SbbToastElement.events.open, element);
    const beforeCloseSpy = new EventSpy(SbbToastElement.events.beforeclose, element);

    element.open();
    await openSpy.calledOnce();
    await waitForLitRender(element);

    element.addEventListener(SbbToastElement.events.beforeclose, (ev) => ev.preventDefault());
    element.close();

    await beforeCloseSpy.calledOnce();
    await waitForLitRender(element);

    expect(element).to.match(':state(state-opened)');
  });

  it('closes by dismiss button click with non-zero animation duration', async () => {
    (globalThis as { disableAnimation?: boolean }).disableAnimation = false;

    element.style.setProperty('--sbb-toast-animation-duration', '1ms');
    await waitForLitRender(element);

    const openSpy = new EventSpy(SbbToastElement.events.open, element);
    const closeSpy = new EventSpy(SbbToastElement.events.close, element);

    element.open();
    await waitForLitRender(element);

    await openSpy.calledOnce();

    const dismissBtn =
      element.shadowRoot!.querySelector<SbbTransparentButtonElement>('sbb-transparent-button')!;
    dismissBtn.click();

    await waitForLitRender(element);
    await closeSpy.calledOnce();
    expect(element).to.match(':state(state-closed)');
  });
});

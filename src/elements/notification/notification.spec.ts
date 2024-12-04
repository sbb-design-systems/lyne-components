import { assert, aTimeout, expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import type { SbbSecondaryButtonElement } from '../button.js';
import { fixture } from '../core/testing/private.js';
import { EventSpy, waitForLitRender } from '../core/testing.js';

import { SbbNotificationElement } from './notification.js';

import '../link/link.js';

describe(`sbb-notification`, () => {
  let element: SbbNotificationElement;
  let didOpenEventSpy: EventSpy<Event>;

  beforeEach(async () => {
    didOpenEventSpy = new EventSpy(SbbNotificationElement.events.didOpen);
    element = await fixture(html`
      <sbb-notification id="notification">
        The quick brown fox jumps over the lazy dog. The quick brown fox jumps over the lazy dog.
        <sbb-link href="/">Link one</sbb-link>
      </sbb-notification>
    `);
  });

  it('renders', async () => {
    assert.instanceOf(element, SbbNotificationElement);
  });

  it('closes the notification and removes it from the DOM', async () => {
    const parent = element.parentElement!;
    const willCloseEventSpy = new EventSpy(SbbNotificationElement.events.willClose);
    const didCloseEventSpy = new EventSpy(SbbNotificationElement.events.didClose);

    await didOpenEventSpy.calledOnce();
    expect(element).to.have.attribute('data-state', 'opened');

    element.close();
    await waitForLitRender(element);

    await willCloseEventSpy.calledOnce();
    expect(willCloseEventSpy.count).to.be.equal(1);
    await waitForLitRender(element);

    await didCloseEventSpy.calledOnce();
    expect(didCloseEventSpy.count).to.be.equal(1);
    await waitForLitRender(element);

    expect(element).to.have.attribute('data-state', 'closed');

    await aTimeout(0);
    element = parent.querySelector<SbbNotificationElement>('sbb-notification')!;
    expect(element).to.be.null;
  });

  it('closes the notification and removes it from the DOM on close button click', async () => {
    const parent = element.parentElement!;
    const willCloseEventSpy = new EventSpy(SbbNotificationElement.events.willClose);
    const didCloseEventSpy = new EventSpy(SbbNotificationElement.events.didClose);
    const closeButton = element.shadowRoot!.querySelector(
      '.sbb-notification__close',
    ) as SbbSecondaryButtonElement;

    await didOpenEventSpy.calledOnce();
    expect(element).to.have.attribute('data-state', 'opened');

    closeButton.click();
    await waitForLitRender(element);

    await willCloseEventSpy.calledOnce();
    expect(willCloseEventSpy.count).to.be.equal(1);
    await waitForLitRender(element);

    await didCloseEventSpy.calledOnce();
    expect(didCloseEventSpy.count).to.be.equal(1);
    await waitForLitRender(element);

    expect(element).to.have.attribute('data-state', 'closed');

    await aTimeout(0);
    element = parent.querySelector<SbbNotificationElement>('sbb-notification')!;
    expect(element).to.be.null;
  });
});

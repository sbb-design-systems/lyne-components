import { assert, aTimeout, expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';
import type { Context } from 'mocha';

import type { SbbSecondaryButtonElement } from '../button.ts';
import { fixture } from '../core/testing/private.ts';
import { EventSpy, waitForLitRender } from '../core/testing.ts';

import { SbbNotificationElement } from './notification.component.ts';

import '../link/link.ts';
import '../title.ts';

describe(`sbb-notification`, () => {
  let element: SbbNotificationElement;
  let openSpy: EventSpy<Event>;

  async function openAndClose(): Promise<void> {
    const parent = element.parentElement!;
    const beforeCloseSpy = new EventSpy(SbbNotificationElement.events.beforeclose, element);
    const closeSpy = new EventSpy(SbbNotificationElement.events.close, element);

    await openSpy.calledOnce();
    expect(element).to.match(':state(state-opened)');

    element.close();
    await waitForLitRender(element);

    await beforeCloseSpy.calledOnce();
    expect(beforeCloseSpy.count).to.be.equal(1);
    await waitForLitRender(element);

    await closeSpy.calledOnce();
    expect(closeSpy.count).to.be.equal(1);
    await waitForLitRender(element);

    expect(element).to.match(':state(state-closed)');

    await aTimeout(0);
    element = parent.querySelector<SbbNotificationElement>('sbb-notification')!;
    expect(element).to.be.null;
  }

  describe('with zero animation duration', () => {
    beforeEach(async () => {
      openSpy = new EventSpy(SbbNotificationElement.events.open, null, {
        capture: true,
      });
      element = await fixture(html`
        <sbb-notification id="notification">
          <sbb-title level="3">Title</sbb-title>
          The quick brown fox jumps over the lazy dog. The quick brown fox jumps over the lazy dog.
          <sbb-link href="/">Link one</sbb-link>
        </sbb-notification>
      `);
    });

    it('renders', async () => {
      assert.instanceOf(element, SbbNotificationElement);
    });

    it('closes the notification and removes it from the DOM', async () => {
      await openAndClose();
    });

    it('closes the notification and removes it from the DOM on close button click', async () => {
      const parent = element.parentElement!;
      const beforeCloseSpy = new EventSpy(SbbNotificationElement.events.beforeclose, element);
      const closeSpy = new EventSpy(SbbNotificationElement.events.close, element);
      const closeButton = element.shadowRoot!.querySelector(
        '.sbb-notification__close',
      ) as SbbSecondaryButtonElement;

      await openSpy.calledOnce();
      expect(element).to.match(':state(state-opened)');

      closeButton.click();
      await waitForLitRender(element);

      await beforeCloseSpy.calledOnce();
      expect(beforeCloseSpy.count).to.be.equal(1);
      await waitForLitRender(element);

      await closeSpy.calledOnce();
      expect(closeSpy.count).to.be.equal(1);
      await waitForLitRender(element);

      expect(element).to.match(':state(state-closed)');

      await aTimeout(0);
      element = parent.querySelector<SbbNotificationElement>('sbb-notification')!;
      expect(element).to.be.null;
    });

    it('should sync title size', async () => {
      expect(element.querySelector('sbb-title')!.visualLevel).to.be.equal('5');
      element.size = 's';
      await waitForLitRender(element);

      expect(element.querySelector('sbb-title')!.visualLevel).to.be.equal('6');
    });
  });

  describe('with non-zero animation duration', () => {
    it('closes the notification and removes it from the DOM with animationend event', async function (this: Context) {
      (globalThis as { disableAnimation?: boolean }).disableAnimation = false;

      openSpy = new EventSpy(SbbNotificationElement.events.open, null, {
        capture: true,
      });
      element = await fixture(html`
        <sbb-notification id="notification" style="--sbb-notification-animation-duration: 1ms">
          The quick brown fox jumps over the lazy dog. The quick brown fox jumps over the lazy dog.
          <sbb-link href="/">Link one</sbb-link>
        </sbb-notification>
      `);

      await openAndClose();
    });
  });
});

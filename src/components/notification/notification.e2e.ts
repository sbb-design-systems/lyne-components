import { csrFixture, ssrHydratedFixture, cleanupFixtures } from '@lit-labs/testing/fixtures.js';
import { assert, expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { SbbButton } from '../button';
import { waitForCondition, EventSpy, waitForLitRender } from '../core/testing';

import { SbbNotification } from './notification';

import '../link';

const ssrModules = ['./notification.ts'];
for (const fixture of [csrFixture, ssrHydratedFixture]) {
  describe(`sbb-notification rendered with ${fixture.name}`, () => {
    let element: SbbNotification;

    beforeEach(async () => {
      element = await fixture(
        html`
          <sbb-notification id="notification" disable-animation>
            The quick brown fox jumps over the lazy dog. The quick brown fox jumps over the lazy
            dog.
            <sbb-link href="/" variant="inline">Link one</sbb-link>
          </sbb-notification>
        `,
        { modules: ssrModules },
      );
    });

    afterEach(() => {
      cleanupFixtures();
    });

    it('renders', async () => {
      assert.instanceOf(element, SbbNotification);
    });

    it('closes the notification and removes it from the DOM', async () => {
      const willCloseEventSpy = new EventSpy(SbbNotification.events.willClose);
      const didCloseEventSpy = new EventSpy(SbbNotification.events.didClose);

      expect(element).not.to.be.null;
      expect(element).to.have.attribute('data-state', 'opened');

      element.close();
      await waitForLitRender(element);

      await waitForCondition(() => willCloseEventSpy.events.length === 1);
      expect(willCloseEventSpy.count).to.be.equal(1);
      await waitForLitRender(element);

      await waitForCondition(() => didCloseEventSpy.events.length === 1);
      expect(didCloseEventSpy.count).to.be.equal(1);
      await waitForLitRender(element);

      expect(element).to.have.attribute('data-state', 'closed');

      element = document.querySelector('sbb-notification');
      expect(element).to.be.null;
    });

    it('closes the notification and removes it from the DOM on close button click', async () => {
      const willCloseEventSpy = new EventSpy(SbbNotification.events.willClose);
      const didCloseEventSpy = new EventSpy(SbbNotification.events.didClose);
      const closeButton = element.shadowRoot.querySelector('.sbb-notification__close') as SbbButton;

      expect(element).not.to.be.null;
      expect(element).to.have.attribute('data-state', 'opened');

      closeButton.click();
      await waitForLitRender(element);

      await waitForCondition(() => willCloseEventSpy.events.length === 1);
      expect(willCloseEventSpy.count).to.be.equal(1);
      await waitForLitRender(element);

      await waitForCondition(() => didCloseEventSpy.events.length === 1);
      expect(didCloseEventSpy.count).to.be.equal(1);
      await waitForLitRender(element);

      expect(element).to.have.attribute('data-state', 'closed');

      element = document.querySelector('sbb-notification');
      expect(element).to.be.null;
    });
  });
}

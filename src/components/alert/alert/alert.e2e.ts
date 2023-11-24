import { csrFixture, ssrHydratedFixture, cleanupFixtures } from '@lit-labs/testing/fixtures.js';
import { assert, expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { waitForCondition, EventSpy } from '../../core/testing';

import { SbbAlert } from './alert';

const ssrModules = ['./alert.ts'];
for (const fixture of [csrFixture, ssrHydratedFixture]) {
  describe(`sbb-alert rendered with ${fixture.name}`, () => {
    let alert: SbbAlert;

    afterEach(() => {
      cleanupFixtures();
    });

    it('renders', async () => {
      alert = await fixture(html`<sbb-alert></sbb-alert>`, { modules: ssrModules });
      assert.instanceOf(alert, SbbAlert);
    });

    it('should fire animation events', async () => {
      const willPresentSpy = new EventSpy(SbbAlert.events.willPresent);
      const didPresentSpy = new EventSpy(SbbAlert.events.didPresent);

      await fixture(html`<sbb-alert title-content="disruption">Interruption</sbb-alert>`, {
        modules: ssrModules,
      });

      await waitForCondition(() => willPresentSpy.events.length === 1);
      expect(willPresentSpy.count).to.be.equal(1);
      await waitForCondition(() => didPresentSpy.events.length === 1);
      expect(didPresentSpy.count).to.be.equal(1);
    });
  });
}

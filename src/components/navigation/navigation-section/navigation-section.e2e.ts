import { csrFixture, ssrHydratedFixture, cleanupFixtures } from '@lit-labs/testing/fixtures.js';
import { assert, expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { waitForCondition, waitForLitRender } from '../../core/testing';

import { SbbNavigationSection } from './navigation-section';
import '../navigation';
import '../navigation-list';
import '../navigation-action';

const ssrModules = ['./navigation-section.ts'];
for (const fixture of [csrFixture, ssrHydratedFixture]) {
  describe(`sbb-navigation-section rendered with ${fixture.name}`, () => {
    let element: SbbNavigationSection;

    beforeEach(async () => {
      await fixture(
        html`
          <sbb-navigation disable-animation>
            <sbb-navigation-section disable-animation>
              <sbb-navigation-list>
                <sbb-navigation-action>Tickets & Offers</sbb-navigation-action>
                <sbb-navigation-action>Vacations & Recreation</sbb-navigation-action>
                <sbb-navigation-action>Travel information</sbb-navigation-action>
                <sbb-navigation-action>Help & Contact</sbb-navigation-action>
              </sbb-navigation-list>
            </sbb-navigation-section>
          </sbb-navigation>
        `,
        { modules: ssrModules },
      );
      element = document.querySelector('sbb-navigation-section');
    });

    afterEach(() => {
      cleanupFixtures();
    });

    it('renders', async () => {
      assert.instanceOf(element, SbbNavigationSection);
    });

    it('opens the section', async () => {
      element.open();
      await waitForLitRender(element);

      await waitForCondition(() => element.getAttribute('data-state') === 'opened');
      expect(element).to.have.attribute('data-state', 'opened');
    });

    it('closes the section', async () => {
      element.open();
      await waitForLitRender(element);

      await waitForCondition(() => element.getAttribute('data-state') === 'opened');
      expect(element).to.have.attribute('data-state', 'opened');

      element.close();
      await waitForLitRender(element);

      await waitForCondition(() => element.getAttribute('data-state') === 'closed');
      expect(element).to.have.attribute('data-state', 'closed');
    });
  });
}

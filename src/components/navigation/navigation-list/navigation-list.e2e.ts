import { csrFixture, ssrHydratedFixture, cleanupFixtures } from '@lit-labs/testing/fixtures.js';
import { assert, expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { SbbNavigationList } from './navigation-list';
import '../navigation-action';

const ssrModules = ['./navigation-list.ts'];
for (const fixture of [csrFixture, ssrHydratedFixture]) {
  describe(`sbb-navigation-list rendered with ${fixture.name}`, () => {
    let element: SbbNavigationList;

    beforeEach(async () => {
      element = await fixture(
        html`
          <sbb-navigation-list>
            <sbb-navigation-action>Label</sbb-navigation-action>
          </sbb-navigation-list>
        `,
        { modules: ssrModules },
      );
    });

    afterEach(() => {
      cleanupFixtures();
    });

    it('renders', () => {
      assert.instanceOf(element, SbbNavigationList);
    });

    it('automatic list generation', () => {
      const list = element.shadowRoot.querySelector('ul');
      expect(list.className).to.be.equal('sbb-navigation-list__content');

      const listItem = list.querySelector('li');
      expect(listItem).to.have.class('sbb-navigation-list__action');
    });

    it('force size on children elements', () => {
      const action = element.querySelector('sbb-navigation-action');
      expect(action).to.have.attribute('size', 'm');
    });
  });
}

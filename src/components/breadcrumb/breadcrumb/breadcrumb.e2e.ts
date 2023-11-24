import { csrFixture, ssrHydratedFixture, cleanupFixtures } from '@lit-labs/testing/fixtures.js';
import { assert, expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { waitForCondition, EventSpy, waitForLitRender } from '../../core/testing';

import { SbbBreadcrumb } from './breadcrumb';

const ssrModules = ['./breadcrumb.ts'];
for (const fixture of [csrFixture, ssrHydratedFixture]) {
  describe(`sbb-breadcrumb rendered with ${fixture.name}`, () => {
    let element: SbbBreadcrumb;

    beforeEach(async () => {
      element = await fixture(html`<sbb-breadcrumb id="focus-id" href="#">Test</sbb-breadcrumb>`, {
        modules: ssrModules,
      });
    });

    afterEach(() => {
      cleanupFixtures();
    });

    it('renders', async () => {
      assert.instanceOf(element, SbbBreadcrumb);
    });

    it('dispatches event on click', async () => {
      const changeSpy = new EventSpy('click');

      element.click();
      await waitForCondition(() => changeSpy.events.length === 1);
      expect(changeSpy.count).to.be.equal(1);
    });

    it('should receive focus', async () => {
      element.focus();
      await waitForLitRender(element);

      expect(document.activeElement.id).to.be.equal('focus-id');
    });
  });
}

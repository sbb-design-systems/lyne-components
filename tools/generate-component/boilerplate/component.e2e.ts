import { csrFixture, ssrHydratedFixture, cleanupFixtures } from '@lit-labs/testing/fixtures.js';
import { assert, expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';
import { EventSpy, waitForLitRender } from '../core/testing';
import { __nameUpperCase__ } from './__noPrefixName__';

const ssrModules = ['./component.ts'];
for (const fixture of [csrFixture, ssrHydratedFixture]) {
  describe(`__name__ rendered with ${fixture.name}`, () => {
    let element: __nameUpperCase__;

    beforeEach(async () => {
      element = await fixture(html`<__name__></__name__>`, { modules: ssrModules });
    });

    afterEach(() => {
      cleanupFixtures();
    });

    it('renders', async () => {
      assert.instanceOf(element, __nameUpperCase__);
    });

    it('emits on click', async () => {
      const myEventNameSpy = new EventSpy(__nameUpperCase__.events.myEventName);
      element.click();
      await waitForLitRender(element);
      expect(myEventNameSpy.count).to.be.equal(1);
    });
  });
}

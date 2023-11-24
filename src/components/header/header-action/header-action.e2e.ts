import { csrFixture, ssrHydratedFixture, cleanupFixtures } from '@lit-labs/testing/fixtures.js';
import { assert, expect } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import { html } from 'lit/static-html.js';

import { EventSpy, waitForCondition, waitForLitRender } from '../../core/testing';

import { SbbHeaderAction } from './header-action';

const ssrModules = ['./header-action.ts'];
for (const fixture of [csrFixture, ssrHydratedFixture]) {
  describe(`sbb-header-action rendered with ${fixture.name}`, () => {
    let element: SbbHeaderAction;

    beforeEach(async () => {
      element = await fixture(html`<sbb-header-action id="focus-id">Action</sbb-header-action>`, {
        modules: ssrModules,
      });
    });

    afterEach(() => {
      cleanupFixtures();
    });

    it('renders', async () => {
      assert.instanceOf(element, SbbHeaderAction);
    });

    describe('events', () => {
      it('dispatches event on click', async () => {
        const clickSpy = new EventSpy('click');

        element.click();
        await waitForCondition(() => clickSpy.events.length === 1);
        expect(clickSpy.count).to.be.equal(1);
      });

      it('should dispatch click event on pressing Enter', async () => {
        const clickSpy = new EventSpy('click');
        element.focus();
        await sendKeys({ press: 'Enter' });
        expect(clickSpy.count).to.be.greaterThan(0);
      });

      it('should dispatch click event on pressing Space', async () => {
        const clickSpy = new EventSpy('click');
        element.focus();
        await sendKeys({ press: ' ' });
        expect(clickSpy.count).to.be.greaterThan(0);
      });

      it('should dispatch click event on pressing Enter with href', async () => {
        element.setAttribute('href', '#');
        await waitForLitRender(element);

        const clickSpy = new EventSpy('click');
        element.focus();
        await sendKeys({ press: 'Enter' });
        expect(clickSpy.count).to.be.greaterThan(0);
      });

      it('should not dispatch click event on pressing Space with href', async () => {
        element.setAttribute('href', '#');
        await waitForLitRender(element);

        const clickSpy = new EventSpy('click');
        element.focus();
        await sendKeys({ press: ' ' });
        expect(clickSpy.count).not.to.be.greaterThan(0);
      });

      it('should receive focus', async () => {
        element.focus();
        await waitForLitRender(element);

        expect(document.activeElement.id).to.be.equal('focus-id');
      });
    });
  });
}

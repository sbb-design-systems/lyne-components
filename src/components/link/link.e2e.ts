import { csrFixture, ssrHydratedFixture, cleanupFixtures } from '@lit-labs/testing/fixtures.js';
import { assert, expect } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import { html } from 'lit/static-html.js';

import { EventSpy, waitForCondition, waitForLitRender } from '../core/testing';

import { SbbLink } from './link';

const ssrModules = ['./link.ts'];
for (const fixture of [csrFixture, ssrHydratedFixture]) {
  describe(`sbb-link rendered with ${fixture.name}`, () => {
    let element: SbbLink;

    beforeEach(async () => {
      element = await fixture(html`<sbb-link id="focus-id">Link as Button</sbb-link>`, {
        modules: ssrModules,
      });
    });

    afterEach(() => {
      cleanupFixtures();
    });

    it('renders', async () => {
      assert.instanceOf(element, SbbLink);
    });

    describe('events', () => {
      it('dispatches event on click', async () => {
        const changeSpy = new EventSpy('click');

        await element.click();
        await waitForCondition(() => changeSpy.events.length === 1);
        expect(changeSpy.count).to.be.equal(1);
      });

      it('should not dispatch event on click if disabled', async () => {
        element.setAttribute('disabled', 'true');

        await waitForLitRender(element);

        const changeSpy = new EventSpy('click');

        await element.click();
        expect(changeSpy.count).not.to.be.greaterThan(0);
      });

      it('should dispatch event on click if static', async () => {
        element.setAttribute('is-static', 'true');

        await waitForLitRender(element);

        const changeSpy = new EventSpy('click');

        await element.click();
        expect(changeSpy.count).to.be.greaterThan(0);
      });

      it('should stop propagating host click if disabled', async () => {
        element.disabled = true;

        const clickSpy = new EventSpy('click');

        element.dispatchEvent(new CustomEvent('click'));
        await waitForLitRender(element);

        expect(clickSpy.count).not.to.be.greaterThan(0);
      });

      it('should dispatch click event on pressing Enter', async () => {
        const changeSpy = new EventSpy('click');
        element.focus();
        await sendKeys({ press: 'Enter' });
        expect(changeSpy.count).to.be.greaterThan(0);
      });

      it('should dispatch click event on pressing Space', async () => {
        const changeSpy = new EventSpy('click');
        element.focus();
        await sendKeys({ press: ' ' });
        expect(changeSpy.count).to.be.greaterThan(0);
      });

      it('should dispatch click event on pressing Enter with href', async () => {
        element.setAttribute('href', '#');
        await waitForLitRender(element);

        const changeSpy = new EventSpy('click');
        element.focus();
        await sendKeys({ press: 'Enter' });
        expect(changeSpy.count).to.be.greaterThan(0);
      });

      it('should not dispatch click event on pressing Space with href', async () => {
        element.setAttribute('href', '#');
        await waitForLitRender(element);

        const changeSpy = new EventSpy('click');
        element.focus();
        await sendKeys({ press: ' ' });
        expect(changeSpy.count).not.to.be.greaterThan(0);
      });

      it('should receive focus', async () => {
        await element.focus();
        await waitForLitRender(element);

        expect(document.activeElement.id).to.be.equal('focus-id');
      });
    });
  });
}

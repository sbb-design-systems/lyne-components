import { csrFixture, ssrHydratedFixture, cleanupFixtures } from '@lit-labs/testing/fixtures.js';
import { assert, expect } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import { html } from 'lit/static-html.js';

import { waitForLitRender, EventSpy } from '../../core/testing';

import { SbbTag } from './tag';

const ssrModules = ['./tag.ts'];
for (const fixture of [csrFixture, ssrHydratedFixture]) {
  describe(`sbb-tag rendered with ${fixture.name}`, () => {
    let element: SbbTag;

    beforeEach(async () => {
      element = await fixture(html`<sbb-tag value="tag">Tag</sbb-tag>`, { modules: ssrModules });
    });

    afterEach(() => {
      cleanupFixtures();
    });

    it('renders', async () => {
      assert.instanceOf(element, SbbTag);
    });

    it('should be checked after click', async () => {
      expect(element).not.to.have.attribute('checked');
      const changeSpy = new EventSpy('change');
      const inputSpy = new EventSpy('input');

      element.click();
      await waitForLitRender(element);

      expect(changeSpy.count).to.be.greaterThan(0);
      expect(inputSpy.count).to.be.greaterThan(0);
      expect(element).to.have.attribute('checked');
    });

    it('should not be checked after click when disabled', async () => {
      expect(element).not.to.have.attribute('checked');
      element.setAttribute('disabled', '');
      await waitForLitRender(element);

      const changeSpy = new EventSpy('change');
      const inputSpy = new EventSpy('input');

      element.click();
      await waitForLitRender(element);

      expect(changeSpy.count).not.to.be.greaterThan(0);
      expect(inputSpy.count).not.to.be.greaterThan(0);
      expect(element).not.to.have.attribute('checked');
    });

    it('should be checked after "Space" keypress', async () => {
      expect(element).not.to.have.attribute('checked');
      const changeSpy = new EventSpy('change');
      const inputSpy = new EventSpy('input');

      element.focus();
      await sendKeys({ press: 'Space' });

      await waitForLitRender(element);
      expect(changeSpy.count).to.be.greaterThan(0);
      expect(inputSpy.count).to.be.greaterThan(0);
      expect(element).to.have.attribute('checked');
    });

    it('should be unchecked after "Space" keypress', async () => {
      element = await fixture(html`<sbb-tag value="tag" checked>Tag</sbb-tag>`, {
        modules: ssrModules,
      });

      const changeSpy = new EventSpy('change');
      const inputSpy = new EventSpy('input');

      element.focus();
      await sendKeys({ press: 'Space' });

      await waitForLitRender(element);
      expect(changeSpy.count).to.be.greaterThan(0);
      expect(inputSpy.count).to.be.greaterThan(0);
      expect(element).not.to.have.attribute('checked');
    });
  });
}

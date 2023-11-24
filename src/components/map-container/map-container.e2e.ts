import { csrFixture, ssrHydratedFixture, cleanupFixtures } from '@lit-labs/testing/fixtures.js';
import { assert, expect } from '@open-wc/testing';
import { setViewport } from '@web/test-runner-commands';
import { html } from 'lit/static-html.js';

import { waitForCondition } from '../core/testing';

import { SbbMapContainer } from './map-container';
import '.';

const ssrModules = ['./map-container.ts'];
for (const fixture of [csrFixture, ssrHydratedFixture]) {
  describe(`sbb-map-container rendered with ${fixture.name}`, () => {
    let element: SbbMapContainer;

    afterEach(() => {
      cleanupFixtures();
    });

    it('should react to scrolling', async () => {
      await setViewport({ width: 320, height: 600 });

      await fixture(
        html` <sbb-map-container>
          <div>
            <sbb-title level="4">Operations & Disruptions</sbb-title>
            ${[...Array(10).keys()].map(
              (value) =>
                html` <div>
                  <p>Situation ${value}</p>
                </div>`,
            )}
          </div>
          <div slot="map">
            <div style="height: 1200px">map</div>
          </div>
        </sbb-map-container>`,
        { modules: ssrModules },
      );
      element = document.querySelector('sbb-map-container');
      assert.instanceOf(element, SbbMapContainer);

      function getInert(): boolean {
        return element.shadowRoot.querySelector('sbb-button').hasAttribute('inert');
      }

      expect(element).not.to.have.attribute('data-scroll-up-button-visible');
      expect(getInert()).to.be.equal(true);

      // Scroll down
      window.scrollTo(0, 400);
      await waitForCondition(async () => !getInert());

      expect(element).to.have.attribute('data-scroll-up-button-visible');
      expect(getInert()).to.be.equal(false);
    });
  });
}

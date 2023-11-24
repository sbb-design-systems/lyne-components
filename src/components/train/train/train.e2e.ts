import { csrFixture, ssrHydratedFixture, cleanupFixtures } from '@lit-labs/testing/fixtures.js';
import { assert, expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { EventSpy, waitForLitRender } from '../../core/testing';

import { SbbTrain } from './train';
import '../../icon';

const ssrModules = ['./train.ts'];
for (const fixture of [csrFixture, ssrHydratedFixture]) {
  describe(`sbb-train rendered with ${fixture.name}`, () => {
    let element: SbbTrain;

    afterEach(() => {
      cleanupFixtures();
    });

    it('should render', async () => {
      element = await fixture(html`<sbb-train></sbb-train>`, { modules: ssrModules });
      assert.instanceOf(element, SbbTrain);
    });

    it('should emit trainSlotChange', async () => {
      element = await fixture(
        html`
          <sbb-train>
            <sbb-train-wagon></sbb-train-wagon>
            <sbb-train-wagon></sbb-train-wagon>
            <sbb-train-wagon></sbb-train-wagon>
          </sbb-train>
        `,
        { modules: ssrModules },
      );
      const trainSlotChangeSpy = new EventSpy(SbbTrain.events.trainSlotChange);

      element.querySelector('sbb-train-wagon').remove();
      await waitForLitRender(element);

      expect(trainSlotChangeSpy.count).to.be.equal(1);
    });
  });
}

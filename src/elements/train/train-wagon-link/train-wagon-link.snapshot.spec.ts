import { expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { fixture, testA11yTreeSnapshot } from '../../core/testing/private.ts';

import type { SbbTrainWagonLinkElement } from './train-wagon-link.component.ts';

import '../../train.ts';

describe(`sbb-train-wagon-link`, () => {
  let element: SbbTrainWagonLinkElement;

  describe('should render', async () => {
    beforeEach(async () => {
      element = await fixture(
        html`<sbb-train-wagon-link
          href="#"
          occupancy="none"
          wagon-class="1"
          wagon-type="wagon"
          label="38"
          blocked-passage="previous"
        ></sbb-train-wagon-link>`,
      );
    });

    it('DOM', async () => {
      await expect(element).dom.to.be.equalSnapshot();
    });

    it('Shadow DOM', async () => {
      await expect(element).shadowDom.to.be.equalSnapshot();
    });

    testA11yTreeSnapshot();
  });
});

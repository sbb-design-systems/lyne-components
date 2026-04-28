import { expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { fixture, testA11yTreeSnapshot } from '../../core/testing/private.ts';

import type { SbbTrainWagonButtonElement } from './train-wagon-button.component.ts';

import '../../train.ts';

describe(`sbb-train-wagon-button`, () => {
  let element: SbbTrainWagonButtonElement;

  describe('should render', async () => {
    beforeEach(async () => {
      element = await fixture(
        html`<sbb-train-wagon-button
          occupancy="none"
          wagon-class="1"
          wagon-type="wagon"
          label="38"
          blocked-passage="previous"
        ></sbb-train-wagon-button>`,
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

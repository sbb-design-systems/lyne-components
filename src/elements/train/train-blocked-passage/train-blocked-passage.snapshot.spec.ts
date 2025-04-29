import { expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { fixture } from '../../core/testing/private.js';

import type { SbbTrainBlockedPassageElement } from './train-blocked-passage.component.js';

import './train-blocked-passage.component.js';

describe(`sbb-train-blocked-passage`, () => {
  let element: SbbTrainBlockedPassageElement;

  describe('renders', () => {
    beforeEach(async () => {
      element = await fixture(html`<sbb-train-blocked-passage></sbb-train-blocked-passage>`);
    });

    it('DOM', async () => {
      await expect(element).dom.to.be.equalSnapshot();
    });

    it('Shadow DOM', async () => {
      await expect(element).shadowDom.to.be.equalSnapshot();
    });
  });
});

import { expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { fixture, testA11yTreeSnapshot } from '../../core/testing/private.ts';

import type { SbbToggleSlideActivationLabelElement } from './toggle-slide-activation-label.component.ts';

import '../../toggle-slide.ts';

describe(`sbb-toggle-slide-activation-label`, () => {
  describe('renders', () => {
    let element: SbbToggleSlideActivationLabelElement;

    beforeEach(async () => {
      element = await fixture(
        html`<sbb-toggle-slide-activation-label>Label</sbb-toggle-slide-activation-label>`,
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

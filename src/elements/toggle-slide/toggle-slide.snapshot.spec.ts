import { expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { fixture, testA11yTreeSnapshot } from '../core/testing/private.ts';

import type { SbbToggleSlideElement } from './toggle-slide.component.ts';

import '../toggle-slide.ts';

describe(`sbb-toggle-slide`, () => {
  describe('renders', async () => {
    let element: SbbToggleSlideElement;

    beforeEach(async () => {
      element = await fixture(
        html`<sbb-toggle-slide checked disabled>
          <sbb-toggle-slide-unchecked-label>Pull right to start</sbb-toggle-slide-unchecked-label>
          <sbb-toggle-slide-unchecked-label>Pull left to stop</sbb-toggle-slide-unchecked-label>
        </sbb-toggle-slide>`,
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

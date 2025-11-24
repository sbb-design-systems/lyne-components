import { expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { fixture, testA11yTreeSnapshot } from '../../core/testing/private.ts';

import type { SbbHeaderButtonElement } from './header-button.component.ts';
import './header-button.component.ts';

describe(`sbb-header-button`, () => {
  describe('renders', () => {
    let element: SbbHeaderButtonElement;

    beforeEach(async () => {
      element = await fixture(html`
        <sbb-header-button
          icon-name="pie-small"
          name="test"
          type="reset"
          value="value"
          expand-from="zero"
          aria-label="a11y label"
        >
          Action
        </sbb-header-button>
      `);
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

import { expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { fixture, testA11yTreeSnapshot } from '../../core/testing/private.ts';

import type { SbbToggleElement } from './toggle.component.ts';

import './toggle.component.ts';
import '../toggle-option.ts';

describe(`sbb-toggle`, () => {
  let element: SbbToggleElement;

  describe('renders', () => {
    beforeEach(async () => {
      element = await fixture(
        html`<sbb-toggle>
          <sbb-toggle-option value="Value one">Value one</sbb-toggle-option>
          <sbb-toggle-option value="Value two">Value two</sbb-toggle-option>
        </sbb-toggle>`,
      );
    });

    it('DOM', async () => {
      await expect(element).dom.to.be.equalSnapshot({ ignoreAttributes: ['style'] });
    });

    it('Shadow DOM', async () => {
      await expect(element).shadowDom.to.be.equalSnapshot();
    });

    testA11yTreeSnapshot();
  });
});

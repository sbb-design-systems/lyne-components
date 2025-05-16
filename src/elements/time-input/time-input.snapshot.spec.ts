import { expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { fixture, testA11yTreeSnapshot } from '../core/testing/private.js';

import type { SbbTimeInputElement } from './time-input.component.js';

import './time-input.component.js';

describe(`sbb-time-input`, () => {
  describe('renders', () => {
    let root: SbbTimeInputElement;

    beforeEach(async () => {
      root = await fixture(html` <sbb-time-input value="13:30"></sbb-time-input> `);
    });

    it('DOM', async () => {
      await expect(root).dom.to.be.equalSnapshot();
    });

    it('Shadow DOM', async () => {
      await expect(root).shadowDom.to.be.equalSnapshot();
    });

    testA11yTreeSnapshot();
  });
});

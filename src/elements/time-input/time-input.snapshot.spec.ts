import { expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { fixture, testA11yTreeSnapshot } from '../core/testing/private.js';

import type { SbbTimeInputElement } from './time-input.js';
import './time-input.js';

describe(`sbb-time-input`, () => {
  describe('renders', () => {
    let element: SbbTimeInputElement;

    beforeEach(async () => {
      element = await fixture(html`
        <span>
          <sbb-time-input input="id-1"></sbb-time-input>
          <input id="id-1" />
        </span>
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

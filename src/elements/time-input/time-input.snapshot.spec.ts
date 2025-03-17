import { expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { fixture, testA11yTreeSnapshot } from '../core/testing/private.js';

import type { SbbTimeInputElement } from './time-input.component.js';
import './time-input.component.js';

describe(`sbb-time-input`, () => {
  describe('renders', () => {
    let root: HTMLElement;
    let element: SbbTimeInputElement;

    beforeEach(async () => {
      root = await fixture(html`
        <span>
          <sbb-time-input input="id-1"></sbb-time-input>
          <input id="id-1" />
        </span>
      `);
      element = document.querySelector('sbb-time-input')!;
    });

    it('DOM', async () => {
      await expect(root).dom.to.be.equalSnapshot();
    });

    it('Shadow DOM', async () => {
      await expect(element).shadowDom.to.be.equalSnapshot();
    });

    testA11yTreeSnapshot();
  });
});

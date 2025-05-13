import { expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { fixture, testA11yTreeSnapshot } from '../core/testing/private.js';

import type { SbbToastElement } from './toast.component.js';

import './toast.component.js';

describe(`sbb-toast`, () => {
  describe('renders', () => {
    let elem: SbbToastElement;

    beforeEach(async () => {
      elem = await fixture(html`
        <sbb-toast icon-name="circle-tick-small" dismissible> 'Lorem ipsum dolor' </sbb-toast>
      `);
    });

    it('DOM', async () => {
      await expect(elem).dom.to.be.equalSnapshot();
    });

    it('Shadow DOM', async () => {
      await expect(elem).shadowDom.to.be.equalSnapshot();
    });

    testA11yTreeSnapshot();
  });
});

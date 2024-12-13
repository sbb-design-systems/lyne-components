import { expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { fixture, testA11yTreeSnapshot } from '../../core/testing/private.js';

import type { SbbChipGroupElement } from './chip-group.js';
import './chip-group.js';

describe(`sbb-chip-group`, () => {
  describe('renders', () => {
    let element: SbbChipGroupElement;

    beforeEach(async () => {
      element = await fixture(html`<sbb-chip-group></sbb-chip-group>`);
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

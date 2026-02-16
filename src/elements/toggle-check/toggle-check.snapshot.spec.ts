import { expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { fixture, testA11yTreeSnapshot } from '../core/testing/private.ts';

import type { SbbToggleCheckElement } from './toggle-check.component.ts';

import './toggle-check.component.ts';

describe(`sbb-toggle-check`, () => {
  describe('renders', async () => {
    let element: SbbToggleCheckElement;

    beforeEach(async () => {
      element = await fixture(html`<sbb-toggle-check checked></sbb-toggle-check>`);
    });

    it('DOM', async () => {
      await expect(element).dom.to.be.equalSnapshot();
    });

    it('Shadow DOM', async () => {
      await expect(element).shadowDom.to.be.equalSnapshot();
    });
  });

  testA11yTreeSnapshot(html`<sbb-toggle-check></sbb-toggle-check>`);
});

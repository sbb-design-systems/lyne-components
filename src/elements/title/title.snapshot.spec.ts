import { expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { fixture, testA11yTreeSnapshot } from '../core/testing/private.ts';

import type { SbbTitleElement } from './title.component.ts';

import './title.component.ts';

describe(`sbb-title`, () => {
  describe('renders', async () => {
    let element: SbbTitleElement;

    beforeEach(async () => {
      element = await fixture(
        html`<sbb-title level="1" visual-level="2">Sample Title Text</sbb-title>`,
      );
    });

    it('DOM', async () => {
      await expect(element).dom.to.be.equalSnapshot();
    });

    it('Shadow DOM', async () => {
      await expect(element).shadowDom.to.be.equalSnapshot();
    });
  });

  testA11yTreeSnapshot(html`<sbb-title level="1" visual-level="2">Sample Title Text</sbb-title>`);
});

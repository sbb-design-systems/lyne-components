import { expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { fixture, testA11yTreeSnapshot } from '../../core/testing/private.ts';

import type { SbbOptionHintElement } from './option-hint.component.ts';
import './option-hint.component.ts';

describe(`sbb-option-hint`, () => {
  describe('renders', () => {
    let element: SbbOptionHintElement;

    beforeEach(async () => {
      element = await fixture(html`<sbb-option-hint>Hint</sbb-option-hint>`);
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

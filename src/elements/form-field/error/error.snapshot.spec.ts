import { expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { fixture, testA11yTreeSnapshot } from '../../core/testing/private.ts';

import type { SbbErrorElement } from './error.component.ts';

import './error.component.ts';

describe(`sbb-error`, () => {
  let element: SbbErrorElement;

  describe('renders', async () => {
    beforeEach(async () => {
      element = await fixture(html`<sbb-error>Required</sbb-error>`);
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

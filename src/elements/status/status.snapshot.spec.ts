import { expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { fixture, testA11yTreeSnapshot } from '../core/testing/private.ts';

import type { SbbStatusElement } from './status.component.ts';

import '../title.ts';
import './status.component.ts';

describe(`sbb-status`, () => {
  let element: SbbStatusElement;

  describe('renders', () => {
    beforeEach(async () => {
      element = await fixture(html`<sbb-status type="info">Status info text</sbb-status>`);
    });

    it('DOM', async () => {
      await expect(element).dom.to.be.equalSnapshot();
    });

    it('Shadow DOM', async () => {
      await expect(element).shadowDom.to.be.equalSnapshot();
    });

    testA11yTreeSnapshot();
  });

  describe('renders with title', () => {
    beforeEach(async () => {
      element = await fixture(
        html`<sbb-status type="info">
          <sbb-title level="3">Title</sbb-title>
          Status info text
        </sbb-status>`,
      );
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

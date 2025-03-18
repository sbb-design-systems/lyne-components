import { expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { fixture, testA11yTreeSnapshot } from '../../core/testing/private.js';

import type { SbbLinkElement } from './link.js';

import './link.js';

describe(`sbb-link`, () => {
  let element: SbbLinkElement;

  describe('renders', () => {
    beforeEach(async () => {
      element = await fixture(
        html`<sbb-link size="m" href="https://sbb.ch" target="_blank">
          Travelcards &amp; tickets.
        </sbb-link>`,
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

  describe('reflects properties', () => {
    beforeEach(async () => {
      element = await fixture(html`<sbb-link size="m"> Travelcards &amp; tickets. </sbb-link>`);

      element.href = '#';
      element.rel = 'nofollow';
      element.target = '_blank';
      element.download = true;
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

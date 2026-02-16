import { expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { fixture, testA11yTreeSnapshot } from '../../core/testing/private.ts';

import type { SbbLinkStaticElement } from './link-static.component.ts';

import './link-static.component.ts';

describe(`sbb-link-static`, () => {
  let element: SbbLinkStaticElement;

  describe('renders', () => {
    beforeEach(async () => {
      element = await fixture(
        html`<sbb-link-static size="m"> Travelcards &amp; tickets. </sbb-link-static>`,
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

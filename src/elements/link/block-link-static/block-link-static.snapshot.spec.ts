import { expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { fixture, testA11yTreeSnapshot } from '../../core/testing/private.ts';

import type { SbbBlockLinkStaticElement } from './block-link-static.component.ts';
import './block-link-static.component.ts';
import '../../icon.ts';

describe(`sbb-block-link-static`, () => {
  let element: SbbBlockLinkStaticElement;

  describe('renders', () => {
    beforeEach(async () => {
      element = await fixture(
        html` <sbb-block-link-static icon-placement="end" size="m">
          <sbb-icon
            aria-hidden="true"
            name="chevron-small-right-small"
            role="img"
            slot="icon"
          ></sbb-icon>
          Travelcards &amp; tickets.
        </sbb-block-link-static>`,
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

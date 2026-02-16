import { expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { fixture, testA11yTreeSnapshot } from '../../core/testing/private.ts';

import type { SbbLinkListAnchorElement } from './link-list-anchor.component.ts';
import './link-list-anchor.component.ts';
import '../../link/block-link.ts';

describe(`sbb-link-list-anchor`, () => {
  describe('renders', () => {
    let element: SbbLinkListAnchorElement;

    beforeEach(async () => {
      element = await fixture(html`
        <sbb-link-list-anchor title-content="title">
          ${new Array(3)
            .fill('')
            .map(
              (_v, i) => html`
                <sbb-block-link href="https://www.sbb.ch">Link ${i}</sbb-block-link>
              `,
            )}
        </sbb-link-list-anchor>
      `);
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

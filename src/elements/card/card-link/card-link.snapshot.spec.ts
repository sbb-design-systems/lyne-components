import { expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { fixture, testA11yTreeSnapshot } from '../../core/testing/private.js';
import type { SbbCardElement } from '../card.js';

import type { SbbCardLinkElement } from './card-link.component.js';

import '../card.js';
import './card-link.component.js';

describe(`sbb-card-link`, () => {
  let element: SbbCardLinkElement, card: SbbCardElement;

  describe('renders', () => {
    beforeEach(async () => {
      card = await fixture(
        html`<sbb-card>
          <sbb-card-link
            href="https://github.com/sbb-design-systems/lyne-components"
            target="_blank"
            >Follow me</sbb-card-link
          >
          Content text
        </sbb-card>`,
      );
      element = card.querySelector('sbb-card-link')!;
    });

    it('DOM', async () => {
      await expect(card).dom.to.be.equalSnapshot();
    });

    it('Shadow DOM', async () => {
      await expect(element).shadowDom.to.be.equalSnapshot();
    });

    testA11yTreeSnapshot();
  });
});

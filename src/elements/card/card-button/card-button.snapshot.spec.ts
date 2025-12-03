import { expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { fixture, testA11yTreeSnapshot } from '../../core/testing/private.ts';
import type { SbbCardElement } from '../card.ts';

import type { SbbCardButtonElement } from './card-button.component.ts';

import '../card.ts';
import './card-button.component.ts';

describe(`sbb-card-button`, () => {
  let element: SbbCardButtonElement, card: SbbCardElement;

  describe('renders', () => {
    beforeEach(async () => {
      card = await fixture(
        html`<sbb-card><sbb-card-button active>Click me</sbb-card-button>Content</sbb-card>`,
      );
      element = card.querySelector('sbb-card-button')!;
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

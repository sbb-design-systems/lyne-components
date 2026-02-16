import { expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { fixture, testA11yTreeSnapshot } from '../core/testing/private.ts';

import type { SbbJourneyHeaderElement } from './journey-header.component.ts';
import './journey-header.component.ts';

describe(`sbb-journey-header`, () => {
  describe('renders', () => {
    let element: SbbJourneyHeaderElement;

    beforeEach(async () => {
      element = await fixture(html`
        <sbb-journey-header origin="A" destination="B"></sbb-journey-header>
      `);
    });

    it('DOM', async () => {
      await expect(element).dom.to.be.equalSnapshot();
    });

    it('Shadow DOM', async () => {
      await expect(element).shadowDom.to.be.equalSnapshot();
    });
  });

  describe('renders H1 L-sized round-trip negative', () => {
    let element: SbbJourneyHeaderElement;

    beforeEach(async () => {
      element = await fixture(
        html`<sbb-journey-header
          level="1"
          size="l"
          round-trip
          origin="B"
          destination="C"
          negative
        ></sbb-journey-header>`,
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

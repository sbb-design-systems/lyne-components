import { expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { fixture, testA11yTreeSnapshot } from '../../core/testing/private.js';

import type { SbbFlipCardSummaryElement } from './flip-card-summary.js';

import './flip-card-summary.js';
import '../../title.js';
import '../../image.js';

const imageUrl = import.meta.resolve('../../core/testing/assets/placeholder-image.png');

describe(`sbb-flip-card-summary`, () => {
  let element: SbbFlipCardSummaryElement;

  beforeEach(async () => {
    element = await fixture(
      html`<sbb-flip-card-summary image-alignment="below">
        <sbb-title level="4">Summary</sbb-title>
        <sbb-image slot="image" image-src=${imageUrl}></sbb-image>
      </sbb-flip-card-summary>`,
    );
  });

  it('DOM', async () => {
    await expect(element).dom.to.be.equalSnapshot({ ignoreAttributes: ['image-src'] });
  });

  it('Shadow DOM', async () => {
    await expect(element).shadowDom.to.be.equalSnapshot();
  });

  testA11yTreeSnapshot();
});

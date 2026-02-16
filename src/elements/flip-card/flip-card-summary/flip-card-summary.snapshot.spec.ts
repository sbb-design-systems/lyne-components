import { expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { fixture, testA11yTreeSnapshot } from '../../core/testing/private.ts';

import type { SbbFlipCardSummaryElement } from './flip-card-summary.component.ts';

import './flip-card-summary.component.ts';
import '../../title.ts';
import '../../image.ts';

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

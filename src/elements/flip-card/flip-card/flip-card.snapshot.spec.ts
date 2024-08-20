import { expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { fixture, testA11yTreeSnapshot } from '../../core/testing/private.js';

import type { SbbFlipCardElement } from './flip-card.js';

import './flip-card.js';
import '../flip-card-details.js';
import '../flip-card-summary.js';
import '../../title.js';
import '../../image.js';
import '../../link.js';

const imageUrl = import.meta.resolve('../../core/testing/assets/placeholder-image.png');

describe(`sbb-flip-card`, () => {
  let element: SbbFlipCardElement;

  beforeEach(async () => {
    element = await fixture(html`
      <sbb-flip-card>
        <sbb-flip-card-summary>
          <sbb-title level="4">Summary</sbb-title>
          <sbb-image slot="image" image-src=${imageUrl}></sbb-image>
        </sbb-flip-card-summary>
        <sbb-flip-card-details>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam luctus ornare condimentum.
          Vivamus turpis elit, dapibus eget fringilla pellentesque, lobortis in nibh. Duis dapibus
          vitae tortor ullamcorper maximus. In convallis consectetur felis.
          <sbb-link href="https://www.sbb.ch" negative>Link</sbb-link>
        </sbb-flip-card-details>
      </sbb-flip-card>
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

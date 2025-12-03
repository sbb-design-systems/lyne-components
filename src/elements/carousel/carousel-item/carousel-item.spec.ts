import { assert } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { fixture } from '../../core/testing/private.ts';

import { SbbCarouselItemElement } from './carousel-item.component.ts';

const imageUrl = import.meta.resolve('../../core/testing/assets/placeholder-image.png');

describe('sbb-carousel-item', () => {
  let element: SbbCarouselItemElement;

  beforeEach(async () => {
    element = await fixture(html`
      <sbb-carousel-item>
        <img src=${imageUrl} alt="SBB image" />
      </sbb-carousel-item>
    `);
  });

  it('renders', async () => {
    assert.instanceOf(element, SbbCarouselItemElement);
  });
});

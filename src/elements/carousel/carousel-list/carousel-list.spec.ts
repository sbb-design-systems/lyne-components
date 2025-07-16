import { assert } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { fixture } from '../../core/testing/private.js';

import { SbbCarouselListElement } from './carousel-list.component.js';

describe('sbb-carousel-list', () => {
  let element: SbbCarouselListElement;

  beforeEach(async () => {
    element = await fixture(html`<sbb-carousel-list></sbb-carousel-list>`);
  });

  it('renders', async () => {
    assert.instanceOf(element, SbbCarouselListElement);
  });
});

import { assert } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { fixture } from '../../core/testing/private.js';

import { SbbCarouselElement } from './carousel.component.js';

describe('sbb-carousel', () => {
  let element: SbbCarouselElement;

  beforeEach(async () => {
    element = await fixture(html`<sbb-carousel></sbb-carousel>`);
  });

  it('renders', async () => {
    assert.instanceOf(element, SbbCarouselElement);
  });
});

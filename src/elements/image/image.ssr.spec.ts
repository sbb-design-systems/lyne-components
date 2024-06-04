import { assert } from '@open-wc/testing';
import { html } from 'lit';

import { fixture } from '../core/testing/private.js';

import { SbbImageElement } from './image.js';

const imageUrl = import.meta.resolve('../clock/assets/sbb_clock_face.svg');

describe(`sbb-image ${fixture.name}`, () => {
  let element: SbbImageElement;

  beforeEach(async () => {
    element = await fixture(html`<sbb-image image-src=${imageUrl}></sbb-image>`, {
      modules: ['./image.js'],
    });
  });

  it('renders', () => {
    assert.instanceOf(element, SbbImageElement);
  });
});

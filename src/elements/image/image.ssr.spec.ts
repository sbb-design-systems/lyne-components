import { assert } from '@open-wc/testing';
import { html } from 'lit';

import { fixture } from '../core/testing/private.js';

import { SbbImageElement } from './image.js';

describe(`sbb-image ${fixture.name}`, () => {
  let root: SbbImageElement;

  beforeEach(async () => {
    const url = `${location.protocol}//${location.host}/src/elements/clock/assets/sbb_clock_face.svg`;
    root = await fixture(html`<sbb-image image-src=${url}></sbb-image>`, {
      modules: ['./image.js'],
    });
  });

  it('renders', () => {
    assert.instanceOf(root, SbbImageElement);
  });
});

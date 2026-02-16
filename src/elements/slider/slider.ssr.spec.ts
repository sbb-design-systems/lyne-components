import { assert } from '@open-wc/testing';
import { html } from 'lit';

import { ssrHydratedFixture } from '../core/testing/private.ts';

import { SbbSliderElement } from './slider.component.ts';

describe(`sbb-slider ssr`, () => {
  let root: SbbSliderElement;

  beforeEach(async () => {
    root = await ssrHydratedFixture(
      html`
        <sbb-slider
          start-icon="walk-slow-small"
          end-icon="walk-fast-small"
          max="500"
          min="100"
          value="400"
        ></sbb-slider>
      `,
      { modules: ['./slider.component.js'] },
    );
  });

  it('renders', () => {
    assert.instanceOf(root, SbbSliderElement);
  });
});

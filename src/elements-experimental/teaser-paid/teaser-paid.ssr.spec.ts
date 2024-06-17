import { assert } from '@open-wc/testing';
import { fixture } from '@sbb-esta/lyne-elements/core/testing/private.js';
import { html } from 'lit';

import { SbbTeaserPaidElement } from './teaser-paid.js';

import '@sbb-esta/lyne-elements/chip.js';
import '@sbb-esta/lyne-elements/image.js';

describe(`sbb-teaser-paid ${fixture.name}`, () => {
  let root: SbbTeaserPaidElement;

  beforeEach(async () => {
    root = await fixture(
      html`
        <sbb-teaser-paid>
          <sbb-chip slot="chip">Label</sbb-chip>
          <sbb-image slot="image"></sbb-image>
        </sbb-teaser-paid>
      `,
      {
        modules: ['./teaser-paid.js', '../../elements/chip.js', '../../elements/image.js'],
      },
    );
  });

  it('renders', () => {
    assert.instanceOf(root, SbbTeaserPaidElement);
  });
});

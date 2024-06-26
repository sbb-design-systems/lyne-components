import { assert } from '@open-wc/testing';
import { html } from 'lit';

import { ssrHydratedFixture } from '../../core/testing/private.js';

import { SbbTertiaryButtonStaticElement } from './tertiary-button-static.js';

describe(`sbb-tertiary-button-static ssr`, () => {
  let root: SbbTertiaryButtonStaticElement;

  beforeEach(async () => {
    root = await ssrHydratedFixture(
      html`<sbb-tertiary-button-static>Button</sbb-tertiary-button-static>`,
      {
        modules: ['./tertiary-button-static.js'],
      },
    );
  });

  it('renders', () => {
    assert.instanceOf(root, SbbTertiaryButtonStaticElement);
  });
});

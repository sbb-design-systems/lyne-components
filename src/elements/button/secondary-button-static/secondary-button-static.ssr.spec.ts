import { assert } from '@open-wc/testing';
import { html } from 'lit';

import { ssrHydratedFixture } from '../../core/testing/private.ts';

import { SbbSecondaryButtonStaticElement } from './secondary-button-static.component.ts';

describe(`sbb-secondary-button-static ssr`, () => {
  let root: SbbSecondaryButtonStaticElement;

  beforeEach(async () => {
    root = await ssrHydratedFixture(
      html`<sbb-secondary-button-static>Button</sbb-secondary-button-static>`,
      {
        modules: ['./secondary-button-static.component.js'],
      },
    );
  });

  it('renders', () => {
    assert.instanceOf(root, SbbSecondaryButtonStaticElement);
  });
});

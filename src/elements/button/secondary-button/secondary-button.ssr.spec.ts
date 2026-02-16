import { assert } from '@open-wc/testing';
import { html } from 'lit';

import { ssrHydratedFixture } from '../../core/testing/private.ts';

import { SbbSecondaryButtonElement } from './secondary-button.component.ts';

describe(`sbb-secondary-button ssr`, () => {
  let root: SbbSecondaryButtonElement;

  beforeEach(async () => {
    root = await ssrHydratedFixture(html`<sbb-secondary-button>Button</sbb-secondary-button>`, {
      modules: ['./secondary-button.component.js'],
    });
  });

  it('renders', () => {
    assert.instanceOf(root, SbbSecondaryButtonElement);
  });
});

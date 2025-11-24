import { assert } from '@open-wc/testing';
import { html } from 'lit';

import { ssrHydratedFixture } from '../../core/testing/private.ts';

import { SbbAccentButtonElement } from './accent-button.component.ts';

describe(`sbb-accent-button ssr`, () => {
  let root: SbbAccentButtonElement;

  beforeEach(async () => {
    root = await ssrHydratedFixture(html`<sbb-accent-button>Button</sbb-accent-button>`, {
      modules: ['./accent-button.component.js'],
    });
  });

  it('renders', () => {
    assert.instanceOf(root, SbbAccentButtonElement);
  });
});

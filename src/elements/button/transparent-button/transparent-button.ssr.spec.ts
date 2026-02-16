import { assert } from '@open-wc/testing';
import { html } from 'lit';

import { ssrHydratedFixture } from '../../core/testing/private.ts';

import { SbbTransparentButtonElement } from './transparent-button.component.ts';

describe(`sbb-transparent-button ssr`, () => {
  let root: SbbTransparentButtonElement;

  beforeEach(async () => {
    root = await ssrHydratedFixture(html`<sbb-transparent-button>Button</sbb-transparent-button>`, {
      modules: ['./transparent-button.component.js'],
    });
  });

  it('renders', () => {
    assert.instanceOf(root, SbbTransparentButtonElement);
  });
});

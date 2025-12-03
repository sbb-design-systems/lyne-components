import { assert } from '@open-wc/testing';
import { html } from 'lit';

import { ssrHydratedFixture } from '../../core/testing/private.ts';

import { SbbButtonElement } from './button.component.ts';

describe(`sbb-button ssr`, () => {
  let root: SbbButtonElement;

  beforeEach(async () => {
    root = await ssrHydratedFixture(html`<sbb-button>I am a button</sbb-button>`, {
      modules: ['./button.component.js'],
    });
  });

  it('renders', () => {
    assert.instanceOf(root, SbbButtonElement);
  });
});

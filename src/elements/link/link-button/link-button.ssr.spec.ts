import { assert } from '@open-wc/testing';
import { html } from 'lit';

import { ssrHydratedFixture } from '../../core/testing/private.js';

import { SbbLinkButtonElement } from './link-button.component.js';

describe(`sbb-link-button ssr`, () => {
  let root: SbbLinkButtonElement;

  beforeEach(async () => {
    root = await ssrHydratedFixture(
      html`<sbb-link-button id="focus-id">Link as Button</sbb-link-button>`,
      {
        modules: ['./link-button.component.js'],
      },
    );
  });

  it('renders', () => {
    assert.instanceOf(root, SbbLinkButtonElement);
  });
});

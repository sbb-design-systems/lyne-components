import { assert } from '@open-wc/testing';
import { html } from 'lit';

import { ssrHydratedFixture } from '../../core/testing/private.ts';

import { SbbAccentButtonLinkElement } from './accent-button-link.component.ts';

describe(`sbb-accent-button-link ssr`, () => {
  let root: SbbAccentButtonLinkElement;

  beforeEach(async () => {
    root = await ssrHydratedFixture(html`<sbb-accent-button-link>Button</sbb-accent-button-link>`, {
      modules: ['./accent-button-link.component.js'],
    });
  });

  it('renders', () => {
    assert.instanceOf(root, SbbAccentButtonLinkElement);
  });
});

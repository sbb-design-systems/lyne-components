import { assert } from '@open-wc/testing';
import { html } from 'lit';

import { ssrHydratedFixture } from '../../core/testing/private.js';

import { SbbButtonLinkElement } from './button-link.component.js';

describe(`sbb-button-link ssr`, () => {
  let root: SbbButtonLinkElement;

  beforeEach(async () => {
    root = await ssrHydratedFixture(html`<sbb-button-link href="#">I am a link</sbb-button-link>`, {
      modules: ['./button-link.component.js'],
    });
  });

  it('renders', () => {
    assert.instanceOf(root, SbbButtonLinkElement);
  });
});

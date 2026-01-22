import { assert } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { ssrHydratedFixture } from '../../core/testing/private.ts';

import { SbbMiniButtonLinkElement } from './mini-button-link.component.ts';

describe(`sbb-mini-button-link ssr`, () => {
  let root: SbbMiniButtonLinkElement;

  beforeEach(async () => {
    root = await ssrHydratedFixture(
      html`<sbb-mini-button-link icon-name="pen-small" href="#"></sbb-mini-button-link>`,
      {
        modules: ['../mini-button-link.js'],
      },
    );
  });

  it('renders', () => {
    assert.instanceOf(root, SbbMiniButtonLinkElement);
  });
});

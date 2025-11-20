import { assert } from '@open-wc/testing';
import { html } from 'lit';

import { ssrHydratedFixture } from '../../core/testing/private.ts';

import { SbbSecondaryButtonLinkElement } from './secondary-button-link.component.ts';

describe(`sbb-secondary-button-link ssr`, () => {
  let root: SbbSecondaryButtonLinkElement;

  beforeEach(async () => {
    root = await ssrHydratedFixture(
      html`<sbb-secondary-button-link>Button</sbb-secondary-button-link>`,
      {
        modules: ['./secondary-button-link.component.js'],
      },
    );
  });

  it('renders', () => {
    assert.instanceOf(root, SbbSecondaryButtonLinkElement);
  });
});

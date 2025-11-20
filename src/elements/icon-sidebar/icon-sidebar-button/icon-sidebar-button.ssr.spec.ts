import { assert } from '@open-wc/testing';
import { html } from 'lit';

import { ssrHydratedFixture } from '../../core/testing/private.ts';

import { SbbIconSidebarButtonElement } from './icon-sidebar-button.component.ts';

describe(`sbb-icon-sidebar-button ssr`, () => {
  let root: SbbIconSidebarButtonElement;

  beforeEach(async () => {
    root = await ssrHydratedFixture(
      html`<sbb-icon-sidebar-button
        icon-name="glass-cocktail-small"
        aria-label="Go to the party"
      ></sbb-icon-sidebar-button>`,
      {
        modules: ['./icon-sidebar-button.component.js'],
      },
    );
  });

  it('renders', () => {
    assert.instanceOf(root, SbbIconSidebarButtonElement);
  });
});

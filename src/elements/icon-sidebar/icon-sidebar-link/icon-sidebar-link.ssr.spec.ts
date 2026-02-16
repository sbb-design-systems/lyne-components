import { assert } from '@open-wc/testing';
import { html } from 'lit';

import { ssrHydratedFixture } from '../../core/testing/private.ts';

import { SbbIconSidebarLinkElement } from './icon-sidebar-link.component.ts';

describe(`sbb-icon-sidebar-link ssr`, () => {
  let root: SbbIconSidebarLinkElement;

  beforeEach(async () => {
    root = await ssrHydratedFixture(
      html`<sbb-icon-sidebar-link
        icon-name="glass-cocktail-small"
        href="#"
        accessibility-label="Go to the party"
      ></sbb-icon-sidebar-link>`,
      {
        modules: ['./icon-sidebar-link.component.js'],
      },
    );
  });

  it('renders', () => {
    assert.instanceOf(root, SbbIconSidebarLinkElement);
  });
});

import { assert } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { ssrHydratedFixture } from '../../core/testing/private.ts';

import { SbbIconSidebarElement } from './icon-sidebar.component.ts';

describe(`sbb-icon-sidebar ssr`, () => {
  let root: SbbIconSidebarElement;

  beforeEach(async () => {
    root = await ssrHydratedFixture(html`<sbb-icon-sidebar></sbb-icon-sidebar>`, {
      modules: ['./icon-sidebar.component.js'],
    });
  });

  it('renders', () => {
    assert.instanceOf(root, SbbIconSidebarElement);
  });
});

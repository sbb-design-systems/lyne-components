import { assert } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { ssrHydratedFixture } from '../../core/testing/private.ts';

import { SbbIconSidebarContentElement } from './icon-sidebar-content.component.ts';

describe(`sbb-icon-sidebar-content ssr`, () => {
  let root: SbbIconSidebarContentElement;

  beforeEach(async () => {
    root = await ssrHydratedFixture(html`<sbb-icon-sidebar-content></sbb-icon-sidebar-content>`, {
      modules: ['./icon-sidebar-content.component.js'],
    });
  });

  it('renders', () => {
    assert.instanceOf(root, SbbIconSidebarContentElement);
  });
});

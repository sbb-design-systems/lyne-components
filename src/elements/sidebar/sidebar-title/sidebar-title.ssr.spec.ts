import { assert } from '@open-wc/testing';
import { html } from 'lit';

import { ssrHydratedFixture } from '../../core/testing/private.js';

import { SbbSidebarTitleElement } from './sidebar-title.component.js';

describe(`sbb-sidebar-title ssr`, () => {
  let root: SbbSidebarTitleElement;

  beforeEach(async () => {
    root = await ssrHydratedFixture(html`<sbb-sidebar-title>Title</sbb-sidebar-title>`, {
      modules: ['./sidebar-title.component.js'],
    });
  });

  it('renders', () => {
    assert.instanceOf(root, SbbSidebarTitleElement);
  });
});

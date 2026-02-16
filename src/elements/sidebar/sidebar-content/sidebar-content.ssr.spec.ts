import { assert } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { ssrHydratedFixture } from '../../core/testing/private.ts';

import { SbbSidebarContentElement } from './sidebar-content.component.ts';

describe(`sbb-sidebar-content ssr`, () => {
  let root: SbbSidebarContentElement;

  beforeEach(async () => {
    root = await ssrHydratedFixture(html`<sbb-sidebar-content>Some Content</sbb-sidebar-content>`, {
      modules: ['./sidebar-content.component.js'],
    });
  });

  it('renders', () => {
    assert.instanceOf(root, SbbSidebarContentElement);
  });
});

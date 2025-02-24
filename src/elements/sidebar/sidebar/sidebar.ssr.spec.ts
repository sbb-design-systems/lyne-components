import { assert } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { ssrHydratedFixture } from '../../core/testing/private.js';

import { SbbSidebarElement } from './sidebar.js';

describe(`sbb-sidebar ssr`, () => {
  let root: SbbSidebarElement;

  beforeEach(async () => {
    root = await ssrHydratedFixture(html`<sbb-sidebar></sbb-sidebar>`, {
      modules: ['./sidebar.js'],
    });
  });

  it('renders', () => {
    assert.instanceOf(root, SbbSidebarElement);
  });
});

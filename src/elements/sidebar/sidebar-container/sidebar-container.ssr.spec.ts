import { assert } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { ssrHydratedFixture } from '../../core/testing/private.ts';

import { SbbSidebarContainerElement } from './sidebar-container.component.ts';

describe(`sbb-sidebar-container ssr`, () => {
  let root: SbbSidebarContainerElement;

  beforeEach(async () => {
    root = await ssrHydratedFixture(html`<sbb-sidebar-container></sbb-sidebar-container>`, {
      modules: ['./sidebar-container.component.js'],
    });
  });

  it('renders', () => {
    assert.instanceOf(root, SbbSidebarContainerElement);
  });
});

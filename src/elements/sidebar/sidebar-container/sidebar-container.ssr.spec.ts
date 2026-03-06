import { assert } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { ssrHydratedFixture } from '../../core/testing/private.ts';

import { SbbSidebarContainerElement } from './sidebar-container.component.ts';

import '../../sidebar.ts';

describe(`sbb-sidebar-container ssr`, () => {
  let root: SbbSidebarContainerElement;

  beforeEach(async () => {
    root = await ssrHydratedFixture(html`<sbb-sidebar-container></sbb-sidebar-container>`, {
      modules: ['../../sidebar.ts'],
    });
  });

  it('renders', () => {
    assert.instanceOf(root, SbbSidebarContainerElement);
  });
});

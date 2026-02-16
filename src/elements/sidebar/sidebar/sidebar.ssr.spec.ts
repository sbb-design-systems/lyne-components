import { assert } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { ssrHydratedFixture } from '../../core/testing/private.ts';
import type { SbbSidebarContainerElement } from '../sidebar-container.ts';

import { SbbSidebarElement } from './sidebar.component.ts';

import '../../sidebar.ts';

describe(`sbb-sidebar ssr`, () => {
  let root: SbbSidebarContainerElement;

  it('renders', async () => {
    root = await ssrHydratedFixture(
      html`<sbb-sidebar-container>
        <sbb-sidebar>Sidebar Content</sbb-sidebar>
        <sbb-sidebar-content>Content</sbb-sidebar-content>
      </sbb-sidebar-container>`,
      {
        modules: ['./sidebar.component.js', '../sidebar-content.js', '../sidebar-container.js'],
      },
    );

    assert.instanceOf(root.querySelector('sbb-sidebar'), SbbSidebarElement);
  });

  it('renders opened', async () => {
    root = await ssrHydratedFixture(
      html`<sbb-sidebar-container>
        <sbb-sidebar opened>Sidebar Content</sbb-sidebar>
        <sbb-sidebar-content>Content</sbb-sidebar-content>
      </sbb-sidebar-container>`,
      {
        modules: ['./sidebar.component.js', '../sidebar-content.js', '../sidebar-container.js'],
      },
    );

    assert.instanceOf(root.querySelector('sbb-sidebar'), SbbSidebarElement);
  });

  it('renders opened, mode over', async () => {
    root = await ssrHydratedFixture(
      html`<sbb-sidebar-container>
        <sbb-sidebar opened mode="over">Sidebar Content</sbb-sidebar>
        <sbb-sidebar-content>Content</sbb-sidebar-content>
      </sbb-sidebar-container>`,
      {
        modules: ['./sidebar.component.js', '../sidebar-content.js', '../sidebar-container.js'],
      },
    );

    assert.instanceOf(root.querySelector('sbb-sidebar'), SbbSidebarElement);
  });
});

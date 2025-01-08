import { assert } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { fixture } from '../../core/testing/private.js';

import { SbbSidebarContainerElement } from './sidebar-container.js';

describe('sbb-sidebar-container', () => {
  let element: SbbSidebarContainerElement;

  beforeEach(async () => {
    element = await fixture(html`<sbb-sidebar-container></sbb-sidebar-container>`);
  });

  it('renders', async () => {
    assert.instanceOf(element, SbbSidebarContainerElement);
  });
});

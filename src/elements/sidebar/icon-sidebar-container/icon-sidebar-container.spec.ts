import { assert } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { fixture } from '../../core/testing/private.js';

import { SbbIconSidebarContainerElement } from './icon-sidebar-container.js';

describe('sbb-icon-sidebar-container', () => {
  let element: SbbIconSidebarContainerElement;

  beforeEach(async () => {
    element = await fixture(html`<sbb-icon-sidebar-container></sbb-icon-sidebar-container>`);
  });

  it('renders', async () => {
    assert.instanceOf(element, SbbIconSidebarContainerElement);
  });
});
